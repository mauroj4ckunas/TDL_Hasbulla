export type Mensajes = {
    idMensaje: number;
    texto: string,
    usuarioEmisor: string,
    usuarioReceptor: string,
    fechaDeEnvio?: string,
}