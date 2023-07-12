import React, { useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faDisplay } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import '../login.css'
import {Link} from "react-router-dom"
import { Usuarios } from "../classes/Usuarios";

interface Props {
    register: ({ username, nombre, contrasena }: Usuarios) => void;
}

export default function RegisterPage({register}: Props){

    const username = useRef<HTMLInputElement>(null);
    const nombre = useRef<HTMLInputElement>(null);
    const contrasena = useRef<HTMLInputElement>(null);

    const registrar = () => {
        if (username.current?.value && nombre.current?.value && contrasena.current?.value) {
            register({username: username.current?.value, nombre: nombre.current?.value, contrasena: contrasena.current?.value})
        } else {
            alert("Completa todos los campos necesarios")
        }
    }

    return(    
       <div className="formulario">
        <h1>Registrate</h1>
        <div className="contenedor">
            <div className="input-contenedor">
                <i className="icon"><FontAwesomeIcon icon={faUser}/></i>
                <input ref={username} className="sinBorde" type="text" placeholder="Nombre de usuario" />
            </div>

            <div className="input-contenedor">
                <i className="icon"><FontAwesomeIcon icon={faDisplay} size="sm"/></i>
                <input ref={nombre} className="sinBorde incon-pantalla" type="text" placeholder="Nombre en pantalla" />
            </div>
            
            <div className="input-contenedor">
                <i className="icon"><FontAwesomeIcon icon={faLock}/></i>
                <input ref={contrasena} className="sinBorde" type="password" placeholder="Contraseña" />
            </div>

            <button value="Registrate" className="button" onClick={registrar}>Registrar nuevo Usuario</button>
            <p className=" text-center mt-2">¿Ya tienes una cuenta? <Link to='/' className="text-blue-950 hover:text-blue-300 underline decoration-blue-950 hover:decoration-blue-300">Iniciar Sesion</Link></p>
            </div>
       </div>

    );
}