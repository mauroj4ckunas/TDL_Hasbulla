import { Chat } from "./Chat"

export class User {
    private name: string
    private chats: Array<Chat>

    constructor(name: string, chats: Array<Chat>) {
        this.name = name
        this.chats = chats
      }

    public getName(): string{
        return this.name
    }

    public getChats(): Array<Chat>{
        return this.chats
    }
}