import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./Loginpage";
import RegisterPage from "./Registerpage";
import { RouterLayout } from "./RouterLayout";

export const AppRouter: React.FC<{}> = () =>{

    return (
        <Routes>
            <Route path="/" element ={<LoginPage/>}/>
            <Route path="/register" element ={<RegisterPage/>}/>
        </Routes>
    )
}