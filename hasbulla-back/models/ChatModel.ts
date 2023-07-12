import { DB } from "./BDconfig/DB";
import { MessageModel } from "./MessageModel";
import { UserModel } from "./UserModel";

export class ChatModel {
    private idChat: number;
    private user1: UserModel;
    private user2: UserModel;
    private messages: MessageModel[] = [];

    public constructor(idChat: number, user1: UserModel, user2: UserModel){
        this.idChat = idChat;
        this.user1 = user1;
        this.user2 = user2;
    }

    public addMessagesInChat(db: DB) {
        db.getAllMessages(this.idChat).then(data => this.messages = data)
                                      .catch(error => console.error("Error al cargar los mensajes: ", error));
    }

    public addNewMessageInChat(db: DB, newMessage: MessageModel) {
        db.addMessageInChat(this.idChat, newMessage).then(data => this.messages.push(newMessage))
                                                    .catch(error => console.error("Error al agregar el nuevo mensaje: ", newMessage.getMessage()))
    }

    public userParticipant(usernameLogged: string): string{
        return usernameLogged === this.user1.getUsername() ? this.user2.getUsername() : this.user1.getUsername()
    }

    public getMessages(): MessageModel[] {
        return this.messages;
    }

    public getId(): number {
        return this.idChat;
    }
}