import React from 'react';

interface Props {
    contacto: string;
}

export default function NombreDeChat({contacto}: Props){
    return(
        <div className="bg-gray-800 text-white text-2xl p-4 border-l border-black">
            <h2>{contacto}</h2>
        </div>
    );
}