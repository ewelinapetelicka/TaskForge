import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Project} from "../../models/project/project";
import {userSlice} from "../user/user.slice";
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
        setProjects:(state, action: PayloadAction<{projects: Project[]}>)=>{
            state.projects = action.payload.projects;

        }
    }
});

export const selectProjects = (state: RootState)=> state.projects.projects;

export const { setProjects} = projectsSlice.actions;
