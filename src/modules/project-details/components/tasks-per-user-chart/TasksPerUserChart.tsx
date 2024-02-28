import {useState} from "react";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectProjectById} from "../../../../store/projects/projects.slice";
import {selectUsersByIds} from "../../../../store/user/user.slice";
import {selectTasks} from "../../../../store/tasks/tasks.slice";
import {Chart} from "primereact/chart";

export function TasksPerUserChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const params = useParams();
    const project = useSelector(selectProjectById(parseInt(params.id!)));
    const users = useSelector(selectUsersByIds(project.userIds)).map((el) => el.name);
    const tasks = useSelector(selectTasks);
    const [chartData] = useState({
        labels: users,
        datasets: [
            {
                label: 'Chart task per user',
                backgroundColor: documentStyle.getPropertyValue('--primary-color'),
                borderColor: documentStyle.getPropertyValue('--primary-color'),
                data: project.userIds.map((userId) => tasks.filter((el) => el.userIds?.includes(userId)).length)
            }
        ]
    });
    const [chartOptions] = useState({
        indexAxis: 'y',
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            legend: {
                display: false,
                labels: {
                    fontColor: documentStyle.getPropertyValue('--text-color'),
                    fontSize: documentStyle.getPropertyValue("200px")
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: documentStyle.getPropertyValue('--text-color-secondary'),
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
                    color: documentStyle.getPropertyValue('--text-color-secondary')
                },
                grid: {
                    color: documentStyle.getPropertyValue('--surface-border'),
                    drawBorder: false
                }
            }
        }
    });

    return (
        <div className="card">
            <h4>Users activity: </h4>
            <Chart type="bar" data={chartData} options={chartOptions} height={"260px"}/>
        </div>
    )
}