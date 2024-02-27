import {Chart} from "primereact/chart";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {TaskStatus} from "../../models/task/task-status/task-status";
import {selectProjectById} from "../../../../store/projects/projects.slice";
import {selectTasks, selectTasksBySprintId} from "../../../../store/tasks/tasks.slice";
import {selectUsersByIds} from "../../../../store/user/user.slice";
import {selectInProgressSprint} from "../../../../store/sprints/sprints.slice";

export function ProjectDashboardPage() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const params = useParams();
    const project = useSelector(selectProjectById(parseInt(params.id!)));
    const users = useSelector(selectUsersByIds(project.userIds)).map((el) => el.name);
    const tasks = useSelector(selectTasks);
    const tasksPerUser = project.userIds.map((userId) => {
        return (
            tasks.filter((el) => el.userIds?.includes(userId)).length
        )
    });

    const sprintInProgress = useSelector(selectInProgressSprint);
    const tasksInCurrentSprint = useSelector(selectTasksBySprintId(sprintInProgress?.id))
    const amountOfTasksInStatusToDoInCurrentSprint = tasksInCurrentSprint.filter((task) => task.status === TaskStatus.TO_DO).length;
    const amountOfTasksInStatusInProgressInCurrentSprint = tasksInCurrentSprint.filter((task) => task.status === TaskStatus.IN_PROGRESS).length;
    const amountOfTasksInStatusDoneInCurrentSprint = tasksInCurrentSprint.filter((task) => task.status === TaskStatus.DONE).length;


    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textSize = documentStyle.getPropertyValue("200px");
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        const data = {
            labels: users,
            datasets: [
                {
                    label: 'Chart task per user',
                    backgroundColor: documentStyle.getPropertyValue('--primary-color'),
                    borderColor: documentStyle.getPropertyValue('--primary-color'),
                    data: tasksPerUser
                }
            ]
        };

        const options = {
            indexAxis: 'y',
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor,
                        fontSize: textSize
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };

        setChartData(data)
        setChartOptions(options);
    }, []);

    const [chartDataDoughnutStatus, setChartDataDoughnutStatus] = useState({});
    const [chartOptionsDoughnutStatus, setChartOptionsDoughnutStatus] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels: [TaskStatus.TO_DO, TaskStatus.IN_PROGRESS, TaskStatus.DONE],
            datasets: [
                {
                    data: [amountOfTasksInStatusToDoInCurrentSprint, amountOfTasksInStatusInProgressInCurrentSprint, amountOfTasksInStatusDoneInCurrentSprint],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--blue-500'),
                        documentStyle.getPropertyValue('--yellow-500'),
                        documentStyle.getPropertyValue('--green-500')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--blue-400'),
                        documentStyle.getPropertyValue('--yellow-400'),
                        documentStyle.getPropertyValue('--green-400')
                    ]
                }
            ]
        };
        const options = {
            cutout: '60%'
        };

        setChartDataDoughnutStatus(data);
        setChartOptionsDoughnutStatus(options);
    }, []);

    return (
        <div>
            <div>test project dashboard</div>
            <div className="card">
                <Chart type="bar" data={chartData} options={chartOptions}/>
            </div>
            <div className="card flex justify-content-center">
                <Chart type="doughnut" data={chartDataDoughnutStatus} options={chartOptionsDoughnutStatus}
                       className="w-full md:w-30rem"/>
            </div>
        </div>
    )
}