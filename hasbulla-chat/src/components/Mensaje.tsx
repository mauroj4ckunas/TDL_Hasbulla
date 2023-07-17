import React from 'react';
import { Mensajes } from '../classes/Mensajes';
import MapaUbicacionActual from './MapaUbicacionActual';

interface Props {
    mensaje: Mensajes;
}

export function MensajeEnviado({mensaje}: Props){

    return (
        <>
            <div className={`${mensaje.idMensaje === 0 ? ' hidden' : 'self-end max-w-md'}`}>
                <div className={`bg-green-100 rounded-md px-2 py-1 z-10'`}>
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
                {
                    mensaje.reaccion !== 0 &&
                    <div className='w-5 h-5 float-right'>
                        {
                            mensaje.reaccion === 1 && <img src="happy_icon.png" alt="reaccion feliz" />
                        }
                        {
                            mensaje.reaccion === 2 && <img src="sad_icon.png" alt="reaccion triste" />
                        }
                    </div>
                }
                
            </div>
        </>
    )
}


export function MensajeRecibido({mensaje}: Props){
    return (
        <>
            <div className={`${mensaje.idMensaje === 0 ? ' hidden' : 'self-start max-w-md bg-yellow-100 rounded-md px-2 py-1 z-10'}`}>
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