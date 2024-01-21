import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Task} from "../../modules/projects/models/task/task";
import {RootState} from "../store";

interface TasksState {
    tasks: Task[];
    taskDetail: Task | null;
}

const initialState: TasksState = {
    tasks: [],
    taskDetail: null
}

export const tasksSlice = createSlice({
    name: 'tasksSlice',
    initialState,
    reducers: {
        setTasks: (state, action: PayloadAction<Task[]>) => {
            state.tasks = action.payload;
        },
        removeTaskById: (state, action: PayloadAction<number>) => {
            state.tasks = state.tasks.filter((el) => el.id !== action.payload)
        },
        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload);
        },
        editTask: (state, action: PayloadAction<Task>) => {
            state.tasks = state.tasks.map((el) => {
                if (el.id === action.payload.id) {
                    return action.payload;
                }
                return el;
            });
        },
        openDetailsTask: (state, action: PayloadAction<Task>) => {
            state.taskDetail = action.payload;
        },
        closeDetailsTask: (state) => {
            state.taskDetail = null;
        }
    }
});

export const selectTasks = (state: RootState) => state.tasks.tasks;
export const selectTaskDetail = (state: RootState) => state.tasks.taskDetail as Task;
export const selectIsTaskDetailOpen = (state: RootState) => state.tasks.taskDetail !== null;
export const {setTasks, openDetailsTask, closeDetailsTask, removeTaskById, addTask, editTask} = tasksSlice.actions;