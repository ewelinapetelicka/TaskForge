import {TaskPriority} from "../../models/task/task-priority/task-priority";
import React from "react";

export interface TaskPriorityIndicatorProps {
    taskPriority: TaskPriority;
}

export function TaskPriorityIndicator(props: TaskPriorityIndicatorProps) {
    if (props.taskPriority === TaskPriority.LOW) {
        return (
            <span className={"relative"}>
                <i className="pi pi-bookmark-fill text-primary-400 text-4xl -rotate-90 "></i>
                <span className="text-xl text-gray-900 absolute z-5 font-bold"
                      style={{left: "25%", top: "-45%"}}>L</span>
            </span>
        )
    }
    if (props.taskPriority === TaskPriority.MEDIUM) {
        return (
            <span className={"relative"}>
                <i className="pi pi-bookmark-fill text-orange-200 text-4xl -rotate-90 "></i>
                <span className="text-xl text-gray-900 absolute z-5 font-bold"
                      style={{left: "15%", top: "-45%"}}>M</span>
            </span>
        )
    }
    if (props.taskPriority === TaskPriority.HIGH) {
        return (
            <span className={"relative"}>
                <i className="pi pi-bookmark-fill text-pink-200 text-4xl -rotate-90 "></i>
                <span className="text-xl text-gray-900 absolute z-5 font-bold"
                      style={{left: "20%", top: "-45%"}}>H</span>
            </span>
        );
    }
    return null;
}