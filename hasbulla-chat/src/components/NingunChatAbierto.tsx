import React from 'react';

export default function NingunChatAbierto() {
    return <div className='h-full w-full flex justify-center items-center'>
        <section className='bg-cyan-700 p-5 rounded-md bg-opacity-70 text-center'>
            <p className='italic font-bold'>Ningún chat seleccionado. <br/> En caso de no tener chats, agende nuevos contactos.</p>
        </section>
    </div>
}