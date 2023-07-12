import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faDisplay } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import '../login.css'
import {Link} from "react-router-dom"



export default function RegisterPage(){
    return(    
       <form className="formulario">
        <h1>Registrate</h1>
        <div className="contenedor">
            <div className="input-contenedor">
                <i className="icon"><FontAwesomeIcon icon={faUser}/></i>
                <input className="sinBorde" type="text" placeholder="Nombre de usuario" />
            </div>

            <div className="input-contenedor">
                <i className="icon"><FontAwesomeIcon icon={faDisplay} size="sm"/></i>
                <input className="sinBorde incon-pantalla" type="text" placeholder="Nombre en pantalla" />
            </div>
            
            <div className="input-contenedor">
                <i className="icon"><FontAwesomeIcon icon={faLock}/></i>
                <input className="sinBorde" type="password" placeholder="Contraseña" />
            </div>

            <input type="submit" value="Registrate" className="button"></input>
            <p className=" text-center mt-2">¿Ya tienes una cuenta? <Link to='/' className="text-blue-950 hover:text-blue-300 underline decoration-blue-950 hover:decoration-blue-300">Iniciar Sesion</Link></p>
            </div>
       </form>

    );
}