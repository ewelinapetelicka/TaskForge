import React from 'react';
import './App.css';
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import {Login} from "./pages/login/Login";
import {useSelector} from "react-redux";
import {isUserLoggedIn} from "./store/user/user.slice";
import {Dashboard} from "./pages/dashboard/Dashboard";
import {Layout} from "./pages/layout/Layout";
import {ProjectsDashboard} from "./pages/projects-dashboard/ProjectsDashboard";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout></Layout>,
        children: [
            {
                path: 'dashboard',
                element: <Dashboard/>,
            },
            {
                path: 'project-dashboard',
                element: <ProjectsDashboard/>
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
