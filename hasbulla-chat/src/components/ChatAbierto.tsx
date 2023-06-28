import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import NombreDeChat from './NombreDeChat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { MensajeEnviado, MensajeRecibido } from './Mensaje';
import { Mensajes } from '../classes/Mensajes';
import { Usuarios } from '../classes/Usuarios';
import { FirebaseBD } from '../classes/BDconfig/FirebaseBD';
import { Chats } from '../classes/Chats';

interface Props {
    chat: Chats,
    usuarioLogueado: Usuarios,
    contacto: Usuarios,
    db: FirebaseBD
}

export default function ChatAbierto({chat, usuarioLogueado, contacto, db}: Props){

    const [mensajesMostrados, setMensajesMostrados] = useState<Mensajes[]>([]);
    const [idMensajes, setIdMensajes] = useState<number>(0);

    useEffect(() => {
        const getFetch = async () => {
          const resp = await db.ObtenerTodosLosMensajes(chat.idChat);
          setMensajesMostrados(ordenarPorId(resp));
          setIdMensajes(resp.length);
        };

        getFetch();
    }, [chat]);

    const ordenarPorId = (array: Mensajes[]): Mensajes[] => {
        return array.sort((a, b) => a.idMensaje - b.idMensaje);
    }


    const inputTextRef = useRef<HTMLInputElement | null>(null);
    const divRepoMensajesRef = useRef<HTMLDivElement | null>(null);

    const mensajeInicial: Mensajes = {
        idMensaje: -1,
        texto: "",
        usuarioEmisor: usuarioLogueado.username,
        usuarioReceptor: contacto.username,
        fechaDeEnvio: "",
    }

    const [texto, setTexto] = useState("");
    const [mensaje, setMensaje] = useState<Mensajes>(mensajeInicial);

    const getFechaActual = () =>{
        const e = new Date();
        return e.toLocaleDateString();
    }

    const getValorInput = (e: ChangeEvent<HTMLInputElement>) => {
        setTexto(e.target.value);
    };

    useEffect(() => {
        setTexto(texto);
    }, [texto]);

    useEffect(() => {
        setMensaje(mensaje);
        agregarComponenteMensaje();
        guardarEnBD();
    }, [mensaje]);

    useEffect(() => {
        if (divRepoMensajesRef.current) {
            divRepoMensajesRef.current.scrollTop = divRepoMensajesRef.current?.scrollHeight;
        }
    }, [mensajesMostrados]);

    const agregarComponenteMensaje = () => {
        setMensajesMostrados([...mensajesMostrados, mensaje])
    };

    const enviarMensaje = () => {
        if (texto !== "") {
            setMensaje((prevMensaje) => ({
                ...prevMensaje,
                texto: texto,
                fechaDeEnvio: getFechaActual(),
                idMensaje: idMensajes+1,
            }));
            setIdMensajes(idMensajes+1)
        }
        if (inputTextRef.current != null) {
            inputTextRef.current.value = "";
        }
    }

    const guardarEnBD = async () => {
        await db.GuardarMensaje(chat.idChat, mensaje);
    };

    return(
        <div className='h-screen w-full relative flex flex-col'>
            <NombreDeChat contacto={contacto.nombre}/>
            <div ref={divRepoMensajesRef} className='w-full h-full flex justify-center overflow-y-auto scroll_chat'>
                <div className='my-2 w-3/5 flex flex-col space-y-2 text-black text-left' >
                    {mensajesMostrados.map((msj, index) => {
                        return msj.usuarioEmisor === usuarioLogueado.username ? <MensajeEnviado key={index} texto={msj.texto}/> : <MensajeRecibido key={index} texto={msj.texto}/>
                    })}
                </div>
            </div>center
            <div className="mt-auto w-full flex justify-center">
                <div className='w-1/4 flex justify-center'>
                    <div className='bg-cyan-700 absolute top-[70%] flex flex-col rounded-sm text-white more-option'>
                        <div className='my-3 mx-2 text-center more-option'>
                            <button className='bg-cyan-600 font-medium p-2 bg-opacity-50 hover:bg-opacity-70 rounded-md shadow-lg hover:shadow-none'>Imágen</button>
                        </div>
                        <div className='my-3 mx-2 text-centers more-option'>
                            <button className='bg-cyan-600 font-medium p-2 bg-opacity-50 hover:bg-opacity-70 rounded-md shadow-lg hover:shadow-none'>Ubicación</button>
                        </div>
                    </div>
                    <button className='bg-cyan-300 my-5 px-4 rounded-full hover:bg-cyan-50'>
                        <FontAwesomeIcon icon={faBars} size="lg"/>
                    </button>
                </div>
                <div className='w-3/4 flex'>
                    <input ref={ inputTextRef }
                        id="input_mensaje" type="text" placeholder="Escriba un mensaje"
                        className="my-5 px-4 py-3 w-2/3 rounded-full
                        bg-gray-900 text-white"
                        onChange={getValorInput}
                    >
                    </input>
                    <button id="enviar" className="my-5 ml-2 px-4 rounded-full
                            bg-cyan-300 hover:bg-cyan-50"
                            onClick={enviarMensaje}
                        >
                        <FontAwesomeIcon icon={faShare} size="2xl"/>
                    </button>
                </div>
            </div>
        </div>
    );
}