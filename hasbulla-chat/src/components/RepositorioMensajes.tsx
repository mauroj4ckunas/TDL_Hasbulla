import React from 'react';
import { MensajeEnviado, MensajeRecibido } from './Mensaje';

export default function RepositorioMensajes(){
    return (
        <div className='absolute w-full h-4/5 flex justify-center'>
            <div className='my-2 w-3/4'>
                <MensajeEnviado/>
                <MensajeRecibido/>
            </div>
        </div>
    );
}