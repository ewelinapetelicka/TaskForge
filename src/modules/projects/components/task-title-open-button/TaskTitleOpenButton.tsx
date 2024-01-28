import {Button} from "primereact/button";
import {openDetailsTask} from "../../../../store/tasks/tasks.slice";
import {TaskStatus} from "../../models/task/task-status/task-status";
import React from "react";
import {Task} from "../../models/task/task";
import {useDispatch} from "react-redux";

interface TaskTitleOpenButtonProps {
    task: Task
}

export function TaskTitleOpenButton(props: TaskTitleOpenButtonProps) {
    const dispatch = useDispatch();

    return (
        <Button
            onClick={() => dispatch(openDetailsTask(props.task))} text rounded
            className={props.task.status === TaskStatus.DONE ? "line-through" : ""}>
            {props.task.title}
        </Button>
    )
}