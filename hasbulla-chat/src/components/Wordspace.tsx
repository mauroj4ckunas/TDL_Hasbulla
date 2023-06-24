import React, { useEffect, useState } from 'react';
import '../index.css';
import fondo from '../assets/fondo-hasbulla.png'
import ChatAbierto from './ChatAbierto';
import TituloChats from './TituloChats';
import ContactoChat from './ContactoChat';
import { Usuarios } from '../classes/Usuarios';
import { Chats } from '../classes/Chats';
import { useObtenerTodosLosChats, useObtenerUsuario } from '../classes/HooksFetch';
import { FirebaseBD } from '../classes/BDconfig/FirebaseBD';
import NingunChatAbierto from './NingunChatAbierto';

interface Props {
  usuarioLogueado: Usuarios,
}

export default function WordspaceComp({usuarioLogueado}: Props) {

  const db: FirebaseBD = new FirebaseBD();

  // let chats = useObtenerTodosLosChats(usuarioLogueado.username, db)

  const contactoInicial = {
    username: "",
    nombre: "",
    contrasena: "",
  }

  const chatInicial = {
    idChat: 0,
    usuarioParticipante1: '',
    usuarioParticipante2: '',
    mensajes: undefined
  }

  const [chatSeleccionado, setChatSeleccionado] = useState<Chats>(chatInicial)
  const [contacto, setContacto] = useState<Usuarios>(contactoInicial);
  const [chatAbierto, setChatAbierto] = useState<boolean>(false);

  const chats = [
    {
        idChat: 1,
        usuarioParticipante1: 'mjackunas',
        usuarioParticipante2: 'salvarez',
    },
    {
        idChat: 2,
        usuarioParticipante1: 'mjackunas',
        usuarioParticipante2: 'gcondori',
    }
  ]

  const ContactoDelChat = (chat: Chats): Usuarios => {
    const usernameContacto = chat.usuarioParticipante1 === usuarioLogueado.username ? chat.usuarioParticipante2 : chat.usuarioParticipante1;
    //const contacto: Usuarios = useObtenerUsuario(usernameContacto, db);
    
    if (usernameContacto === "gcondori") {
      return {
        username: usernameContacto,
        nombre: "Guillermo Condori",
        contrasena: "Gerson123",
      }
    }

    return {
      username: usernameContacto,
      nombre: "Santiago Alvarez",
      contrasena: "Gerson123",
    }
  }

  useEffect(() => {
    if (contacto !== contactoInicial) {
      setContacto(contacto);
    }
  }, [contacto]);

  useEffect(() => {
    if (chatSeleccionado !== chatInicial) {
      setChatSeleccionado(chatSeleccionado);
    }
  }, [chatSeleccionado]);

  useEffect(() => {
    setChatAbierto(chatAbierto);
  }, [chatAbierto]);

  const seleccionarChat = (contactoElegido: Usuarios, chatElegido: Chats): void => {
    setContacto(contactoElegido)
    setChatSeleccionado(chatElegido)
    setChatAbierto(true);
  }

  return (
    <>
    <div className='flex'>
      <section id="lista-chats" className='bg-gray-800 h-screen lg:w-1/4'>
          <div className="h-screen">
              <TituloChats/>
              <ul className="">
                {chats.map((c, index) => {
                    return <li className="gap-x-6 py-3" key={index}><ContactoChat chat={c} contacto={ContactoDelChat(c)} seleccionarChat={seleccionarChat}/></li>
                })}
              </ul>
          </div> 
      </section>
      <section id="chat-abierto" className="bg-gray-900 lg:w-3/4 w-full" style={{ backgroundImage: `url(${fondo})` }}>
        { chatAbierto ?
          <ChatAbierto chat={chatSeleccionado} usuarioLogueado={usuarioLogueado} contacto={contacto} db={db} />
          :
          <NingunChatAbierto/>
        }
      </section>
    </div>
    </>
  );
}
