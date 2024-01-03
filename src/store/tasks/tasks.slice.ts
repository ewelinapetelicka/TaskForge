import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Task} from "../../models/task/task";
import {RootState} from "../store";

interface TasksState {
    tasks: Task[]
}

const initialState: TasksState = {
    tasks: []
}

export const tasksSlice = createSlice({
    name: 'tasksSlice',
    initialState,
    reducers: {
        setTasks: (state, action: PayloadAction<Task[]>) => {
            state.tasks = action.payload;
        }
    }
});

export const selectTasks = (state: RootState) => state.tasks.tasks
export const {setTasks} = tasksSlice.actions;