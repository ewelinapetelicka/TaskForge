import {Option} from "../../../models/option/option";
import {TaskStatus} from "../models/task/task-status/task-status";

export const taskStatusOptions : Option<TaskStatus>[] = [
    {label: 'To do', value: TaskStatus.TO_DO},
    {label: 'In progress', value: TaskStatus.IN_PROGRESS},
    {label: 'Done', value: TaskStatus.DONE}
];