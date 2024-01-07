import {TaskType} from "../../../models/task/task-type/task-type";
import React from "react";

export function ColorTypeTask(task: string) {
    if (task === TaskType.STORY) {
        return <i className="pi-circle-fill" style={{color: 'green'}}></i>;
    }
    if (task === TaskType.BUG) {
        return <i className="pi-circle-fill" style={{color: 'red'}}></i>;
    }
    if (task === TaskType.TECHNICAL_TASK) {
        return <i className="pi-circle-fill" style={{color: 'blue'}}></i>;
    }
}