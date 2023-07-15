import { useEffect, useState } from 'react';
import '../index.css';
import fondo from '../assets/fondo-hasbulla.png'
import ChatAbierto from './ChatAbierto';
import TituloChats from './TituloChats';
import ContactoChat from './ContactoChat';
import { Usuarios } from '../classes/Usuarios';
import { Chats } from '../classes/Chats';
import { useObtenerTodosLosChats } from '../classes/HooksFetch';
import NingunChatAbierto from './NingunChatAbierto';
import AgregarContacto from './AgregarContacto';
import CerrarSesion from './CerrarSesion';
import { BD } from '../classes/BDconfig/BD';

interface Props {
  usuarioLogueado: Usuarios,
  bd: BD,
  desloguear: () => void
}

export default function Wordspace({usuarioLogueado, bd, desloguear}: Props) {

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
  const [listaDeChats, setListaDeChats] = useState<Chats[]>([]);

  useEffect(() => {
    bd.ObtenerTodosLosChats(usuarioLogueado.username)
      .then(chats => {
        setListaDeChats(chats);
      })
      .catch(error => alert("Fallo al cargar los chats del usuario."))
  }, []);

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

  const guardarContactoEnBD = (contacto: string) => {
    bd.ObtenerUsuario(contacto).then(usuario => {
      if (usuario){
        bd.UltimoIdDeChats().then(idChats => {
          bd.CrearChat(idChats + 1,usuarioLogueado.username,contacto)
          setListaDeChats([...listaDeChats, 
          {
            idChat: idChats + 1,
            usuarioParticipante1: usuarioLogueado.username,
            usuarioParticipante2: contacto,
          }]);
        })
      } else {
        alert("Error al agendar usuario")
      }
    } 
    )
  }

  const [modalContacto, setModalContacto] = useState<boolean>(false);

  const handlerAbrirModalContacto = () => setModalContacto(true);

  const handlerCerrarModalContacto = () => setModalContacto(false);

  const agendarContacto = (usuario: string) => {
    if(usuario){
      guardarContactoEnBD(usuario);
      handlerCerrarModalContacto();
      return;
    }
    alert("Debe proporcionar un nombre de usuario.")
  }

  const [modalCierreSesion, setModalCierreSesion] = useState<boolean>(false);

  const handlerAbrirModalCerrarSesion = () => setModalCierreSesion(true);

  const handlerCerrarModalCerrarSesion = () => setModalCierreSesion(false);

  const cerrarSesion = () => {
    handlerCerrarModalCerrarSesion();
    desloguear();
  }


  return (
    <>
    <div className='flex'>
      <section id="lista-chats" className='bg-gray-800 h-screen w-0 md:w-1/4'>
          <div className="h-screen">
              <TituloChats modalAgregarUsuario={handlerAbrirModalContacto} modalCierreSesion={handlerAbrirModalCerrarSesion}/>
              <ul className="">
                {
                  listaDeChats.length > 0 && listaDeChats.map((chat, index) => {
                    return (
                      <li className="gap-x-6 py-3" key={index}>
                        <ContactoChat chat={chat} bd={bd} usuarioLogueado={usuarioLogueado} seleccionarChat={seleccionarChat} />
                      </li>
                    );
                  })
                }
              </ul>
          </div> 
      </section>
      <section id="chat-abierto" className="bg-gray-900 w-full md:3-3/4" style={{ backgroundImage: `url(${fondo})` }}>
        { 
        chatAbierto 
          ?
          <ChatAbierto chat={chatSeleccionado} usuarioLogueado={usuarioLogueado} contacto={contacto} bd={bd} />
          :
          <NingunChatAbierto/>
        }
      </section>
    </div>
    {modalContacto && <AgregarContacto show={modalContacto} cerrarModal={handlerCerrarModalContacto} agregarContacto={agendarContacto}/>}
    {modalCierreSesion && <CerrarSesion show={modalCierreSesion} cerrarModal={handlerCerrarModalCerrarSesion} cerrarSesion={cerrarSesion}/>}
    </>
  );
}
