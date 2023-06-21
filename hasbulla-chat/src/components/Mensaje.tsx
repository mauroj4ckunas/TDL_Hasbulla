import React from 'react';

interface Props {
    texto: string;
}

export function MensajeEnviado({texto}: Props){
    return (
        <>  
            <div className='self-end max-w-md bg-green-100 rounded-md px-2 py-1'>
                <p>
                    {texto}
                </p>
            </div>
        </>
    )
}


export function MensajeRecibido({texto}: Props){
    return (
        <>
            <div className='self-start max-w-md bg-yellow-100 rounded-md px-2 py-1'>
                <p>
                    {texto}
                </p>
            </div>
        </>
    )
}