import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons'

export default function InputMensaje(){
    return(
        <div className="mt-auto flex w-full justify-center">  
            <input type="text" placeholder="Escriba un mensaje"
                className="my-5 px-4 py-3 w-2/3 rounded-full
                bg-gray-900 text-white">
            </input>
            <button className="my-5 ml-2 px-4 rounded-full
                    bg-cyan-300 hover:bg-cyan-50">
                <FontAwesomeIcon icon={faShare} size="2x"/>
            </button>
        </div>
    );
}