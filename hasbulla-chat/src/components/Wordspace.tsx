import React, { useEffect, useState } from 'react';
import '../index.css';
import fondo from '../assets/fondo-hasbulla.png'
import ChatAbierto from './ChatAbierto';
import TituloChats from './TituloChats';
import ContactoChat from './ContactoChat';
import { Usuarios } from '../classes/Usuarios';
import { Chats } from '../classes/Chats';
import { useObtenerTodosLosChats } from '../classes/HooksFetch';
import { FirebaseBD } from '../classes/BSconfig/FirebaseBD';

interface Props {
  usuarioLogueado: Usuarios,
}

export default function WordspaceComp({usuarioLogueado}: Props) {

  const db: FirebaseBD = new FirebaseBD();

  let [chats, setChats] = useState<Chats[]>([]);

  const ObtenerChats = () => {
    setChats(useObtenerTodosLosChats(usuarioLogueado.username, db));
  }

  useEffect(() => {
    ObtenerChats();
  }, []);

  const abrirChat = () => {
  }

  

  return (
    <>
    <div className='flex'>
      <section id="lista-chats" className='bg-gray-800 h-screen lg:w-1/4'>
          <div className="h-screen">
              <TituloChats/>
              <ul className="divide-y divide-gray-100">
                {chats.map((c, index) => {
                    return <li className="gap-x-6 py-5" key={index} onClick={abrirChat}><ContactoChat /></li>
                })}
              </ul>
          </div> 
      </section>
      <section id="chat-abierto" className="bg-gray-900 lg:w-3/4 w-full" style={{ backgroundImage: `url(${fondo})` }}>
        <ChatAbierto />
      </section>
    </div>
    </>
  );
}
