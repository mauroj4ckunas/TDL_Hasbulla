type Reaccion = 0 | 1 | 2;

export type Mensajes = {
    idMensaje: number;
    texto: string,
    usuarioEmisor: string,
    usuarioReceptor: string,
    imagen: string,
    coordenadas: number[],
    fechaDeEnvio?: string,
    reaccion: Reaccion,
}