import React from 'react';
import '../index.css';
import ListaChats from './ListaChats';

export default function WordspaceComp() {
  return (
    <>
    <div className='flex'>
      <section id="lista-chats" className='bg-gray-800 h-screen lg:w-1/4 hidden lg:block'>
        <ListaChats/>
      </section>
      <section id="chat-abierto" className="bg-gray-900 lg:w-3/4 w-full">
      </section>
    </div>
    </>
  );
}
