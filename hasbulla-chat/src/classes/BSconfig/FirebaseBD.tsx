import { Firestore, collection, doc, getDoc, getFirestore, setDoc } from "firebase/firestore/lite";
import { BD } from "./BD";
import { initializeApp } from "firebase/app";
import { Usuarios } from "../Usuarios";

class FirebaseBD implements BD {
    readonly config = {
        apiKey: "AIzaSyCzGZ0-owUYWeUdFbfNCLBNQydJfbg6Vyk",
        authDomain: "hasbulla-aa6d6.firebaseapp.com",
        projectId: "hasbulla-aa6d6",
        storageBucket: "hasbulla-aa6d6.appspot.com",
        messagingSenderId: "882559915520",
        appId: "1:882559915520:web:1997724a6b127e56162ae5",
        measurementId: "G-G9VS42G32Z"
    };

    private app = initializeApp(this.config, "HasbullApp");
    private db: Firestore = getFirestore(this.app);
    private userCollection = collection(this.db, 'Usuarios');
    private msjCollection = collection(this.db, 'Mensajes');
    private chatCollection = collection(this.db, 'Chats');


    public async VerSiUsuarioExiste(username: string): Promise<boolean> {
        const userRef = doc(this.db, "Usuarios", username);
        const userSnap = await getDoc(userRef);
        return userSnap.exists();
    }

    public async CrearUsuario(username: string, nombre: string): Promise<Usuarios | null>  {
        const existe: boolean = await this.VerSiUsuarioExiste(username);
        if (existe) {
            alert("El usuario ingresado ya existe, intente con otro");
            return null;
        } else {
            const nuevoUsuario: Usuarios = {
                username: username,
                nombre: nombre,
            }
            await setDoc(doc(this.db, 'Usuarios', username), nuevoUsuario);
            return nuevoUsuario;
        }
    }

}