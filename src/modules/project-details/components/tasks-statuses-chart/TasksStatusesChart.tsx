import {useSelector} from "react-redux";
import {selectInProgressSprint} from "../../../../store/sprints/sprints.slice";
import {selectTasksBySprintId} from "../../../../store/tasks/tasks.slice";
import {TaskStatus} from "../../models/task/task-status/task-status";
import {useState} from "react";
import {Chart} from "primereact/chart";

export function TasksStatusesChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const sprintInProgress = useSelector(selectInProgressSprint);
    const tasksInCurrentSprint = useSelector(selectTasksBySprintId(sprintInProgress?.id));
    const [chartDataDoughnutStatus] = useState({
        labels: [TaskStatus.TO_DO, TaskStatus.IN_PROGRESS, TaskStatus.DONE],
        datasets: [
            {
                data: [
                    tasksInCurrentSprint.filter((task) => task.status === TaskStatus.TO_DO).length,
                    tasksInCurrentSprint.filter((task) => task.status === TaskStatus.IN_PROGRESS).length,
                    tasksInCurrentSprint.filter((task) => task.status === TaskStatus.DONE).length
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
            <h4>Tasks statuses chart: </h4>
            <Chart type="doughnut" data={chartDataDoughnutStatus} options={chartOptionsDoughnutStatus}
                   width={"360px"} height={"360px"}/>
        </div>
    )
}