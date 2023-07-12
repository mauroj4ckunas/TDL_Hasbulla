import React from 'react';
import { Usuarios } from '../classes/Usuarios';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './Loginpage';
import RegisterPage from './Registerpage';


interface Props {
    loguearAUsuario: (usuario: Usuarios) => void;
    login: ({ username, contrasena }: { username: string, contrasena: string }) => void;
    register: ({ username, nombre, contrasena }: Usuarios) => void;
}

export default function LoginRegister({login, register, loguearAUsuario}: Props){

    return (
        <Routes>
            <Route path="/" element ={<LoginPage login={login}/>}/>
            <Route path="/register" element ={<RegisterPage register={register}/>}/>
        </Routes>
    )

}