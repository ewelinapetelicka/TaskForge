import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Project} from "../../modules/projects/models/project/project";
import {RootState} from "../store";

interface ProjectsState {
    projects: Project[];
}

const initialState: ProjectsState = {
    projects: [],
}

export const projectsSlice = createSlice({
    name: "projectsSlice",
    initialState,
    reducers: {
        setProjects:(state, action: PayloadAction<Project[]>)=>{
            state.projects = action.payload;
        }
    }
});

export const selectProjects = (state: RootState)=> state.projects.projects;

export const { setProjects} = projectsSlice.actions;
