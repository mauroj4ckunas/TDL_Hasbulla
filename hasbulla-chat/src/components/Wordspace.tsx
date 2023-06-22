import React, { useEffect, useState } from 'react';
import '../index.css';
import fondo from '../assets/fondo-hasbulla.png'
import ChatAbierto from './ChatAbierto';
import {db} from '../firebase'
import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore/lite';
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
    const mensajesDoc = doc(db, 'mensajeTest', '2')
    const userCol = collection(mensajesDoc, 'usuariosTest');
    const nuevoDocumentoRef = doc(userCol, '4');

    // const msjDoc = await getDoc(doc(collection(db, 'mensajeTest')));
    // const msjDoc = await getDoc(doc(db, "mensajeTest", '2'))
    // console.log(msjDoc.data());

    // const q = query(collection(db, "mensajeTest"), where("fechaDeEnvio", "==", "21/6/2023"));
    // const querySnapshot = await getDocs(q);
    // console.log(querySnapshot)
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    // });

    await addDoc(userCol, {
      nombre: 'Gerson',
      username: 'quepelota2',
    });
    await setDoc(nuevoDocumentoRef, msj);

    const querySnapshot = await getDocs(collection(db, "mensajeTest", "2", "usuariosTest"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
    // doc(db, 'mensajeTest', "Mensaje con SubCollection", 'usuariosTest', 'usuario1')
    // await setDoc(doc(db, 'mensajeTest', "Mensaje con SubCollection"), msj)
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
