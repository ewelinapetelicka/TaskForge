import {useDispatch, useSelector} from "react-redux";
import {selectTasks, setTasks} from "../../../../store/tasks/tasks.slice";
import {useHttpClient} from "../../../../hooks/use-http-client/use-http-client";
import {useParams} from "react-router-dom";
import {Task} from "../../models/task/task";
import React, {useEffect, useState} from "react";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {InputText} from "primereact/inputtext";
import {FilterMatchMode} from "primereact/api";
import {TaskTypeIndicator} from "../../components/task-type-indicator/TaskTypeIndicator";
import {Card} from "primereact/card";
import {TaskPriorityIndicator} from "../../components/task-priority-indicator/TaskPriorityIndicator";
import {TaskStatusIndicator} from "../../components/task-status-indicator/TaskStatusIndicator";
import {TaskStatus} from "../../models/task/task-status/task-status";

export function ProjectTaskBrowserPage() {
    const tasks = useSelector(selectTasks);
    const http = useHttpClient();
    const params = useParams();
    const dispatch = useDispatch();
    const [filters, setFilters] = useState({
        global: {value: "", matchMode: FilterMatchMode.CONTAINS}
    });

    const onGlobalFilterChange = (value: string) => {
        setFilters({
            global: {value: value, matchMode: FilterMatchMode.CONTAINS}
        });
    };

    useEffect(() => {
        getTasks();
    }, []);

    function getTasks() {
        http.get("project/" + params.id + "/tasks")
            .then((tasks: Task[]) => dispatch(setTasks(tasks)))
    }

    return (
        <div className="h-full flex justify-content-center align-items-start pt-4">
            <Card className=" flex flex-column gap-4 w-full">
                <div className={" flex w-full justify-content-end pb-2"}>
                    <div className="p-input-icon-left">
                        <i className="pi pi-search"/>
                        <InputText value={filters.global.value} onChange={(e) => onGlobalFilterChange(e.target.value)}
                                   placeholder="Search..."/>
                    </div>
                </div>
                <DataTable value={tasks} paginator rows={9} filters={filters} paginatorClassName={"border-none"}>
                    <Column field="type" header="Type" align={"center"}
                            body={(data: Task) => <TaskTypeIndicator taskType={data.type}/>}
                            sortable/>
                    <Column field="title" header="Title" sortable body={(data: Task) => {
                        return <span
                            className={data.status === TaskStatus.DONE ? "line-through" : ""}>{data.title}</span>
                    }}/>
                    <Column field="priority" header="Priority" align={"center"} className={"p-0"}
                            body={(data: Task) => <TaskPriorityIndicator taskPriority={data.priority}/>} sortable/>
                    <Column field="status" header="Status" align={"center"} sortable
                            body={(data: Task) => <TaskStatusIndicator taskStatus={data.status}/>}/>
                </DataTable>
            </Card>
        </div>
    )
}