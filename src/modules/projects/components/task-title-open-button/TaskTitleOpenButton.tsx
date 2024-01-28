import {Button} from "primereact/button";
import {openDetailsTask, setTaskSprintId} from "../../../../store/tasks/tasks.slice";
import {TaskStatus} from "../../models/task/task-status/task-status";
import React, {useRef} from "react";
import {Task} from "../../models/task/task";
import {useDispatch, useSelector} from "react-redux";
import {ContextMenu} from "primereact/contextmenu";
import {selectUndoneSprints} from "../../../../store/sprints/sprints.slice";
import {MenuItem} from "primereact/menuitem";
import {useHttpClient} from "../../../../hooks/use-http-client/use-http-client";

interface TaskTitleOpenButtonProps {
    task: Task;
    withContextMenu: boolean;
}

export function TaskTitleOpenButton(props: TaskTitleOpenButtonProps) {
    const dispatch = useDispatch();
    const cm = useRef<ContextMenu>(null!);
    const sprints = useSelector(selectUndoneSprints);
    const http = useHttpClient();

    function getContextItems(): MenuItem[] {
        const menuItems: MenuItem[] = [];
        sprints.filter((e) => e.id !== props.task.sprintId).map((sprint): MenuItem => {
            return {
                label: sprint.name,
                command() {
                    addTaskToSprint(sprint.id);
                }
            }
        })
            .forEach((sprint) => {
                menuItems.push(sprint)
            })

        if (props.task.sprintId) {
            menuItems.push({
                label: "Backlog", command() {
                    addTaskToSprint(null)
                }
            })
        }
        return menuItems;
    }

    function addTaskToSprint(sprintId: number | null) {
        http.patch("tasks/" + props.task.id, {
            sprintId: sprintId,
        }).then(() => dispatch(setTaskSprintId({
            taskId: props.task.id,
            sprintId: sprintId
        })))
    }

    function renderContextMenu() {
        if (props.withContextMenu) {
            return <ContextMenu model={getContextItems()} ref={cm} breakpoint="767px"/>
        } else return null;
    }

    return (
        <>
            <Button
                onClick={() => dispatch(openDetailsTask(props.task))} text rounded
                className={props.task.status === TaskStatus.DONE ? "line-through" : ""}
                onContextMenu={(e) => cm.current?.show(e)}>
                {props.task.title}
            </Button>
            {renderContextMenu()}
        </>
    )
}