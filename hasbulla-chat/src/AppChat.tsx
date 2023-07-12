import { useEffect, useRef, useState } from "react";
import Wordspace from "./components/Wordspace";
import { Socket, io } from "socket.io-client";
import BrowserRouterApp from "./BrowserRouterApp";
import { Usuarios } from "./classes/Usuarios";
import { Route, Routes, redirect } from "react-router-dom";
import LoginPage from "./components/Loginpage";
import RegisterPage from "./components/Registerpage";

export default function AppChat() {
  return (
    <Wordspace usuarioLogueado={{username: 'mjackunas', nombre: 'Mauro Jackunas', contrasena: 'Uba123'}}/>
  );
}