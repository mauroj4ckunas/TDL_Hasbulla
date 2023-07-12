import { DB } from "./BDconfig/DB";
import { ChatModel } from "./ChatModel";

export class UserModel {
    private id?: string;
    private username: string;
    private name: string;
    private password: string;
    private chats: ChatModel[] = [];

    public constructor(username: string, name: string, password: string) {
        this.username = username;
        this.name = name;
        this.password = password;
    }

    public getUsername(): string {
        return this.username;
    } 
    public getName(): string {
        return this.name;
    } 
    public getPassword(): string {
        return this.password;
    } 

    public setId(id: string) {
        this.id = id;
    }

    public getId(): string | undefined {
        return this.id;
    }

    public obtainChatsActive(db: DB){
        db.getAllChats(this.getUsername()).then(data => this.chats = data)
                                          .catch(error => console.error("Error al obtener los chats del usuario: ", this.getUsername(), error));
    }

    public addChat(db: DB, id: number, userParticipant: UserModel){
        db.createChat(id, this, userParticipant).then(data => this.chats.push(new ChatModel(id, this, userParticipant)))
                                                .catch(error => console.error("Se produjo un error al crear un chat con los usuarios: ", this.getUsername(), userParticipant.getUsername()));
    }
}