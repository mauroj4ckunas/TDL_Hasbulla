import React from 'react';


export default function ContactoChat(){
    return (
        <>
        <ul className="divide-y divide-gray-100">
            <li className="gap-x-6 py-5">
                <div className='flex justify-between mx-5 px-3 py-2 hover:bg-gray-500 rounded-md'>
                    <div className=''>
                        <p className="text-sm font-semibold leading-6 text-gray-100">{"nombre"}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-400">
                            {"ultimo mensaje"}
                        </p>
                    </div>
                    <div className='italic text-gray-400 '>
                        {"fecha de envio"}
                    </div>
                </div>
            </li>
            <li className="gap-x-6 py-5">
                <div className='flex justify-between mx-5 px-3 py-2 hover:bg-gray-500 rounded-md'>
                    <div className=''>
                        <p className="text-sm font-semibold leading-6 text-gray-100">{"nombre"}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-400">
                            {"ultimo mensaje"}
                        </p>
                    </div>
                    <div className='italic text-gray-400 '>
                        {"fecha de envio"}
                    </div>
                </div>
            </li>
            <li className="gap-x-6 py-5">
                <div className='flex justify-between mx-5 px-3 py-2 hover:bg-gray-500 rounded-md'>
                    <div className=''>
                        <p className="text-sm font-semibold leading-6 text-gray-100">{"nombre"}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-400">
                            {"ultimo mensaje"}
                        </p>
                    </div>
                    <div className='italic text-gray-400 '>
                        {"fecha de envio"}
                    </div>
                </div>
            </li>
        </ul>
        </>
    )
}