import { UserModel } from "./UserModel";

export class MessageModel {
    private idMessage: number;
    private text: string;
    private senderUser: UserModel;
    private receiveUser: UserModel;
    private date: string;
    private image?: string;
    private coordenates?: number[];

    public constructor(idMessage: number, text: string, senderUser: UserModel, receiveUser: UserModel, date: string){
        this.idMessage = idMessage;
        this.text = text;
        this.senderUser = senderUser;
        this.receiveUser = receiveUser;
        this.date = date;
    }

    public addImage(base64: string): void {
        if (this.coordenates) {
            this.coordenates = undefined;
        }
        this.image = base64;
    }
    
    public addUbication(coordenates: number[]): void {
        if (this.image) {
            this.image = undefined;
        }
        this.coordenates = coordenates;
    }

    public getId(): number {
        return this.idMessage;
    }

    public getMessage(): {
        idMessage: number,
        text: string,
        senderUser: UserModel,
        receiveUser: UserModel,
        image?: string,
        coordenates?: number[],
        date: Date,
    } {
        return {
            idMessage: this.idMessage,
            text: this.text,
            senderUser: this.senderUser,
            receiveUser: this.receiveUser,
            image: this.image,
            coordenates: this.coordenates,
            date: new Date(this.date), 
        }
    }
}