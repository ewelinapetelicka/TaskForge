import {TaskStatus} from "../../models/task/task-status/task-status";
import {Badge} from "primereact/badge";

export interface TaskStatusIndicatorProps {
    taskStatus: TaskStatus;
}

export function TaskStatusIndicator(props: TaskStatusIndicatorProps) {
    if (props.taskStatus === TaskStatus.TO_DO) {
        return <Badge value="TO DO" className={"bg-indigo-300"} style={{width: "100px"}}></Badge>;
    }
    if (props.taskStatus === TaskStatus.IN_PROGRESS) {
        return <Badge value="IN PROGRESS" className={" bg-orange-200"} style={{width: "100px"}}></Badge>;
    }
    if (props.taskStatus === TaskStatus.DONE) {
        return <Badge value="DONE" className={"bg-primary-400"} style={{width: "100px"}}></Badge>;
    }
    return null;
}