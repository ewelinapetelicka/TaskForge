import {configureStore} from "@reduxjs/toolkit";
import {userSlice} from "./user/user.slice";
import {projectsSlice} from "./projects/projects.slice";
import {tasksSlice} from "./tasks/tasks.slice";
import {sprintsSlice} from "./sprints/sprints.slice";
import {profileSlice} from "./profile/profile.slice";

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        projects: projectsSlice.reducer,
        tasks: tasksSlice.reducer,
        sprints: sprintsSlice.reducer,
        profile: profileSlice.reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch