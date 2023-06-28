import React, { useState } from "react";
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AgregarContacto from "./AgregarContacto";

interface Props {
    mostrarModal: () => void
}

export default function TituloChats({mostrarModal}: Props){

    

    return (
        <>  
        <div className="flex justify-between">
            <div className="text-white text-2xl p-4">
                <h2 className="italic">Chats</h2>
            </div>
            <button className="bg-gray-300 hover:bg-gray-600 rounded-full mr-5 mt-4 px-2 py-1 h-1/2" onClick={mostrarModal}>
                <i className="icon"><FontAwesomeIcon icon={faPlus}/></i>
            </button>
        </div>
        <hr className="border-black"/>
        </>
    );
}