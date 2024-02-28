import {useSelector} from "react-redux";
import {selectInProgressSprint} from "../../../../store/sprints/sprints.slice";
import {selectTasksBySprintId} from "../../../../store/tasks/tasks.slice";
import {TaskType} from "../../models/task/task-type/task-type";
import {useState} from "react";
import {Chart} from "primereact/chart";

export function TasksTypesChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const sprintInProgress = useSelector(selectInProgressSprint);
    const tasksInCurrentSprint = useSelector(selectTasksBySprintId(sprintInProgress?.id));
    const [chartDataDoughnutStatus] = useState({
        labels: [TaskType.STORY, TaskType.BUG, TaskType.TECHNICAL_TASK],
        datasets: [
            {
                data: [
                    tasksInCurrentSprint.filter((task) => task.type === TaskType.BUG).length,
                    tasksInCurrentSprint.filter((task) => task.type === TaskType.TECHNICAL_TASK).length,
                    tasksInCurrentSprint.filter((task) => task.type === TaskType.STORY).length
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
            <h4>Tasks types chart: </h4>
            <Chart type="doughnut" data={chartDataDoughnutStatus} options={chartOptionsDoughnutStatus}
                   width={"360px"} height={"360px"}/>
        </div>
    )
}