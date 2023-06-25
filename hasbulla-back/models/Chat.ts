import { Message } from "./Message"

export class Chat {
    private name: string
    private messages: Array<Message>

    constructor(name: string, messages: Array<Message>) {
        this.name = name
        this.messages = messages
      }

    public getName(): string{
        return this.name
    }

    public getMessages(): Array<Message>{
        return this.messages
    }

    public addMessage(message: Message){
        this.messages.push(message)
    }
}