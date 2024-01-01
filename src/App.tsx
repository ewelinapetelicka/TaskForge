import React, {useEffect} from 'react';
import './App.css';
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import {Login} from "./pages/login/Login";
import {useDispatch, useSelector} from "react-redux";
import {selectIsLogged, setUsers} from "./store/user/user.slice";
import {Dashboard} from "./pages/dashboard/Dashboard";
import {Layout} from "./pages/layout/Layout";
import {ProjectsDashboard} from "./pages/projects-dashboard/ProjectsDashboard";
import {User} from "./models/user/user";
import {useHttpClient} from "./hooks/use-http-client/use-http-client";

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
    const isLogged = useSelector(selectIsLogged);
    const dispatch = useDispatch();
    const http = useHttpClient();

    useEffect(() => {
        if (isLogged) {
            getUsers();
        }
    }, [isLogged]);

    function getUsers() {
        http.get("users")
            .then((users: User[]) => dispatch(setUsers(users)))
    }

    if (!isLogged) {
        return <Login/>
    }

    return <RouterProvider router={router}/>;
}
