import {Option} from "../../../models/option/option";
import {TaskPriority} from "../models/task/task-priority/task-priority";

export const taskPriorityOptions: Option<TaskPriority>[] = [
    {label: 'Low', value: TaskPriority.LOW},
    {label: 'Medium', value: TaskPriority.MEDIUM},
    {label: 'High', value: TaskPriority.HIGH}
];