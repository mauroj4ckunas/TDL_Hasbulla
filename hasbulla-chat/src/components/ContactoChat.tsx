import React from 'react';
import { Chats } from '../classes/Chats';
import { Usuarios } from '../classes/Usuarios';
import { Mensajes } from '../classes/Mensajes';
import { FirebaseBD } from '../classes/BDconfig/FirebaseBD';
import { useObtenerUltimoMensaje, useObtenerUsuario } from '../classes/HooksFetch';

interface Props {
    chat: Chats,
    db: FirebaseBD,
    usuarioLogueado: Usuarios
    seleccionarChat: (contactoElegido: Usuarios, chatSeleccionado: Chats) => void
}

export default function ContactoChat({chat, db, usuarioLogueado, seleccionarChat}: Props){
    
    const ultimoMensaje = useObtenerUltimoMensaje(chat.idChat, db);
    const usernameContacto = chat.usuarioParticipante1 === usuarioLogueado.username ? chat.usuarioParticipante2 : chat.usuarioParticipante1;
    const c: Usuarios | null = useObtenerUsuario(usernameContacto, db);
    const contacto: Usuarios = c !== null ? c : {nombre: "No se encontro al contacto", username: "", contrasena: ""}
    
    return (
        <>
            <div className='flex flex-col mx-5 px-3  py-2 hover:bg-gray-500 rounded-md cursor-pointer' onClick={() => seleccionarChat(contacto, chat)}>
                <div className='flex justify-between'>
                    <p className="text-sm font-semibold leading-6 text-gray-100 max-w-full">{contacto.nombre}</p>
                    <p className='text-sm italic text-gray-400'>{ultimoMensaje.fechaDeEnvio}</p>
                </div>
                <p className="mt-1 text-sm text-gray-400 truncate hover:text-clip">
                    {ultimoMensaje.texto}
                </p>
            </div>
        </>
    )
}