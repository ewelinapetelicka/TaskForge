import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {useDispatch, useSelector} from "react-redux";
import {selectTasksBySprintId} from "../../../../store/tasks/tasks.slice";
import {Task} from "../../models/task/task";
import {TaskStatusIndicator} from "../task-status-indicator/TaskStatusIndicator";
import {TaskPriorityIndicator} from "../task-priority-indicator/TaskPriorityIndicator";
import {TaskTypeIndicator} from "../task-type-indicator/TaskTypeIndicator";
import {openDetailsSprint, selectSprintById} from "../../../../store/sprints/sprints.slice";
import {TaskTitleOpenButton} from "../task-title-open-button/TaskTitleOpenButton";
import {TaskCounting} from "../task-counter/TaskCounter";
import {SprintStatusIndicator} from "../sprint-status-indicator/SprintStatusIndicator";
import {useState} from "react";
import {Button} from "primereact/button";

interface SprintListProps {
    sprintId: number;
}

export function SprintList(props: SprintListProps) {
    const [isHover, setIsHover] = useState(false);
    const tasks = useSelector(selectTasksBySprintId(props.sprintId));
    const sprint = useSelector(selectSprintById(props.sprintId));
    const dispatch = useDispatch();

    return (
        <div className="card">
            <div className={"flex flex-row justify-content-between align-items-center w-12 pr-3"}>
                <div className={"flex align-items-center gap-2 pt-3 pb-3 w-10 h-5rem"}>
                    <SprintStatusIndicator sprintStatus={sprint.status} key={sprint.id}/>
                    <div
                        className={"pt-2 pb-2 hover:bg-gray-800 p-1 border-round w-10 flex align-items-center gap-2"}
                        onMouseEnter={() => setIsHover(true)}
                        onMouseLeave={() => setIsHover(false)}>
                        {sprint.name}
                        {isHover && <Button icon="pi pi-pencil" rounded text severity="secondary" aria-label="Favorite"
                                            size="large" onClick={() => dispatch(openDetailsSprint(sprint))}/>}
                    </div>
                </div>
                <TaskCounting tasks={tasks}/>
            </div>
            <DataTable value={tasks} tableStyle={{minWidth: '50rem'}} showHeaders={false} size={"small"}>
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