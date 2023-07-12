import { ChatModel } from "../ChatModel";
import { MessageModel } from "../MessageModel";
import { UserModel } from "../UserModel";

export interface DB {
    readonly config: any;
    userInBD(username: string): Promise<boolean>;
    createUser(newUser: UserModel): Promise<boolean>;
    getUser(username: string): Promise<UserModel | null>;
    Login(username: string, contrasena: string): Promise<boolean>;
    createChat(idChat: number, usernameLogged: UserModel, usernameParticipant: UserModel): Promise<void>;
    addMessageInChat(idChat: number, message: MessageModel): Promise<void>;
    getAllChats(username: string): Promise<ChatModel[]>;
    getAllMessages(idChat: number): Promise<MessageModel[]>;
    getLastIdChat(): Promise<number>;
}