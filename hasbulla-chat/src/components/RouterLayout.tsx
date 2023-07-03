import React from "react";
import LoginPage from './Loginpage'
import { Outlet } from "react-router-dom";
    export const RouterLayout: React.FC <{}> = () => {
        return (
            <>
            <LoginPage/>
            <Outlet/>
            </>
      );
    }