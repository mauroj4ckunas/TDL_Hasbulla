import { Chats } from "../Chats";
import { Mensajes } from "../Mensajes";
import { Usuarios } from "../Usuarios";

export interface BD {
    readonly config: any;
    VerSiUsuarioExiste(username: string): Promise<boolean>;
    CrearUsuario(username: string, nombre: string): Promise<Usuarios | null>;
    CrearChat(usuarioEmisor: string, usuarioReceptor: string) : void;
    ObtenerTodosLosChats(userName: string): Chats[];
    ObtenerTodosLosMensajes(idChat: string): Mensajes[];
}