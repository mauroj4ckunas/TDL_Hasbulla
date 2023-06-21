import React, { useEffect, useState } from 'react';
import '../index.css';
import fondo from '../assets/fondo-hasbulla.png'
import ChatAbierto from './ChatAbierto';
import {db} from '../firebase'
import { addDoc, collection } from 'firebase/firestore/lite';
import TituloChats from './TituloChats';
import ContactoChat from './ContactoChat';

export type Mensaje = {
  texto: string,
  fechaDeEnvio: string,
  id: string,
}

export type Contacto = {
  nombre: string,
  id: string,
}


export default function WordspaceComp() {

  let [contactos, setContactos] = useState<Contacto[]>([]);

  const contactoEjemplo: Contacto = {
    nombre: "Gerson",
    id: "0",
  }

  const cargarContactos = () => {
    setContactos([...contactos, contactoEjemplo]);
  }

  useEffect(() => {
    cargarContactos();
  }, []);

  const mandarYRecibirMensajes = async (msj: Mensaje) => {
    const mensajesCol = collection(db, 'mensajeTest');
    await addDoc(mensajesCol, msj);
  }

  const abrirChat = () => {
    console.log("Chat abierto")
  }

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
        <ChatAbierto mandarYRecibirMensajes={mandarYRecibirMensajes} contacto={contactoEjemplo}/>
      </section>
    </div>
    </>
  );
}
