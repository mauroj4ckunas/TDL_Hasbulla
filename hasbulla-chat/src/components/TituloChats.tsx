import React, { useState } from "react";
import { faPlus, faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AgregarContacto from "./AgregarContacto";
import { SpeedDial, SpeedDialAction } from "@mui/material";

interface Props {
    modalAgregarUsuario: () => void,
    modalCierreSesion: () => void,
}

export default function TituloChats({modalAgregarUsuario, modalCierreSesion}: Props){

    

    return (
        <>  
        <div className="flex justify-between mb-2">
            <div className="text-white text-2xl p-4">
                <h2 className="italic">Chats</h2>
            </div>
            <div>
                <SpeedDial ariaLabel="Opciones de mensajes" sx={{position: 'absolute', bottom: 522, left: 240}} icon={<FontAwesomeIcon icon={faPlus} size="2xl"/>} direction="down">   
                    <SpeedDialAction
                        key={'Usuarios'}
                        icon={<FontAwesomeIcon icon={faUser} size="lg"/>}
                        tooltipTitle={'Agregar Contacto'}
                        onClick={modalAgregarUsuario}
                    />
                    <SpeedDialAction
                        key={'Sesion'}
                        icon={<FontAwesomeIcon icon={faRightFromBracket} size="lg"/>}
                        tooltipTitle={'Cerrar Sesión'}
                        onClick={modalCierreSesion}
                    />
                </SpeedDial>
            </div>
        </div>
        <hr className="border-black"/>
        </>
    );
}