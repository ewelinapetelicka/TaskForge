import {Button} from "primereact/button";
import {openDetailsTask} from "../../../../store/tasks/tasks.slice";
import {TaskStatus} from "../../models/task/task-status/task-status";
import React, {useRef} from "react";
import {Task} from "../../models/task/task";
import {useDispatch, useSelector} from "react-redux";
import {ContextMenu} from "primereact/contextmenu";
import {selectUndoneSprints} from "../../../../store/sprints/sprints.slice";
import {MenuItem} from "primereact/menuitem";

interface TaskTitleOpenButtonProps {
    task: Task;
    withContextMenu: boolean;
}

export function TaskTitleOpenButton(props: TaskTitleOpenButtonProps) {
    const dispatch = useDispatch();
    const cm = useRef<ContextMenu>(null!);
    const sprints = useSelector(selectUndoneSprints);

    function getContextItems(): MenuItem[] {
        const menuItems: MenuItem[] = [];
        sprints.filter((e) => e.id !== props.task.sprintId).map((sprint): MenuItem => {
            return {
                label: sprint.name
            }
        })
            .forEach((sprint) => {
                menuItems.push(sprint)
            })

        if (props.task.sprintId) {
            menuItems.push({label: "Backlog"})
        }
        return menuItems;
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