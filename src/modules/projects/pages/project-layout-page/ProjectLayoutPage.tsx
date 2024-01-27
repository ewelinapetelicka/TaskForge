import {Outlet, useLocation, useNavigate, useParams} from "react-router-dom";
import React, {useEffect} from "react";
import {ListBox} from "primereact/listbox";
import {TaskDetailsModal} from "../../modals/task-details-modal/TaskDetailsModal";
import {useDispatch, useSelector} from "react-redux";
import {selectIsTaskDetailOpen, selectLoadedTasks, setTasks} from "../../../../store/tasks/tasks.slice";
import {Task} from "../../models/task/task";
import {useHttpClient} from "../../../../hooks/use-http-client/use-http-client";
import {Sprint} from "../../models/sprint/sprint";
import {selectLoadedSprints, setSprints} from "../../../../store/sprints/sprints.slice";

export function ProjectLayoutPage() {
    const [selectedIndex, setSelectedIndex] = React.useState(-1);
    const visible = useSelector(selectIsTaskDetailOpen);
    const navigate = useNavigate();
    const location = useLocation();
    const menuOptions = [
        {name: 'Backlog', path: 'backlog', index: 0},
        {name: 'Task browser', path: 'browser', index: 1},
        {name: 'Settings', path: 'settings', index: 2}
    ];
    const http = useHttpClient();
    const params = useParams();
    const loadedTask = useSelector(selectLoadedTasks);
    const loadedSprints = useSelector(selectLoadedSprints);
    const dispatch = useDispatch();

    useEffect(() => {
        const index = menuOptions.find(option => location.pathname.includes(option.path))!.index;
        setSelectedIndex(index);
    }, []);

    useEffect(() => {
        if (selectedIndex !== -1 && selectedIndex !== null) {
            navigate(menuOptions[selectedIndex].path);
        }
    }, [selectedIndex]);

    useEffect(() => {
        getTasks();
        getSprints();
    }, []);

    function getTasks() {
        http.get("project/" + params.id + "/tasks")
            .then((tasks: Task[]) => dispatch(setTasks(tasks)))
    }

    function getSprints() {
        http.get("project/" + params.id + "/sprints")
            .then((sprints: Sprint[]) => dispatch(setSprints(sprints)))
    }

    if (!loadedTask || !loadedSprints) {
        return null;
    }

    return (
        <div className="w-full h-full flex">
            <div className={"w-3 h-full "}>
                <ListBox value={selectedIndex}
                         onChange={(e) => setSelectedIndex(e.value)}
                         options={menuOptions}
                         optionLabel="name"
                         optionValue="index"
                         className="w-full h-full"/>
            </div>
            <div className={"w-9 h-full justify-content-center ml-4 mr-4"}>
                <Outlet></Outlet>
            </div>
            {visible && <TaskDetailsModal></TaskDetailsModal>}
        </div>
    )
}