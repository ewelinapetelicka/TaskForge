import {Task} from "../../models/task/task";
import {useEffect, useState} from "react";

export interface TaskCounterProps {
    tasks: Task[];
}

export function TaskCounting(props: TaskCounterProps) {
    const [text, setText] = useState('');
    const estimations = props.tasks.map((el) => el.estimation || 0);
    const estimationsSum = estimations.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

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


    return (
        <span className={"text-gray-400"}>{text} | estimate: {estimationsSum}</span>
    )
}