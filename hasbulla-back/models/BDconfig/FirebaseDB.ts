import { Firestore, collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore/lite";
import { DB } from "./DB";
import { initializeApp } from "firebase/app";
import { UserModel } from "../UserModel";
import { MessageModel } from "../MessageModel";
import { ChatModel } from "../ChatModel";

export class FirebaseDB implements DB {
    readonly config = {
        apiKey: "AIzaSyCzGZ0-owUYWeUdFbfNCLBNQydJfbg6Vyk",
        authDomain: "hasbulla-aa6d6.firebaseapp.com",
        projectId: "hasbulla-aa6d6",
        storageBucket: "hasbulla-aa6d6.appspot.com",
        messagingSenderId: "882559915520",
        appId: "1:882559915520:web:1997724a6b127e56162ae5",
        measurementId: "G-G9VS42G32Z"
    };

    // readonly config = {
    //     apiKey: "AIzaSyDZYGJQgoSyjlCdesUk8FROR8--kCdJ3Vg",
    //     authDomain: "test-e0c8e.firebaseapp.com",
    //     projectId: "test-e0c8e",
    //     storageBucket: "test-e0c8e.appspot.com",
    //     messagingSenderId: "1056094483486",
    //     appId: "1:1056094483486:web:0f4dbf1eec1ca6fb5aaa0f",
    //     measurementId: "G-EL016NFXZB"
    // };

    private app = initializeApp(this.config, "HasbullApp");
    private db: Firestore = getFirestore(this.app);
    private userCollection = collection(this.db, 'Usuarios');
    private chatCollection = collection(this.db, 'Chats');

    public async userInBD(username: string): Promise<boolean> {
        const userRef = doc(this.db, "Usuarios", username);
        const userSnap = await getDoc(userRef);
        return userSnap.exists();
    }

    public async createUser(newUser: UserModel): Promise<boolean>  {
        const existe: boolean = await this.userInBD(newUser.getUsername());
        if (existe) {
            console.error("El usuario ingresado ya existe, intente con otro");
        } else {
            await setDoc(doc(this.db, 'Usuarios', newUser.getUsername()), newUser);
        }
        return existe;
    }

    public async getUser(username: string): Promise<UserModel | null> {
        const userRef = doc(this.userCollection, username);
        const info = await getDoc(userRef);
        if (info.exists()) {
            return new UserModel(info.data().username, info.data().nombre, info.data().contrasena)
        }
        return null;
    }

    public async createChat(idChat: number, usernameLogged: UserModel, usernameParticipant: UserModel): Promise<void> {
        const docNuevoChat = doc(this.chatCollection, idChat.toString());
        try {
            await setDoc(docNuevoChat, {
                idChat: idChat,
                usuarioLogueado: usernameLogged.getUsername(),
                usuarioParticipe: usernameParticipant.getUsername(),
            })
        } catch (error){
            console.error("Se produjo un error al momento de crear un chat: ", error)
        }

    }

    public async addMessageInChat(idChat: number, message: MessageModel): Promise<void> {
        const docChat = doc(this.chatCollection, idChat.toString());
        const mensajesCollection = collection(docChat, 'Mensajes');
        const mensajesDoc = doc(mensajesCollection, message.getId().toString());
        const parsingAlmostJson = message.getMessage();
        await setDoc(mensajesDoc, {
            idMensaje: parsingAlmostJson.idMessage,
            texto: parsingAlmostJson.text,
            usuarioEmisor: parsingAlmostJson.senderUser,
            usuarioReceptor: parsingAlmostJson.receiveUser,
            imagen: parsingAlmostJson.image,
            coordenadas: parsingAlmostJson.coordenates,
            fechaDeEnvio: parsingAlmostJson.date,
        })
    }

    public async getAllChats(username: string): Promise<ChatModel[]> {
        let chats: ChatModel[] = [];
        const queryGetAllChatsUser1 = query(this.chatCollection, where("usuarioParticipante1", "==", username));
        const querySnapshotUser1 = await getDocs(queryGetAllChatsUser1);
        querySnapshotUser1.forEach((chat) => {
            chats.push(new ChatModel(chat.data().idChat, chat.data().usuarioParticipante1, chat.data().usuarioParticipante2))
        });

        const queryGetAllChatsUser2 = query(this.chatCollection, where("usuarioParticipante2", "==", username));
        const querySnapshotUser2 = await getDocs(queryGetAllChatsUser2);
        querySnapshotUser2.forEach((chat) => {
            chats.push(new ChatModel(chat.data().idChat, chat.data().usuarioParticipante1, chat.data().usuarioParticipante2))
        });

        return chats.sort((a, b) => b.getId() - a.getId());
    }

    public async getAllMessages(idChat: number): Promise<MessageModel[]> {
        let mensajes: MessageModel[] = [];
        const queryResponse = await getDocs(collection(this.db, "Chats", idChat.toString(), "Mensajes"));
        queryResponse.forEach((msj) => {
            let newMsj = new MessageModel(msj.data().idMensaje, msj.data().texto, msj.data().usuarioEmisor, msj.data().usuarioReceptor, msj.data().fechaDeEnvio);
            
            if (msj.data().imagen) {
                newMsj.addImage(msj.data().imagen);
            } else if (msj.data().coordenadas){
                newMsj.addUbication(msj.data().coordenadas)
            } 
            
            mensajes.push(newMsj);
        });
        return mensajes;
    }

    public async Login(username: string, password: string): Promise<boolean> {
        const userRef = doc(this.userCollection, username);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
            return userSnap.data().contrasena === password;
        }
        return false;
    }

    public async getLastIdChat(): Promise<number> {
        return await getDocs(this.chatCollection)
                    .then((response) => response.docs.length)
                    .catch((error) => 0);
    }
}