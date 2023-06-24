import React from 'react';
import { Chats } from '../classes/Chats';
import { Usuarios } from '../classes/Usuarios';

interface Props {
    chat: Chats,
    contacto: Usuarios,
    seleccionarChat: (contactoElegido: Usuarios, chatSeleccionado: Chats) => void
}

export default function ContactoChat({chat, contacto, seleccionarChat}: Props){

    return (
        <>
            <div className='flex justify-between mx-5 px-3 py-2 hover:bg-gray-500 rounded-md cursor-pointer' onClick={() => seleccionarChat(contacto, chat)}>
                <div className=''>
                    <p className="text-sm font-semibold leading-6 text-gray-100">{contacto.username}</p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-400">
                        Hola Gerson
                    </p>
                </div>
                <div className='italic text-gray-400 '>
                    23/6/2023
                </div>
            </div>
        </>
    )
}