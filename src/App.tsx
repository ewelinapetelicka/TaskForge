import React from 'react';
import './App.css';
import {createBrowserRouter, Navigate, Outlet, RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";
import {DashboardPage} from "./pages/dashboard-page/DashboardPage";
import {LayoutPage} from "./pages/layout-page/LayoutPage";
import {ProjectsDashboardPage} from "./pages/projects-dashboard-page/ProjectsDashboardPage";
import {store} from "./store/store";
import {ThemeProvider} from "@mui/material/styles";
import {theme} from "./theme";
import {CssBaseline} from "@mui/material";
import {SnackbarProvider} from "notistack";
import {ProjectDetailsPage} from "./pages/project-details-page/ProjectDetailsPage";
import {ProjectsLayoutPage} from "./pages/projects-layout-page/ProjectsLayoutPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <LayoutPage></LayoutPage>,
        children: [
            {
                path: 'dashboard',
                element: <DashboardPage/>,
            },
            {
                path: 'projects',
                element: <ProjectsLayoutPage></ProjectsLayoutPage>,
                children: [
                    {
                        path: 'dashboard',
                        element: <ProjectsDashboardPage/>
                    },
                    {
                        path: ':id',
                        element:<ProjectDetailsPage/>
                    }
                ]
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
