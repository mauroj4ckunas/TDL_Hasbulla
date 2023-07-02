import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import NombreDeChat from './NombreDeChat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faBars, faImage, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { MensajeEnviado, MensajeRecibido } from './Mensaje';
import { Mensajes } from '../classes/Mensajes';
import { Usuarios } from '../classes/Usuarios';
import { FirebaseBD } from '../classes/BDconfig/FirebaseBD';
import { Chats } from '../classes/Chats';
import { SpeedDial, SpeedDialAction } from '@mui/material';
import EnviarImagen from './EnviarImagen';
import EnviarUbicacion from './EnviarUbicacion';

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
        imagen: "",
        fechaDeEnvio: "",
    }

    const [texto, setTexto] = useState("");
    const [base64, setBase64] = useState("");
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
                imagen: base64,
                idMensaje: idMensajes+1,
            }));
            setIdMensajes(idMensajes+1)
        }
        if (inputTextRef.current != null) {
            inputTextRef.current.value = "";
        }
        setBase64('');
    }

    const guardarEnBD = async () => {
        await db.GuardarMensaje(chat.idChat, mensaje);
    };

    const [modalImagen, setModalImagen] = useState<boolean>(false);

    const handlerAbrirModalImagen = () => setModalImagen(true);

    const handlerCerrarModalImagen = () => setModalImagen(false);

    const enviarImagen = (base64: string) => {
        handlerCerrarModalImagen()
        setBase64(base64);
    }

    const [modalUbicacion, setModalUbicacion] = useState<boolean>(false);

    const handlerAbrirModalUbicacion = () => setModalUbicacion(true);

    const handlerCerrarModalUbicacion = () => setModalUbicacion(false);
    

    const enviarUbicacion = () => {
        setModalUbicacion(false);
        handlerCerrarModalUbicacion()
    }



    return(
        <div className='h-screen w-full relative flex flex-col'>
            <NombreDeChat contacto={contacto.nombre}/>
            <div ref={divRepoMensajesRef} className='w-full h-full flex justify-center overflow-y-auto scroll_chat'>
                <div className='my-2 w-3/5 flex flex-col space-y-2 text-black text-left' >
                    {mensajesMostrados.map((msj, index) => {
                        return msj.usuarioEmisor === usuarioLogueado.username ? <MensajeEnviado key={index} mensaje={msj}/> : <MensajeRecibido key={index} mensaje={msj}/>
                    })}
                </div>
            </div>
            <div className="mt-auto w-full flex justify-center">
                <div className='w-1/4 flex justify-center'>
                    <SpeedDial ariaLabel="Opciones de mensajes" sx={{ position: 'absolute', top: 515}} icon={<FontAwesomeIcon icon={faBars} size="lg"/>}>
                        <SpeedDialAction
                            key={'Imágen'}
                            icon={<FontAwesomeIcon icon={faImage} size="lg"/>}
                            tooltipTitle={'Enviar Imágen'}
                            onClick={handlerAbrirModalImagen}
                        />
                        <SpeedDialAction
                            key={'Ubicación'}
                            icon={<FontAwesomeIcon icon={faLocationDot} size="lg"/>}
                            tooltipTitle={'Enviar Ubicación'}
                            onClick={handlerAbrirModalUbicacion}
                        />
                    </SpeedDial>
                </div>
                <div className='w-3/4 flex'>
                    {base64 !== '' && <div className='absolute flex w-1/5 h-1/4 bg-cyan-900 p-2 top-[64%] right-[30%] rounded-md items-center justify-center'>
                        <img src={base64} alt={'Imágen cargada'} className='w-auto h-full'/>
                    </div>}
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
            {modalImagen && <EnviarImagen show={modalImagen} cerrarModal={handlerCerrarModalImagen} enviar={enviarImagen}/>}
            {modalUbicacion && <EnviarUbicacion show={modalUbicacion} cerrarModal={handlerCerrarModalUbicacion}/>}
        </div>
    );
}