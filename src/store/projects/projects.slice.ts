import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Project} from "../../modules/projects/models/project/project";
import {RootState} from "../store";

interface ProjectsState {
    projects: Project[];
    loadedProjects: boolean;
    projectDetail: Project | null;
}

const initialState: ProjectsState = {
    projects: [],
    loadedProjects: false,
    projectDetail: null
}

export const projectsSlice = createSlice({
    name: "projectsSlice",
    initialState,
    reducers: {
        setProjects: (state, action: PayloadAction<Project[]>) => {
            state.projects = action.payload;
            state.loadedProjects = true;
        },
        setProjectById: (state, action: PayloadAction<Project>) => {
            state.projects = state.projects.map((el) => {
                if (el.id === action.payload.id) {
                    return action.payload;
                }
                return el;
            })
        },
        openDetailsProject: (state, action: PayloadAction<Project>) => {
            state.projectDetail = action.payload;
        },
        closeDetailsProject: (state) => {
            state.projectDetail = null;
        },
        addProject: (state, action: PayloadAction<Project>) => {
            state.projects.push(action.payload);
        }
    }
});

export const selectProjects = (state: RootState) => state.projects.projects;
export const selectProjectById = (id: number) => (state: RootState) => state.projects.projects.find((el) => el.id === id)!;
export const selectIsProjectDetailOpen = (state: RootState) => state.projects.projectDetail !== null;
export const selectProjectDetails = (state: RootState) => state.projects.projectDetail as Project;
export const selectLoadedProjects = (state: RootState) => state.projects.loadedProjects;
export const {setProjects, setProjectById, openDetailsProject, closeDetailsProject, addProject} = projectsSlice.actions;
