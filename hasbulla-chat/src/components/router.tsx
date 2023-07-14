import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./Loginpage";
import RegisterPage from "./Registerpage";
import Wordspace from "./Wordspace";
import { Usuarios } from "../classes/Usuarios";

interface Props {
    login: ({ username, contrasena }: { username: string, contrasena: string }) => void;
    register: ({ username, nombre, contrasena }: Usuarios) => void;
}

export default function AppRouter({login, register}: Props){

    return (
        <Routes>
            <Route path="/" element ={<LoginPage login={login}/>}/>
            <Route path="/register" element ={<RegisterPage register={register}/>}/>
        </Routes>
    )
}