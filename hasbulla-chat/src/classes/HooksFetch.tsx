import { useEffect, useState } from 'react';
import { FirebaseBD } from './BDconfig/FirebaseBD';
import { Usuarios } from './Usuarios';
import { Mensajes } from './Mensajes';
import { Chats } from './Chats';

export const useUsuarioExistente = (username: string, db: FirebaseBD): boolean => {
    const [existe, setExiste] = useState<boolean>(false)
    useEffect(() => {
        const getFetch = async () => {
          const resp = await db.VerSiUsuarioExisteEnBD(username);
          setExiste(resp);
        };
        getFetch();
    }, [username, db]);
    
    return existe;
}

export const useCrearUsuario = (nuevoUsuario: Usuarios, db: FirebaseBD): boolean => {
    const [seCreo, setSeCreo] = useState<boolean>(false)
    useEffect(() => {
        const getFetch = async () => {
          const resp = await db.CrearUsuario(nuevoUsuario);
          setSeCreo(resp);
        };
        getFetch();
    }, [nuevoUsuario, db]);
    
    return seCreo;
}

export const useObtenerUsuario = (username: string, db: FirebaseBD): Usuarios | null => {
    const [usuario, setUsuario] = useState<Usuarios | null>({
        username: "",
        nombre: "",
        contrasena: "",
    })
    useEffect(() => {
        const getFetch = async () => {
          const resp = await db.ObtenerUsuario(username);
          setUsuario(resp);
        };
        getFetch();
    }, [username, db]);
    
    return usuario;
}

export const useLogin = (username: string, contrasena: string, db: FirebaseBD): boolean => {
    const [login, setLogin] = useState<boolean>(false)
    useEffect(() => {
        const getFetch = async () => {
          const resp = await db.Login(username, contrasena);
          setLogin(resp);
        };
        getFetch();
    }, [username, contrasena, db]);
    
    return login;
}

export const useCrearChat = (idChat: number, usuarioLogueado: string, usuarioParticipe: string, db: FirebaseBD) => {
    useEffect(() => {
        const getFetch = async () => {
          await db.CrearChat(idChat, usuarioLogueado, usuarioParticipe)
        };
        getFetch();
    }, [idChat, usuarioLogueado, usuarioParticipe, db]);
}

export const useGuardarMensaje = (idChat: number, mensaje: Mensajes, db: FirebaseBD) => {
    useEffect(() => {
        const getFetch = async () => {
          await db.GuardarMensaje(idChat, mensaje);
        };
        getFetch();
    }, [idChat, mensaje, db]);
}

export const useObtenerTodosLosChats = (userName: string, db: FirebaseBD): Chats[] => {
    const [chats, setChats] = useState<Chats[]>([])
    useEffect(() => {
        const getFetch = async () => {
          const resp = await db.ObtenerTodosLosChats(userName);
          setChats(resp);
        };
        getFetch();
    }, [userName, db]);

    return chats;
}

export const useObtenerTodosLosMensajes = (idChat: number, db: FirebaseBD): Mensajes[] => {
    const [mensajes, setMensajes] = useState<Mensajes[]>([])
    useEffect(() => {
        const getFetch = async () => {
          const resp = await db.ObtenerTodosLosMensajes(idChat);
          setMensajes(resp);
        };
        getFetch();
    }, [idChat, db]);

    return mensajes;
}

export const useUltimoIdDeChats = (db: FirebaseBD): number => {
    const [cantChats, setCantChats] = useState<number>(0)
    useEffect(() => {
        const getFetch = async () => {
          const resp = await db.UltimoIdDeChats();
          setCantChats(resp);
        };
        getFetch();
    }, [db]);

    return cantChats;
}