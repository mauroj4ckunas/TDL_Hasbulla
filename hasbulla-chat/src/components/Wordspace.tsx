import React, { useEffect, useState } from 'react';
import '../index.css';
import fondo from '../assets/fondo-hasbulla.png'
import ChatAbierto from './ChatAbierto';
import TituloChats from './TituloChats';
import ContactoChat from './ContactoChat';


export default function WordspaceComp() {


  return (
    <>
    <div className='flex'>
      <section id="lista-chats" className='bg-gray-800 h-screen lg:w-1/4'>
          <div className="h-screen">
              <TituloChats/>
              {contactos.map((c, index) => {
                  return <div key={index} onClick={abrirChat}><ContactoChat contacto={c}/></div>
              })}
          </div> 
      </section>
      <section id="chat-abierto" className="bg-gray-900 lg:w-3/4 w-full" style={{ backgroundImage: `url(${fondo})` }}>
        <ChatAbierto mandarYRecibirMensajes={MandarYRecibirMensajes} contacto={contactoEjemplo}/>
      </section>
    </div>
    </>
  );
}
