export class Message {
    private textMessage: string
    private sender: string

    constructor(textMessage: string, sender: string) {
        this.textMessage = textMessage
        this.sender = sender
      }

    public getTextMessage(): string{
        return this.textMessage
    }

    public getSender() :string{
        return this.sender
    }
}