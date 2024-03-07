import React from 'react';
import './App.css';
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";
import {DashboardPage} from "./modules/dashboard/pages/dashboard-page/DashboardPage";
import {Layout} from "./Layout";
import {ProjectListPage} from "./modules/project-list/pages/project-list-page/ProjectListPage";
import {store} from "./store/store";
import {SnackbarProvider} from "notistack";
import {ProjectListLayout} from "./modules/project-list/ProjectListLayout";
import {ProjectDetailsLayout} from "./modules/project-details/ProjectDetailsLayout";
import {ProjectBacklogPage} from "./modules/project-details/pages/project-backlog-page/ProjectBacklogPage";
import {ProjectSettingsPage} from "./modules/project-details/pages/project-settings-page/ProjectSettingsPage";
import {ProjectTaskBrowserPage} from "./modules/project-details/pages/project-task-browser-page/ProjectTaskBrowserPage";
import {ProjectKanbanPage} from "./modules/project-details/pages/project-kanban-page/ProjectKanbanPage";
import {ProjectDashboardPage} from "./modules/project-details/pages/project-dashboard-page/ProjectDashboardPage";
import {PrimeReactProvider} from "primereact/api";
import {ProfilePage} from "./modules/profile/pages/profile-page/ProfilePage";
import {ProfileLayout} from "./modules/profile/ProfileLayout";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout></Layout>,
        children: [
            {
                path: 'dashboard',
                element: <DashboardPage/>,
            },
            {
                path: "profile",
                element: <ProfileLayout/>,
                children: [
                    {
                        path: "",
                        element: <ProfilePage/>
                    }
                ]
            },
            {
                path: 'projects',
                element: <ProjectListLayout></ProjectListLayout>,
                children: [
                    {
                        path: 'dashboard',
                        element: <ProjectListPage/>
                    },
                    {
                        path: ':id',
                        element: <ProjectDetailsLayout/>,
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
