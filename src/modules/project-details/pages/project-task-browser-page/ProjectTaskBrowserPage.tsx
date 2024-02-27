import {Task} from "../../models/task/task";
import React, {useState} from "react";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {InputText} from "primereact/inputtext";
import {FilterMatchMode} from "primereact/api";
import {TaskTypeIndicator} from "../../components/task-type-indicator/TaskTypeIndicator";
import {Card} from "primereact/card";
import {TaskPriorityIndicator} from "../../components/task-priority-indicator/TaskPriorityIndicator";
import {TaskStatusIndicator} from "../../components/task-status-indicator/TaskStatusIndicator";
import {TaskStatus} from "../../models/task/task-status/task-status";
import {Button} from "primereact/button";
import {TaskPriority} from "../../models/task/task-priority/task-priority";
import {TaskType} from "../../models/task/task-type/task-type";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {TaskTitleOpenButton} from "../../components/task-title-open-button/TaskTitleOpenButton";
import {openDetailsTask, selectTasks} from "../../../../store/tasks/tasks.slice";

export function ProjectTaskBrowserPage() {
    const [filters, setFilters] = useState({
        global: {value: "", matchMode: FilterMatchMode.CONTAINS}
    });
    const params = useParams();
    const tasks = useSelector(selectTasks);
    const dispatch = useDispatch();
    const onGlobalFilterChange = (value: string) => {
        setFilters({
            global: {value: value, matchMode: FilterMatchMode.CONTAINS}
        });
    };

    function openTaskModal() {
        dispatch(openDetailsTask({
            id: null as any,
            title: '',
            description: "Add task description...",
            projectId: parseInt(params.id!),
            status: TaskStatus.TO_DO,
            priority: TaskPriority.LOW,
            type: TaskType.STORY,
            userIds: [],
            sprintId: null,
        }))
    }

    return (
        <div className="h-full flex justify-content-center align-items-center">
            <Card className=" flex flex-column gap-6 w-full">
                <div className={" flex w-full justify-content-between pb-2"}>
                    <Button label={"ADD NEW"} outlined onClick={() => openTaskModal()}></Button>
                    <div className="p-input-icon-left">
                        <i className="pi pi-search"/>
                        <InputText value={filters.global.value} onChange={(e) => onGlobalFilterChange(e.target.value)}
                                   placeholder="Search..."/>
                    </div>
                </div>
                <DataTable value={tasks} paginator rows={8} filters={filters} paginatorClassName={"border-none"}
                           size={"small"}>
                    <Column field="type" header="Type" align={"center"}
                            body={(data: Task) => <TaskTypeIndicator taskType={data.type}/>}
                            sortable/>
                    <Column field="title" header="Title" sortable
                            body={(data: Task) => <TaskTitleOpenButton task={data} withContextMenu={false}/>}/>
                    <Column field="priority" header="Priority" align={"center"} className={"p-0"}
                            body={(data: Task) => <TaskPriorityIndicator taskPriority={data.priority}/>}
                            sortable/>
                    <Column field="status" header="Status" align={"center"} sortable
                            body={(data: Task) => <TaskStatusIndicator taskStatus={data.status}/>}/>
                </DataTable>
            </Card>
        </div>
    )
}