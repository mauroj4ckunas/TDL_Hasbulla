import { Mensajes } from "./Mensajes";

export type Chats = {
    idChat: number;
    usuarioParticipante1: string;
    usuarioParticipante2: string;
    mensajes?: Mensajes[];
}