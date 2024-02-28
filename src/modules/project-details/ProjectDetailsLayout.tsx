import {Outlet, useLocation, useNavigate, useParams} from "react-router-dom";
import React, {useEffect} from "react";
import {TaskDetailsDialog} from "./dialogs/task-details-dialog/TaskDetailsDialog";
import {useDispatch, useSelector} from "react-redux";
import {Task} from "./models/task/task";
import {Sprint} from "./models/sprint/sprint";
import {Menu} from "primereact/menu";
import {selectIsTaskDetailOpen, selectLoadedTasks, setTasks} from "../../store/tasks/tasks.slice";
import {useHttpClient} from "../../hooks/use-http-client/use-http-client";
import {selectLoadedSprints, setSprints} from "../../store/sprints/sprints.slice";
import {selectProjectById} from "../../store/projects/projects.slice";

export function ProjectDetailsLayout() {
    const [selectedIndex, setSelectedIndex] = React.useState(-1);
    const visible = useSelector(selectIsTaskDetailOpen);
    const navigate = useNavigate();
    const location = useLocation();
    const http = useHttpClient();
    const params = useParams();
    const loadedTask = useSelector(selectLoadedTasks);
    const loadedSprints = useSelector(selectLoadedSprints);
    const dispatch = useDispatch();
    const project = useSelector(selectProjectById(parseInt(params.id!)));
    const itemRenderer = (item: any) => (
        <div className='p-menuitem-content' onClick={() => setSelectedIndex(item.index)}>
            <a className={"flex align-items-center p-menuitem-link " + (item.index === selectedIndex ? "bg-gray-600" : "")}>
                {item.label}
            </a>
        </div>
    );
    const items = [
        {
            template: () => {
                return (
                    <p className="font-medium text-xl font-semibold pl-3 cursor-pointer select-none"
                       onClick={() => navigate("/projects/" + params.id + "/project-dashboard")}>
                        {project.title}
                    </p>
                );
            }
        },
        {
            items: [
                {
                    label: 'Backlog',
                    path: 'backlog',
                    index: 0,
                    template: itemRenderer
                },
                {
                    label: "Kanban",
                    path: "kanban",
                    index: 1,
                    template: itemRenderer
                },
                {
                    label: 'Task browser',
                    path: 'browser',
                    index: 2,
                    template: itemRenderer,
                },
                {
                    label: 'Settings',
                    path: 'settings',
                    index: 3,
                    template: itemRenderer
                }
            ]
        }
    ];

    useEffect(() => {
        const item = items[1].items!.find(option => location.pathname.includes(option.path));
        if (item) {
            setSelectedIndex(item.index);
        } else {
            setSelectedIndex(-1);
        }
    }, []);

    useEffect(() => {
        if (selectedIndex !== -1 && selectedIndex !== null) {
            navigate(items[1].items![selectedIndex].path);
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
                <Menu model={items} className="w-full h-full select-none"/>
            </div>
            <div className={"w-9 h-full justify-content-center ml-4 pr-2 overflow-y-auto"}>
                <Outlet></Outlet>
            </div>
            {visible && <TaskDetailsDialog></TaskDetailsDialog>}
        </div>
    )
}