import React from 'react';

export default function Chat(){
    return (
        <>
        <ul className="divide-y divide-gray-100">
            <li className="gap-x-6 py-5">
                <div className='flex justify-between mx-5 px-3 py-2 hover:bg-gray-500 rounded-md'>
                    <div className=''>
                        <p className="text-sm font-semibold leading-6 text-gray-100">Nombre de Contacto</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-400">último mensaje</p>
                    </div>
                    <div className='italic text-gray-400 '>
                        hh/mm
                    </div>
                </div>
            </li>
        </ul>
        </>
    )
}