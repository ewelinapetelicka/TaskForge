import React from 'react';
import './App.css';
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";
import {Dashboard} from "./pages/dashboard/Dashboard";
import {Layout} from "./pages/layout/Layout";
import {ProjectsDashboard} from "./pages/projects-dashboard/ProjectsDashboard";
import {store} from "./store/store";
import {ThemeProvider} from "@mui/material/styles";
import {theme} from "./theme";
import {CssBaseline} from "@mui/material";
import {SnackbarProvider} from "notistack";

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
    return (
        <ThemeProvider theme={theme}>
            <SnackbarProvider>
                <Provider store={store}>
                    <CssBaseline/>
                    <RouterProvider router={router}/>
                </Provider>
            </SnackbarProvider>
        </ThemeProvider>
    )
}
