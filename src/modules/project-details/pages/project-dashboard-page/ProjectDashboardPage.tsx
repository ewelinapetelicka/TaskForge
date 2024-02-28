import {TasksPerUserChart} from "../../components/tasks-per-user-chart/TasksPerUserChart";
import {TasksStatusesChart} from "../../components/tasks-statuses-chart/TasksStatusesChart";
import {TasksTypesChart} from "../../components/tasks-types-chart/TasksTypesChart";
import {TaskPriorityChart} from "../../components/task-priority-chart/TaskPriorityChart";
import {useSelector} from "react-redux";
import {selectInProgressSprint} from "../../../../store/sprints/sprints.slice";

export function ProjectDashboardPage() {
    const sprintInProgress = useSelector(selectInProgressSprint);

    return (
        <div>
            <h3>Statistics for sprint: "{sprintInProgress?.name}"</h3>
            <TasksPerUserChart/>
            <div className="card flex  justify-content-between">
                <TasksStatusesChart/>
                <TasksTypesChart/>
                <TaskPriorityChart/>
            </div>
        </div>
    )
}