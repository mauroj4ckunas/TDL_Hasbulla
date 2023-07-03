import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import '../login.css'
import {Link} from "react-router-dom"



export default function LoginPage(){
   
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
            <p>No tienes una cuenta? <Link to='/register'>Click aquí</Link></p>
            </div>
       </form>
    );
}
