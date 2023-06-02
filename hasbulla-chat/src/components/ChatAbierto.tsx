import React from 'react';
import NombreDeChat from './NombreDeChat';
import InputMensaje from './InputMensaje';
import RepositorioMensajes from './RepositorioMensajes';

export default function ChatAbierto(){
    return(
        <div className='h-full w-full relative'>
            <NombreDeChat/>
            <RepositorioMensajes/>
            <InputMensaje/>
        </div>
    );
}