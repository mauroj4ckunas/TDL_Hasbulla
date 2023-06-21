import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import NombreDeChat from './NombreDeChat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { MensajeEnviado, MensajeRecibido } from './Mensaje';
import { Contacto, Mensaje } from './Wordspace';

interface Props{
    mandarYRecibirMensajes: (msj: Mensaje) => Promise<void>,
    contacto: Contacto,
}

export default function ChatAbierto({mandarYRecibirMensajes, contacto}: Props){

    const valorInicial: Mensaje = {texto: "", fechaDeEnvio: "", id: ""};

    const inputTextRef = useRef<HTMLInputElement | null>(null);
    const divRepoMensajesRef = useRef<HTMLDivElement | null>(null);
    const [texto, setTexto] = useState("");
    const [mensajesMostrados, setMensajesMostrados] = useState<Mensaje[]>([]);
    let [mensaje, setMensaje] = useState(valorInicial);

    const agregarMensajes = () => {
        
    }

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
                id: '1',
            }));
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

    const enviarMensaje = () => {
        agregarComponenteMensaje();
        if (inputTextRef.current != null) {
            inputTextRef.current.value = "";
        }
        mandarYRecibirMensajes(mensaje);
    }

    return(
        <div className='h-screen w-full relative flex flex-col'>
            <NombreDeChat contacto={contacto.nombre}/>
            <div ref={divRepoMensajesRef} className='w-full h-full flex justify-center overflow-y-auto scroll_chat'>
                <div className='my-2 w-3/5 flex flex-col space-y-2 text-black text-left' >
                    {mensajesMostrados.map((msj, index) => {
                        return msj.id === '1' ? <MensajeEnviado key={index} texto={msj.texto}/> : <MensajeRecibido key={index} texto={msj.texto}/>
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
                        onClick={enviarMensaje}
                    >
                    <FontAwesomeIcon icon={faShare} size="2x"/>
                </button>
            </div>
        </div>
    );
}