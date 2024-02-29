import {TaskType} from "./task-type/task-type";
import {TaskStatus} from "./task-status/task-status";
import {TaskPriority} from "./task-priority/task-priority";

export interface Task {
    id: number;
    projectId: number;
    type: TaskType;
    status: TaskStatus;
    title: string;
    description: string;
    priority: TaskPriority;
    userIds: number[];
    sprintId: number | null;
    estimation: number | null;
}