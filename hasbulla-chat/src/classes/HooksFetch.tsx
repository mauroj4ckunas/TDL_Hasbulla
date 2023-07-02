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
    }, []);
    
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
    }, []);
    
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
    }, []);
    
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
    }, []);
    
    return login;
}

export const useCrearChat = (idChat: number, usuarioLogueado: string, usuarioParticipe: string, db: FirebaseBD) => {
    useEffect(() => {
        const getFetch = async () => {
          await db.CrearChat(idChat, usuarioLogueado, usuarioParticipe)
        };
        getFetch();
    }, []);
}

export const useGuardarMensaje = (idChat: number, mensaje: Mensajes, db: FirebaseBD) => {
    useEffect(() => {
        const getFetch = async () => {
          await db.GuardarMensaje(idChat, mensaje);
        };
        getFetch();
    }, [mensaje]);
}

export const useObtenerTodosLosChats = (userName: string, db: FirebaseBD): Chats[] => {
    const [chats, setChats] = useState<Chats[]>([])
    useEffect(() => {
        const getFetch = async () => {
          const resp = await db.ObtenerTodosLosChats(userName);
          setChats(resp);
        };
        getFetch();
    }, []);

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
    }, [idChat]);

    return mensajes;
}

export const useObtenerUltimoMensaje = (idChat: number, db: FirebaseBD): Mensajes => {
    const [mensaje, setMensaje] = useState<Mensajes>({
        idMensaje: -1,
        texto: "",
        usuarioEmisor: "",
        usuarioReceptor: "",
        imagen: "",
    })
    useEffect(() => {
        const getFetch = async () => {
          const resp = await db.ObtenerTodosLosMensajes(idChat);
          const ultimo = resp[resp.length - 1];
          setMensaje(ultimo);
        };
        
        getFetch();
    }, []);

    return mensaje;
}

export const useUltimoIdDeChats = (db: FirebaseBD): number => {
    const [cantChats, setCantChats] = useState<number>(0)
    useEffect(() => {
        const getFetch = async () => {
          const resp = await db.UltimoIdDeChats();
          setCantChats(resp);
        };
        getFetch();
    }, []);

    return cantChats;
}