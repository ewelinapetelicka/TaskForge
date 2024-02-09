import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Task} from "../../modules/projects/models/task/task";
import {RootState} from "../store";
import {TaskStatus} from "../../modules/projects/models/task/task-status/task-status";

interface TasksState {
    tasks: Task[];
    tasksLoaded: boolean;
    taskDetail: Task | null;
}

const initialState: TasksState = {
    tasks: [],
    tasksLoaded: false,
    taskDetail: null
}

export const tasksSlice = createSlice({
    name: 'tasksSlice',
    initialState,
    reducers: {
        setTasks: (state, action: PayloadAction<Task[]>) => {
            state.tasks = action.payload;
            state.tasksLoaded = true;
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
        setTaskSprintId: (state, action: PayloadAction<{ taskId: number, sprintId: number | null }>) => {
            state.tasks = state.tasks.map((el) => {
                if (action.payload.taskId === el.id) {
                    el.sprintId = action.payload.sprintId;
                }
                return el;
            })
        },
        setTaskStatus: (state, action: PayloadAction<{ status: TaskStatus, taskId: number }>) => {
            state.tasks = state.tasks.map((el) => {
                if (action.payload.taskId === el.id) {
                    el.status = action.payload.status
                }
                return el;
            })
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
export const selectTasksBySprintId = (sprintId: number) => (state: RootState) => state.tasks.tasks.filter((el) => el.sprintId === sprintId)
export const selectTasksWithoutSprintIdAndUndone = (state: RootState) => state.tasks.tasks.filter((el) => el.sprintId === null && el.status !== TaskStatus.DONE)
export const selectTaskDetail = (state: RootState) => state.tasks.taskDetail as Task;
export const selectIsTaskDetailOpen = (state: RootState) => state.tasks.taskDetail !== null;
export const selectLoadedTasks = (state: RootState) => state.tasks.tasksLoaded;

export const {
    setTasks,
    openDetailsTask,
    closeDetailsTask,
    removeTaskById,
    addTask,
    editTask,
    setTaskSprintId,
    setTaskStatus
} = tasksSlice.actions;