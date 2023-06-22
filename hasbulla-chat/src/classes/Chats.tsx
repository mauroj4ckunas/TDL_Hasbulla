import { Mensajes } from "./Mensajes";

export type Chats = {
    idChat: string;
    usuarioLogueado: string;
    usuarioParticipe: string;
    mensajes: Mensajes[];
}