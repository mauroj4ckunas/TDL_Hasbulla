import { useState } from "react";
import Wordspace from "./components/Wordspace";
import Login from "./components/Loginpage";
import { BD } from "./classes/BDconfig/BD";
import { FirebaseBD } from "./classes/BDconfig/FirebaseBD";
import { Usuarios } from "./classes/Usuarios";
import AppRouter from "./components/router";

export default function AppChat() {

  const db: BD = new FirebaseBD();

  const [logueado, setLogueado] = useState<Usuarios>();

  const login = ({ username, contrasena }: {username: string, contrasena: string}) => {
    db.Login(username, contrasena)
      .then(log => {
        if(log){
          loguearAUsuario(log);
          return;
        }
        alert("Usuario no existe o error en los datos")
      })
      .catch(error => console.log(error));
  }

  const register = (usuario: Usuarios) => {
    db.CrearUsuario(usuario)
      .then(data => {
        if(!data){
          loguearAUsuario(usuario);
          return;
        }
        alert("El usuario ingresado ya existe, intente con otro");
      })
      .catch(error => console.log(error));
  }
  
  const loguearAUsuario = (usuario: Usuarios) => setLogueado(usuario);
  const desloguearAUsuario = () => setLogueado(undefined)


  return (
    <>
    {
      logueado ? <Wordspace usuarioLogueado={logueado} bd={db} desloguear={desloguearAUsuario}/> 
               : <AppRouter login={login} register={register}/>
    }
    </>
  );
}