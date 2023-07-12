import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./Loginpage";
import RegisterPage from "./Registerpage";
import Wordspace from "./Wordspace";

interface Props {
    login: ({ username, contrasena }: { username: string, contrasena: string }) => void;
}

export default function AppRouter({login}: Props){

    return (
        <Routes>
            <Route path="/" element ={<LoginPage login={login}/>}/>
            <Route path="/register" element ={<RegisterPage/>}/>
        </Routes>
    )
}