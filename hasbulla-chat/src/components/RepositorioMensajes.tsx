import React from 'react';
import { MensajeEnviado, MensajeRecibido } from './Mensaje';

type Mensaje = {
    texto: string,
    fechaDeEnvio: Date,
    origen: boolean,
}

export default function RepositorioMensajes(props: any){
    
    

    return (
        <div className='w-full h-full flex justify-center overflow-y-auto scroll_chat'>
            <div className='my-2 w-3/4 flex flex-col space-y-2 text-black text-left'>
                <MensajeEnviado/>
            </div>
        </div>
    );
}