import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import NombreDeChat from './NombreDeChat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { MensajeEnviado, MensajeRecibido } from './Mensaje';
import { Mensajes } from '../classes/Mensajes';
import { Usuarios } from '../classes/Usuarios';
import { useGuardarMensaje, useObtenerTodosLosMensajes } from '../classes/HooksFetch';
import { FirebaseBD } from '../classes/BDconfig/FirebaseBD';
import { Chats } from '../classes/Chats';

interface Props {
    chat: Chats,
    usuarioLogueado: Usuarios,
    contacto: Usuarios,
    db: FirebaseBD
}

export default function ChatAbierto({chat, usuarioLogueado, contacto, db}: Props){

    // let historialMensajes: Mensajes[] = useObtenerTodosLosMensajes(chat.idChat, db);

    let historialMensajes : Mensajes[] = [
        {
            idMensaje: 1,
            texto: 'HOLA REY COMO ESTAS??',
            usuarioEmisor: 'mjackunas',
            usuarioReceptor: 'salvarez'
        },
        {
            idMensaje: 2,
            texto: 'Bien y vos? Avanzaste algo con el TP?',
            usuarioEmisor: 'salvarez',
            usuarioReceptor: 'mjackunas'
        },
        {
            idMensaje: 3,
            texto: 'Si, ya estoy terminando mi parte. Y vos?',
            usuarioEmisor: 'mjackunas',
            usuarioReceptor: 'salvarez'
        },
        {
            idMensaje: 4,
            texto: 'Ya esta todo pusheado, fijate',
            usuarioEmisor: 'salvarez',
            usuarioReceptor: 'mjackunas'
        },
    ]

    const [mensajesMostrados, setMensajesMostrados] = useState<Mensajes[]>([]);
    const [idMensajes, setIdMensajes] = useState<number>(historialMensajes.length);

    // useEffect(() => {
    //     setMensajesMostrados(historialMensajes);
    // }, [historialMensajes])

    useEffect(() => {
        setMensajesMostrados(historialMensajes);
    }, [])

    const inputTextRef = useRef<HTMLInputElement | null>(null);
    const divRepoMensajesRef = useRef<HTMLDivElement | null>(null);
    
    const [texto, setTexto] = useState("");
    let [mensaje, setMensaje] = useState<Mensajes>({
        idMensaje: -1,
        texto: "",
        usuarioEmisor: usuarioLogueado.username,
        usuarioReceptor: contacto.username,
        fechaDeEnvio: "",
    });

    const getFechaActual = () =>{
        const e = new Date();
        return e.toLocaleDateString();
    }

    const getValorInput = (e: ChangeEvent<HTMLInputElement>) => {
        setTexto(e.target.value);
    };

    useEffect(() => {
        if (texto !== "") {
            setMensaje((prevMensaje) => ({
                ...prevMensaje,
                texto: texto,
                fechaDeEnvio: getFechaActual(),
                idMensaje: idMensajes+1,
            }));
            setIdMensajes(idMensajes+1)
        }
    }, [texto]);

    useEffect(() => {
        if (divRepoMensajesRef.current) {
            divRepoMensajesRef.current.scrollTop = divRepoMensajesRef.current?.scrollHeight;
        }
    }, [mensajesMostrados]);

    const agregarComponenteMensaje = () => {
        setMensajesMostrados([...mensajesMostrados, mensaje])
    };

    const EnviarMensaje = () => {
        agregarComponenteMensaje();
        if (inputTextRef.current != null) {
            inputTextRef.current.value = "";
        }
        //useGuardarMensaje(chat.idChat, mensaje, db);
    }

    return(
        <div className='h-screen w-full relative flex flex-col'>
            <NombreDeChat contacto={contacto.nombre}/>
            <div ref={divRepoMensajesRef} className='w-full h-full flex justify-center overflow-y-auto scroll_chat'>
                <div className='my-2 w-3/5 flex flex-col space-y-2 text-black text-left' >
                    {mensajesMostrados.map((msj, index) => {
                        return msj.usuarioEmisor === usuarioLogueado.username ? <MensajeEnviado key={index} texto={msj.texto}/> : <MensajeRecibido key={index} texto={msj.texto}/>
                    })}
                </div>
            </div>
            <div className="mt-auto flex w-full justify-center">  
                <input ref={ inputTextRef }
                    id="input_mensaje" type="text" placeholder="Escriba un mensaje"
                    className="my-5 px-4 py-3 w-2/3 rounded-full
                    bg-gray-900 text-white"
                    onChange={getValorInput}
                >
                </input>
                <button id="enviar" className="my-5 ml-2 px-4 rounded-full
                        bg-cyan-300 hover:bg-cyan-50"
                        onClick={EnviarMensaje}
                    >
                    <FontAwesomeIcon icon={faShare} size="2x"/>
                </button>
            </div>
        </div>
    );
}