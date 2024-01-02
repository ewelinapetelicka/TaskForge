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
import {ProjectLayoutPage} from "./pages/project-layout-page/ProjectLayoutPage";
import {ProjectsLayoutPage} from "./pages/projects-layout-page/ProjectsLayoutPage";
import {ProjectBacklogPage} from "./pages/project-backlog-page/ProjectBacklogPage";
import {ProjectSettingsPage} from "./pages/project-settings-page/ProjectSettingsPage";
import {ProjectTaskBrowserPage} from "./pages/project-task-browser-page/ProjectTaskBrowserPage";

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
                        element: <ProjectLayoutPage/>,
                        children: [
                            {
                                path: 'backlog',
                                element: <ProjectBacklogPage/>
                            },
                            {
                                path:'settings',
                                element: <ProjectSettingsPage/>
                            },
                            {
                                path:'browser',
                                element: <ProjectTaskBrowserPage/>
                            }
                        ]
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
