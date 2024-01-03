import {TaskType} from "./task-type/task-type";
import {TaskStatus} from "./task-status/task-status";

export interface Task {
    id: number;
    projectId: number;
    type: TaskType;
    status: TaskStatus;
    title: string;
    description: string;
    priority: string;
    userIds: number[];
}