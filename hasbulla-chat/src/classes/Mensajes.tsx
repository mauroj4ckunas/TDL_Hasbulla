export type Mensajes = {
    idMensaje: number;
    texto: string,
    usuarioEmisor: string,
    usuarioReceptor: string,
    imagen: string,
    coordenadas: number[],
    fechaDeEnvio?: string,
}