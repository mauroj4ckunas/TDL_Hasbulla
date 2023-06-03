import React from 'react';
import NombreDeChat from './NombreDeChat';
import InputMensaje from './InputMensaje';
import RepositorioMensajes from './RepositorioMensajes';

export default function ChatAbierto(){
    return(
        <div className='h-screen w-full relative flex flex-col'>
            <NombreDeChat/>
            <RepositorioMensajes/>
            <InputMensaje/>
        </div>
    );
}