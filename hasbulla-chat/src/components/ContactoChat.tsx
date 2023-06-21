import React from 'react';
import { Contacto } from './Wordspace';

interface Props {
    contacto: Contacto,
}


export default function ContactoChat({contacto}: Props){
    return (
        <>
        <ul className="divide-y divide-gray-100">
            <li className="gap-x-6 py-5">
                <div className='flex justify-between mx-5 px-3 py-2 hover:bg-gray-500 rounded-md'>
                    <div className=''>
                        <p className="text-sm font-semibold leading-6 text-gray-100">{contacto.nombre}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-400">
                            {/* {contacto.ultimoMensaje.texto} */}
                        </p>
                    </div>
                    <div className='italic text-gray-400 '>
                        {/* {contacto.ultimoMensaje.fechaDeEnvio} */}
                    </div>
                </div>
            </li>
        </ul>
        </>
    )
}