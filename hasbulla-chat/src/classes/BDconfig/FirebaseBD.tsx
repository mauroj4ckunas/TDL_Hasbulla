import { Firestore, collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore/lite";
import { BD } from "./BD";
import { initializeApp } from "firebase/app";
import { Messaging, getMessaging } from "firebase/messaging";
import { Usuarios } from "../Usuarios";
import { Chats } from "../Chats";
import { Mensajes } from "../Mensajes";

export class FirebaseBD implements BD {
    // readonly config = {
    //     apiKey: "AIzaSyCzGZ0-owUYWeUdFbfNCLBNQydJfbg6Vyk",
    //     authDomain: "hasbulla-aa6d6.firebaseapp.com",
    //     projectId: "hasbulla-aa6d6",
    //     storageBucket: "hasbulla-aa6d6.appspot.com",
    //     messagingSenderId: "882559915520",
    //     appId: "1:882559915520:web:1997724a6b127e56162ae5",
    //     measurementId: "G-G9VS42G32Z"
    // };
    readonly config = {
        apiKey: "AIzaSyDZYGJQgoSyjlCdesUk8FROR8--kCdJ3Vg",
        authDomain: "test-e0c8e.firebaseapp.com",
        projectId: "test-e0c8e",
        storageBucket: "test-e0c8e.appspot.com",
        messagingSenderId: "1056094483486",
        appId: "1:1056094483486:web:0f4dbf1eec1ca6fb5aaa0f",
        measurementId: "G-EL016NFXZB"
    };

    private app = initializeApp(this.config, "HasbullApp");
    private db: Firestore = getFirestore(this.app);
    private messaging: Messaging = getMessaging(this.app);
    private userCollection = collection(this.db, 'Usuarios');
    private chatCollection = collection(this.db, 'Chats');

    public async VerSiUsuarioExisteEnBD(username: string): Promise<boolean> {
        const userRef = doc(this.db, "Usuarios", username);
        const userSnap = await getDoc(userRef);
        return userSnap.exists();
    }

    public async CrearUsuario(nuevoUsuario: Usuarios): Promise<boolean>  {
        const existe: boolean = await this.VerSiUsuarioExisteEnBD(nuevoUsuario.username);
        if (existe) {
            alert("El usuario ingresado ya existe, intente con otro");
        } else {
            await setDoc(doc(this.db, 'Usuarios', nuevoUsuario.username), nuevoUsuario);
        }
        return existe;
    }

    public async ObtenerUsuario(username: string): Promise<Usuarios | null> {
        const userRef = doc(this.userCollection, username);
        const info = await getDoc(userRef);
        if (info.exists()) {
            return {
                username: info.data().username,
                nombre: info.data().nombre,
                contrasena: info.data().contrasena,
            }
        }
        return null;
    }

    public async CrearChat(idChat: number, usuarioLogueado: string, usuarioParticipe: string): Promise<void> {
        const docNuevoChat = doc(this.chatCollection, idChat.toString());
        await setDoc(docNuevoChat, {
            idChat: idChat,
            usuarioLogueado: usuarioLogueado,
            usuarioParticipe: usuarioParticipe,
        })
    }

    public async GuardarMensaje(idChat: number, mensaje: Mensajes): Promise<void> {
        const docChat = doc(this.chatCollection, idChat.toString());
        const mensajesCollection = collection(docChat, 'Mensajes');
        const mensajesDoc = doc(mensajesCollection, mensaje.idMensaje.toString());
        await setDoc(mensajesDoc, {
            idMensaje: mensaje.idMensaje,
            texto: mensaje.texto,
            usuarioEmisor: mensaje.usuarioEmisor,
            usuarioReceptor: mensaje.usuarioReceptor,
            imagen: mensaje.imagen,
            coordenadas: mensaje.coordenadas,
            fechaDeEnvio: mensaje.fechaDeEnvio,
        })
    }

    private async buscarLosChatsDelUsuario(userName: string): Promise<Chats[]> {
        let chats: Chats[] = [];
        const query1 = query(this.chatCollection, where("usuarioParticipante1", "==", userName));
        const querySnapshot1 = await getDocs(query1);
        querySnapshot1.forEach((chat) => {
            chats.push({
                idChat: chat.data().idChat,
                usuarioParticipante1: chat.data().usuarioParticipante1,
                usuarioParticipante2: chat.data().usuarioParticipante2,
            })
        });

        const query2 = query(this.chatCollection, where("usuarioParticipante2", "==", userName));
        const querySnapshot2 = await getDocs(query2);
        querySnapshot2.forEach((chat) => {
            chats.push({
                idChat: chat.data().idChat,
                usuarioParticipante1: chat.data().usuarioParticipante1,
                usuarioParticipante2: chat.data().usuarioParticipante2,
            })
        });

        return chats.sort((a, b) => b.idChat - a.idChat);
    }

    public async ObtenerTodosLosChats(userName: string): Promise<Chats[]> {
        let response = await this.buscarLosChatsDelUsuario(userName)
        return response;
    }

    private async obtenerMensajesSegunElChat(idChat: number): Promise<Mensajes[]> {
        let mensajes: Mensajes[] = [];
        const queryResponse = await getDocs(collection(this.db, "Chats", idChat.toString(), "Mensajes"));
        queryResponse.forEach((msj) => {
            mensajes.push({
                idMensaje: msj.data().idMensaje,
                texto: msj.data().texto,
                usuarioEmisor: msj.data().usuarioEmisor,
                usuarioReceptor: msj.data().usuarioReceptor,
                imagen: msj.data().imagen,
                coordenadas: msj.data().coordenadas,
                fechaDeEnvio: msj.data().fechaDeEnvio,
            });
        });
        return mensajes;
    }

    public async ObtenerTodosLosMensajes(idChat: number): Promise<Mensajes[]> {
        let mensajes = await this.obtenerMensajesSegunElChat(idChat);
        return mensajes
    }

    public async Login(username: string, contrasena: string): Promise<boolean> {
        const userRef = doc(this.userCollection, username);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
            return userSnap.data().contrasena === contrasena;
        }
        return false;
    }

    public async UltimoIdDeChats(): Promise<number> {
        return await getDocs(this.chatCollection)
                    .then((response) => response.docs.length)
                    .catch((error) => 0);
    }
}