import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {useSelector} from "react-redux";
import {selectTasksBySprintId} from "../../../../store/tasks/tasks.slice";
import {Task} from "../../models/task/task";
import {TaskStatusIndicator} from "../task-status-indicator/TaskStatusIndicator";
import {TaskPriorityIndicator} from "../task-priority-indicator/TaskPriorityIndicator";
import {TaskTypeIndicator} from "../task-type-indicator/TaskTypeIndicator";

interface SprintListProps {
    sprintId: number | null;
}

export function SprintList(props: SprintListProps) {
    const tasks = useSelector(selectTasksBySprintId(props.sprintId));

    return (
        <div className="card">
            <DataTable value={tasks} tableStyle={{minWidth: '50rem'}}>
                <Column field="Priority" header="Priority" className={"w-1"}
                        body={(data: Task) => <TaskPriorityIndicator taskPriority={(data.priority)}/>}
                ></Column>
                <Column field="Title" header="Title"
                        body={(data: Task) => data.title}
                ></Column>
                <Column field="Status" header="Status"
                        body={(data: Task) => <TaskStatusIndicator taskStatus={data.status}/>}
                ></Column>
                <Column field="quantity" header="Quantity"
                        body={(data: Task) => <TaskTypeIndicator taskType={(data.type)}/>}
                ></Column>
            </DataTable>
        </div>
    );
}