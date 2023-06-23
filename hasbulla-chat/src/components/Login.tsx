import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import '../login.css'


export default function Login(){
    return(
        <form className="formulario">
        <h1>Iniciar Sesión</h1>
        <div className="contenedor">
            <div className="input-contenedor">
                <i className="icon"><FontAwesomeIcon icon={faUser}/></i>
                <input className="sinBorde" type="text" placeholder="Nombre de usuario" />
            </div>
            
            <div className="input-contenedor">
                <i className="icon"> <FontAwesomeIcon icon={faLock}/></i>
                <input className="sinBorde" type="password" placeholder="Contraseña" />
            </div>

            <input type="submit" value="Iniciar sesion" className="button"></input>
            <p>No tienes una cuenta? <a className="link" 
            href="Register.tsx">Registrate</a></p>
            </div>
       </form>
    );
}