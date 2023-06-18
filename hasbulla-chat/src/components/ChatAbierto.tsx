import React, {useState} from 'react';
import NombreDeChat from './NombreDeChat';
import RepositorioMensajes from './RepositorioMensajes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import {db} from '../firebase'
import { addDoc, collection } from 'firebase/firestore/lite';

export default function ChatAbierto(){

    // const [mensaje,setMensaje] = useState("Que pelota Gerson")

    // const enviarMensaje = () => {
    //     console.log(mensaje);
    //     setMensaje("");
    // }

    const addMensaje = async () => {
        const mensajesCol = collection(db, 'mensajeTest');
        await addDoc(mensajesCol, {
            mensaje: 'Que pelota Gerson',
        });
    }


    return(
        <div className='h-screen w-full relative flex flex-col'>
            <NombreDeChat/>
            <RepositorioMensajes subirMensaje={addMensaje}/>
            <div className="mt-auto flex w-full justify-center">  
                <input id="input_mensaje" type="text" placeholder="Escriba un mensaje"
                    className="my-5 px-4 py-3 w-2/3 rounded-full
                    bg-gray-900 text-white"
                    value={'Que pelota Gerson'}
                >
                </input>
                <button id="enviar" className="my-5 ml-2 px-4 rounded-full
                        bg-cyan-300 hover:bg-cyan-50" 
                        onClick={addMensaje}
                    >
                    <FontAwesomeIcon icon={faShare} size="2x"/>
                </button>
            </div>
        </div>
    );
}