class Mensajes {
    private idMensaje: number;
    private texto: string;
    private usuarioEmisor: string;
    private usuarioReceptor: string;
    private fechaDeEnvio: string;

    public constructor(idMensaje: number, texto: string, usuarioEmisor: string, usuarioReceptor: string, fechaDeEnvio: string){
        this.idMensaje = idMensaje;
        this.texto = texto;
        this.usuarioEmisor = usuarioEmisor;
        this.usuarioReceptor = usuarioReceptor;
        this.fechaDeEnvio = fechaDeEnvio;
    }

}