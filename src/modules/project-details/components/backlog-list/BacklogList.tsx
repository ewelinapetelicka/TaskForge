import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {useSelector} from "react-redux";
import {Task} from "../../models/task/task";
import {TaskStatusIndicator} from "../task-status-indicator/TaskStatusIndicator";
import {TaskPriorityIndicator} from "../task-priority-indicator/TaskPriorityIndicator";
import {TaskTypeIndicator} from "../task-type-indicator/TaskTypeIndicator";
import {TaskTitleOpenButton} from "../task-title-open-button/TaskTitleOpenButton";
import {TaskCounting} from "../task-counter/TaskCounter";
import {selectTasksWithoutSprintIdAndUndone} from "../../../../store/tasks/tasks.slice";

export function BacklogList() {
    const tasks = useSelector(selectTasksWithoutSprintIdAndUndone);

    return (
        <div className="card">
            <div className={"flex flex-row justify-content-between align-items-center w-12 pr-3"}>
                <h4>Backlog</h4>
                <TaskCounting tasks={tasks}/>
            </div>
            <DataTable value={tasks} tableStyle={{minWidth: '50rem'}} showHeaders={false}
                       size={"small"}>
                <Column field="Priority" header="Priority" className={"w-1"}
                        body={(data: Task) => <TaskPriorityIndicator taskPriority={(data.priority)}/>}
                ></Column>
                <Column field="Title" header="Title"
                        body={(data: Task) => <TaskTitleOpenButton task={data} withContextMenu={true}/>}
                ></Column>
                <Column field="Status" header="Status" className={"w-2"}
                        body={(data: Task) => <TaskStatusIndicator taskStatus={data.status}/>}
                ></Column>
                <Column field="quantity" header="Quantity" className={"w-2"}
                        body={(data: Task) => <TaskTypeIndicator taskType={(data.type)}/>}
                ></Column>
            </DataTable>
        </div>
    );
}