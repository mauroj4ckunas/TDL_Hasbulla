import React from 'react';
import { Mensajes } from '../classes/Mensajes';
import MapaUbicacionActual from './MapaUbicacionActual';

interface Props {
    mensaje: Mensajes;
}

export function MensajeEnviado({mensaje}: Props){

    return (
        <>  
            <div className='self-end max-w-md bg-green-100 rounded-md px-2 py-1 z-10'>
                {   
                    mensaje.coordenadas.length !== 0 && 
                    <div className='w-80 h-80 '>
                        <MapaUbicacionActual coordenadas={[mensaje.coordenadas[0], mensaje.coordenadas[1]]} />
                    </div>
                }
                {
                    mensaje.imagen && 
                    <div className='my-1 max-w-full'>
                        <img src={mensaje.imagen} alt={'Mensaje con imágen'} className='max-w-full max-h-full'/>
                    </div>
                }
                <p className={`${mensaje.imagen || mensaje.coordenadas.length !== 0 ? 'mt-2' : ''}`}>
                    {mensaje.texto}
                </p>
            </div>
        </>
    )
}


export function MensajeRecibido({mensaje}: Props){
    return (
        <>
            <div className='self-start max-w-md bg-yellow-100 rounded-md px-2 py-1 z-10'>
                {   
                    mensaje.coordenadas.length !== 0 && 
                    <div className='w-80 h-80'>
                        <MapaUbicacionActual coordenadas={[mensaje.coordenadas[0], mensaje.coordenadas[1]]} />
                    </div>
                }
                {
                    mensaje.imagen && 
                    <div className='my-1 max-w-full'>
                        <img src={mensaje.imagen} alt={'Mensaje con imágen'} className='max-w-full max-h-full'/>
                    </div>
                }
                <p className={`${mensaje.imagen || mensaje.coordenadas.length !== 0 ? 'mt-2' : ''}`}>
                    {mensaje.texto}
                </p>
            </div>
        </>
    )
}