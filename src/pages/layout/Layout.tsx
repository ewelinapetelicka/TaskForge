import {Header} from "../../components/core/header/Header";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import React from "react";

export function Layout() {
    const location = useLocation();
    if (location.pathname === "/") {
        return <Navigate to={"/dashboard"}/>
    }
    return (
        <>
            <Header/>
            <Outlet/>
        </>
    )
}