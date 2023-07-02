import React from 'react';
import { Mensajes } from '../classes/Mensajes';

interface Props {
    mensaje: Mensajes;
}

export function MensajeEnviado({mensaje}: Props){
    return (
        <>  
            <div className='self-end max-w-md bg-green-100 rounded-md px-2 py-1'>
                {mensaje.imagen && 
                    <div className='my-1'>
                        <img src={mensaje.imagen} alt={'Mensaje con imágen'}/>
                    </div>
                }
                <p>
                    {mensaje.texto}
                </p>
            </div>
        </>
    )
}


export function MensajeRecibido({mensaje}: Props){
    return (
        <>
            <div className='self-start max-w-md bg-yellow-100 rounded-md px-2 py-1'>
                {mensaje.imagen && 
                    <div className='my-1'>
                        <img src={mensaje.imagen} alt={'Mensaje con imágen'}/>
                    </div>
                }
                <p>
                    {mensaje.texto}
                </p>
            </div>
        </>
    )
}