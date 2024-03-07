import {Project} from "../../modules/project-list/models/project/project";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {Task} from "../../modules/project-details/models/task/task";
import {SprintStatus} from "../../modules/project-details/models/sprint/sprint-status/sprint-status";
import {Sprint} from "../../modules/project-details/models/sprint/sprint";

interface ProfileState {
    projects: Project[];
    loadedProjects: boolean;
    tasks: Task[];
    sprints: Sprint[];
    loadedTasks: boolean;
    loadedSprints: boolean;
}

const initialState: ProfileState = {
    projects: [],
    loadedProjects: false,
    tasks: [],
    sprints: [],
    loadedSprints: false,
    loadedTasks: false
}

export const profileSlice = createSlice({
    name: "profileSlice",
    initialState,
    reducers: {
        setProfileProjects: (state, action: PayloadAction<Project[]>) => {
            state.projects = action.payload;
            state.loadedProjects = true;
        },
        setProfileTasks: (state, action: PayloadAction<Task[]>) => {
            state.tasks = action.payload;
            state.loadedTasks = true;
        },
        setProfileSprints: (state, action: PayloadAction<Sprint[]>) => {
            state.sprints = action.payload;
            state.loadedSprints = true;
        }
    }
})

export const selectProfileLoadedProjects = (state: RootState) => state.profile.loadedProjects;
export const selectProfileLoadedSprints = (state: RootState) => state.profile.loadedSprints;
export const selectProfileLoadedTasks = (state: RootState) => state.profile.loadedTasks;
export const selectProfileProjects = (state: RootState) => state.profile.projects;
export const selectProfileTasks = (state: RootState) => state.profile.tasks;
export const selectProfileTasksPerSprint = (sprintId: number) => (state: RootState) => state.profile.tasks.filter((el) =>
    el.sprintId === sprintId);
export const selectProfileSprintInProgressByProjectId = (projectId: number) => (state: RootState) =>
    state.profile.sprints.find((el) => el.projectId === projectId && el.status === SprintStatus.IN_PROGRESS);
export const {
    setProfileProjects,
    setProfileTasks,
    setProfileSprints
} = profileSlice.actions