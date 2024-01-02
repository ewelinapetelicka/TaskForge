import React from 'react';
import './App.css';
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";
import {DashboardPage} from "./pages/dashboard-page/DashboardPage";
import {LayoutPage} from "./pages/layout-page/LayoutPage";
import {ProjectsDashboardPage} from "./pages/projects-dashboard-page/ProjectsDashboardPage";
import {store} from "./store/store";
import {ThemeProvider} from "@mui/material/styles";
import {theme} from "./theme";
import {CssBaseline} from "@mui/material";
import {SnackbarProvider} from "notistack";

const router = createBrowserRouter([
    {
        path: '/',
        element: <LayoutPage></LayoutPage>,
        children: [
            {
                path: 'dashboard-page',
                element: <DashboardPage/>,
            },
            {
                path: 'project-dashboard-page',
                element: <ProjectsDashboardPage/>
            },
            {
                path:'project/:id'
            }
        ]
    },
    {
        path: '*',
        element: <Navigate to={'/dashboard-page'}></Navigate>
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
