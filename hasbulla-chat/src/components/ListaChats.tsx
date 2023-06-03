import React from "react";
import Chat from "./Chat"
import TituloChats from "./TituloChats"

export default function ListaChats(){
    return(
        <>  
            <div className="h-screen">
                <TituloChats/>
                <Chat/>
            </div> 
        </>
    );
}