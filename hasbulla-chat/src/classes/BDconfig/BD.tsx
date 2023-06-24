import { Chats } from "../Chats";
import { Mensajes } from "../Mensajes";
import { Usuarios } from "../Usuarios";

export interface BD {
    readonly config: any;
    VerSiUsuarioExisteEnBD(username: string): Promise<boolean>;
    CrearUsuario(nuevoUsuario: Usuarios): Promise<boolean>;
    ObtenerUsuario(username: string): Promise<Usuarios | null>
    Login(username: string, contrasena: string): Promise<boolean>;
    CrearChat(idChat: number, usuarioLogueado: string, usuarioParticipe: string): Promise<void>;
    GuardarMensaje(idChat: number, mensaje: Mensajes): Promise<void>;
    ObtenerTodosLosChats(userName: string): Promise<Chats[]>;
    ObtenerTodosLosMensajes(idChat: number): Promise<Mensajes[]>;
    UltimoIdDeChats(): Promise<number>;
}

