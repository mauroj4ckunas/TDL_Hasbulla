import React, { useEffect, useState } from 'react';
import '../index.css';
import fondo from '../assets/fondo-hasbulla.png'
import ChatAbierto from './ChatAbierto';
import TituloChats from './TituloChats';
import ContactoChat from './ContactoChat';
import { Usuarios } from '../classes/Usuarios';
import { Chats } from '../classes/Chats';
import { useObtenerTodosLosChats, useObtenerUltimoMensaje, useObtenerUsuario } from '../classes/HooksFetch';
import { FirebaseBD } from '../classes/BDconfig/FirebaseBD';
import NingunChatAbierto from './NingunChatAbierto';
import { Mensajes } from '../classes/Mensajes';
import AgregarContacto from './AgregarContacto';

interface Props {
  usuarioLogueado: Usuarios,
}

export default function Wordspace({usuarioLogueado}: Props) {

  const db: FirebaseBD = new FirebaseBD();

  let chats: Chats[] = useObtenerTodosLosChats(usuarioLogueado.username, db)

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

  const listaDeContactos = chats.map((chat, index) => {
    return (
      <li className="gap-x-6 py-3" key={index}>
        <ContactoChat chat={chat} db={db} usuarioLogueado={usuarioLogueado} seleccionarChat={seleccionarChat} />
      </li>
    );
  });

  const [modalContacto, setModalContacto] = useState<boolean>(false);

  const handlerAbrirModal = () => setModalContacto(true);

  const handlerCerrarModal = () => {
    setModalContacto(false);
    console.log("Modal cerrado")
  }

  const agendarUsuario = () => {
    setModalContacto(false);
    handlerCerrarModal()
  }

  return (
    <>
    <div className='flex'>
      <section id="lista-chats" className='bg-gray-800 h-screen w-0 md:w-1/4'>
          <div className="h-screen">
              <TituloChats mostrarModal={handlerAbrirModal}/>
              <ul className="">
                {listaDeContactos}
              </ul>
          </div> 
      </section>
      <section id="chat-abierto" className="bg-gray-900 w-full md:3-3/4" style={{ backgroundImage: `url(${fondo})` }}>
        { 
        chatAbierto 
          ?
          <ChatAbierto chat={chatSeleccionado} usuarioLogueado={usuarioLogueado} contacto={contacto} db={db} />
          :
          <NingunChatAbierto/>
        }
      </section>
    </div>
    {modalContacto && <AgregarContacto show={modalContacto} cerrarModal={handlerCerrarModal}/>}
    </>
  );
}
