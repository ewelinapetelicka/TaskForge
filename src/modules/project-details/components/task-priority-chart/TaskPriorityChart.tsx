import {Chart} from "primereact/chart";
import {useState} from "react";
import {useSelector} from "react-redux";
import {selectInProgressSprint} from "../../../../store/sprints/sprints.slice";
import {selectTasksBySprintId} from "../../../../store/tasks/tasks.slice";
import {TaskPriority, taskPriorityLabel} from "../../models/task/task-priority/task-priority";

export function TaskPriorityChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const sprintInProgress = useSelector(selectInProgressSprint);
    const tasksInCurrentSprint = useSelector(selectTasksBySprintId(sprintInProgress?.id));
    const [chartDataDoughnutStatus] = useState({
        labels: [
            taskPriorityLabel[TaskPriority.LOW],
            taskPriorityLabel[TaskPriority.MEDIUM],
            taskPriorityLabel[TaskPriority.HIGH]
        ],
        datasets: [
            {
                data: [
                    tasksInCurrentSprint.filter((task) => task.priority === TaskPriority.LOW).length,
                    tasksInCurrentSprint.filter((task) => task.priority === TaskPriority.MEDIUM).length,
                    tasksInCurrentSprint.filter((task) => task.priority === TaskPriority.HIGH).length
                ],
                backgroundColor: [
                    documentStyle.getPropertyValue('--primary-400'),
                    documentStyle.getPropertyValue('--pink-200'),
                    documentStyle.getPropertyValue('--indigo-300')
                ]
            }
        ]
    });
    const [chartOptionsDoughnutStatus] = useState({cutout: '60%'});

    return (
        <div>
            <h4>Tasks priorities chart: </h4>
            <Chart type="doughnut" data={chartDataDoughnutStatus} options={chartOptionsDoughnutStatus}
                   width={"360px"} height={"360px"}/>
        </div>
    )
}