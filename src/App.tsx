import React from 'react';
import './App.css';
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import {Login} from "./pages/login/Login";
import {useSelector} from "react-redux";
import {isUserLoggedIn} from "./store/user/user.slice";
import {Dashboard} from "./pages/dashboard/Dashboard";
import {Layout} from "./pages/layout/Layout";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout></Layout>,
        children: [
            {
                path: 'dashboard',
                element: <Dashboard/>,
            }
        ]
    },
    {
        path: '*',
        element: <Navigate to={'/dashboard'}></Navigate>
    }
]);

export function App() {
    const isLogged = useSelector(isUserLoggedIn);

    if (!isLogged) {
        return <Login/>
    }

    return <RouterProvider router={router}/>;
}
