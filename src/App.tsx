import React from 'react';
import './App.css';
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";
import {DashboardPage} from "./modules/dashboard/pages/dashboard-page/DashboardPage";
import {LayoutPage} from "./pages/layout-page/LayoutPage";
import {ProjectsDashboardPage} from "./modules/projects/pages/projects-dashboard-page/ProjectsDashboardPage";
import {store} from "./store/store";
import {SnackbarProvider} from "notistack";
import {ProjectLayoutPage} from "./modules/projects/pages/project-layout-page/ProjectLayoutPage";
import {ProjectsLayoutPage} from "./modules/projects/pages/projects-layout-page/ProjectsLayoutPage";
import {ProjectBacklogPage} from "./modules/projects/pages/project-backlog-page/ProjectBacklogPage";
import {ProjectSettingsPage} from "./modules/projects/pages/project-settings-page/ProjectSettingsPage";
import {ProjectTaskBrowserPage} from "./modules/projects/pages/project-task-browser-page/ProjectTaskBrowserPage";

import {PrimeReactProvider} from 'primereact/api';
import {ProjectKanbanPage} from "./modules/projects/pages/project-kanban-page/ProjectKanbanPage";
import {ProjectDashboardPage} from "./modules/projects/pages/project-dashboard-page/ProjectDashboardPage";


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
                                path: 'settings',
                                element: <ProjectSettingsPage/>
                            },
                            {
                                path: 'browser',
                                element: <ProjectTaskBrowserPage/>
                            },
                            {
                                path: "kanban",
                                element: <ProjectKanbanPage/>
                            },
                            {
                                path: "project-dashboard",
                                element: <ProjectDashboardPage/>
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
        <PrimeReactProvider>
            <SnackbarProvider>
                <Provider store={store}>
                    <RouterProvider router={router}/>
                </Provider>
            </SnackbarProvider>
        </PrimeReactProvider>
    )
}
