import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import '../login.css'
import {Link} from "react-router-dom"

interface Props {
    login: ({ username, contrasena }: { username: string, contrasena: string }) => void;
}

export default function LoginPage({login}: Props){
    
    const usuario = useRef<HTMLInputElement>(null);
    const contrasena = useRef<HTMLInputElement>(null);

    const logear = () => {
        if (usuario.current?.value && contrasena.current?.value) {
            login({username: usuario.current?.value, contrasena: contrasena.current?.value})
        } else {
            alert("Completa todos los campos necesarios")
        }
    }

    return(
        <div className="formulario">
        <h1>Iniciar Sesión</h1>
        <div className="contenedor">
            <div className="input-contenedor">
                <i className="icon"><FontAwesomeIcon icon={faUser}/></i>
                <input ref={usuario} className="sinBorde" type="text" placeholder="Nombre de usuario" />
            </div>
            
            <div className="input-contenedor">
                <i className="icon"> <FontAwesomeIcon icon={faLock}/></i>
                <input ref={contrasena} className="sinBorde" type="password" placeholder="Contraseña" />
            </div>

            <button type="submit" className="button" onClick={() => {logear()}}>Iniciar sesion</button>
            <p className=" text-center mt-2">No tienes una cuenta? <Link to='/register' className="text-blue-950 hover:text-blue-300 underline decoration-blue-950 hover:decoration-blue-300">Click aquí</Link></p>
            </div>
       </div>
    );
}
