import {Option} from "../../../models/option/option";
import {TaskType} from "../models/task/task-type/task-type";

export const taskTypeOptions: Option<TaskType>[] = [
    {label: 'Bug', value: TaskType.BUG},
    {label: 'Story', value: TaskType.STORY},
    {label: 'Technical-task', value: TaskType.TECHNICAL_TASK}
];

