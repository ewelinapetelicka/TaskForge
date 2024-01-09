import {TaskType} from "../../../models/task/task-type/task-type";
import React from "react";
import {Badge} from "primereact/badge";

export interface TaskTypeIndicatorProps {
    taskType: TaskType;
}

export function TaskTypeIndicator(props: TaskTypeIndicatorProps) {
    if (props.taskType === TaskType.STORY) {
        return <Badge value="STORY"  className={"bg-primary-400 "} style={{width:"70px"}} ></Badge>;
    }
    if (props.taskType === TaskType.BUG) {
        return <Badge value="BUG"  className={" bg-pink-200"} style={{width:"70px"}}></Badge>;
    }
    if (props.taskType === TaskType.TECHNICAL_TASK) {
        return <Badge value="TECH"  className={"bg-indigo-300"} style={{width:"70px"}}></Badge>;
    }
    return null;
}