import { FirebaseBD } from "./BSconfig/FirebaseBD";
import { useLogin, useObtenerUsuario, useUsuarioExistente } from "./HooksFetch";
import { Usuarios } from "./Usuarios";


export const HasbullApp = () => {
    const db: FirebaseBD = new FirebaseBD();
    let numeroChats: number;
    let numeroMensajes: number;
    let usuarioLogueado: Usuarios | null;

    const IniciarSesion = (username: string, contrasena: string): boolean => {
        const logeoExitoso = useLogin(username, contrasena, db);
        const posUsuario = useObtenerUsuario(username, db);
        if (posUsuario) {
            usuarioLogueado = posUsuario;
        }
        return logeoExitoso;
    }

    const BuscarContacto = (username: string): boolean => {
        return useUsuarioExistente(username, db);
    }

}