import {useDispatch, useSelector} from "react-redux";
import {selectTasks, setTasks} from "../../store/tasks/tasks.slice";
import {useHttpClient} from "../../hooks/use-http-client/use-http-client";
import {useParams} from "react-router-dom";
import {Task} from "../../models/task/task";
import React, {useEffect, useState} from "react";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {InputText} from "primereact/inputtext";
import {FilterMatchMode} from "primereact/api";

export function ProjectTaskBrowserPage() {
    const tasks = useSelector(selectTasks);
    const http = useHttpClient();
    const params = useParams();
    const dispatch = useDispatch();
    const [filters, setFilters] = useState({
        global: { value: "", matchMode: FilterMatchMode.CONTAINS }
    });

    const onGlobalFilterChange = (value:string) => {
        setFilters({
            global: { value: value, matchMode: FilterMatchMode.CONTAINS }
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
        <div className="pt-5">
            <span className="p-input-icon-left">
                <i className="pi pi-search"/>
                <InputText value={filters.global.value} onChange={(e) => onGlobalFilterChange(e.target.value)} placeholder="Keyword Search"/>
            </span>
            <DataTable value={tasks} paginator rows={10} filters={filters}>
                <Column field="type" header="Type" sortable/>
                <Column field="title" header="Title" sortable/>
                <Column field="priority" header="Priority" sortable/>
                <Column field="status" header="Status" sortable/>
            </DataTable>
        </div>
    )
}