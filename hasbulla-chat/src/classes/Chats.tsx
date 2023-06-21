class Chats {
    private idChat: string;
    private usuarioEmisor: string;
    private usuarioReceptor: string;

    public constructor(idChat: string, usuarioEmisor: string, usuarioReceptor: string){
        this.idChat = idChat;
        this.usuarioEmisor = usuarioEmisor;
        this.usuarioReceptor = usuarioReceptor;
    }
}