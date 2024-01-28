import {Task} from "../../models/task/task";
import {useEffect, useState} from "react";

export interface TaskCounterProps {
    tasks: Task[];
}

export function TaskCounting(props: TaskCounterProps) {
    const [text, setText] = useState('');

    useEffect(() => {
        if (props.tasks.length === 0) {
            setText("No tasks in this sprint");
        }
        if (props.tasks.length === 1) {
            setText("1 task in this sprint");
        }
        if (props.tasks.length > 1) {
            setText(props.tasks.length + " tasks in this sprint")
        }
    }, [props.tasks]);


    return <span className={"text-gray-400"}>{text}</span>
}