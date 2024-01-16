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
        },
        setProjectById:(state, action: PayloadAction<Project>)=>{
            state.projects = state.projects.map((el)=>{
                if(el.id === action.payload.id){
                    return action.payload;
                }
                return el;
            })
        }
    }
});

export const selectProjects = (state: RootState)=> state.projects.projects;
export const selectProjectById = (id: number) => (state: RootState) => state.projects.projects.find((el)=> el.id === id)!;

export const { setProjects, setProjectById} = projectsSlice.actions;
