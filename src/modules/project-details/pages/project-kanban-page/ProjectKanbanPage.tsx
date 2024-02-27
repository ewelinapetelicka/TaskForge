import {useDispatch, useSelector} from "react-redux";
import {openDetailsTask, selectTasks, setTaskStatus} from "../../../../store/tasks/tasks.slice";
import {ControlledBoard, KanbanBoard} from '@caldwell619/react-kanban'
import '@caldwell619/react-kanban/dist/styles.css';
import "./ProjectKanbanPage.css";
import {Task} from "../../models/task/task";
import {TaskStatus} from "../../models/task/task-status/task-status";
import {useHttpClient} from "../../../../hooks/use-http-client/use-http-client";
import {AvatarGroup} from "primereact/avatargroup";
import {Avatar} from "primereact/avatar";
import {selectUsersByIds} from "../../../../store/user/user.slice";
import {TaskPriorityIndicator} from "../../components/task-priority-indicator/TaskPriorityIndicator";
import {TaskTypeIndicator} from "../../components/task-type-indicator/TaskTypeIndicator";
import {Button} from "primereact/button";
import {useEffect, useState} from "react";

interface UsersAssignedToTaskProps {
    task: Task
}

function UsersAssignedToTask(props: UsersAssignedToTaskProps) {
    const users = useSelector(selectUsersByIds(props.task.userIds));
    return (
        <AvatarGroup>
            {users.map((u, index) => <Avatar image={u.avatar} key={index} shape="circle" size="large"/>)}
        </AvatarGroup>
    )
}

export function ProjectKanbanPage() {
    const tasks = useSelector(selectTasks);
    const http = useHttpClient();
    const dispatch = useDispatch();
    const [board, setBoard] = useState<KanbanBoard<Task>>({columns: []});

    useEffect(() => {
        setBoard({
            columns: [
                {
                    id: 1,
                    title: 'To do',
                    cards: [
                        ...tasks.filter((el) => el.status === TaskStatus.TO_DO)
                    ]
                }, {
                    id: 2,
                    title: 'In progress',
                    cards: [
                        ...tasks.filter((el) => el.status === TaskStatus.IN_PROGRESS)
                    ]
                }, {
                    id: 3,
                    title: 'Done',
                    cards: [
                        ...tasks.filter((el) => el.status === TaskStatus.DONE)
                    ]
                }
            ]
        })
    }, [tasks]);

    function changeTaskStatus(task: Task, positionEnd: { toColumnId: number, toPosition: number }) {
        let status: TaskStatus = undefined!;

        if (positionEnd.toColumnId === 3) {
            status = TaskStatus.DONE;
        }
        if (positionEnd.toColumnId === 2) {
            status = TaskStatus.IN_PROGRESS;
        }
        if (positionEnd.toColumnId === 1) {
            status = TaskStatus.TO_DO;
        }

        http.patch("tasks/" + task.id, {
            status: status
        }).then(() => {
            dispatch(setTaskStatus({status: status, taskId: task.id}))
        })
    }

    return (
        <ControlledBoard disableColumnDrag
                         allowAddCard={false}
                         onCardDragEnd={(task: Task, a, positionEnd: any) => changeTaskStatus(task, positionEnd)}
                         renderCard={(el) => {
                             return (
                                 <div
                                     className={"flex bg-gray-600 w-12 p-1 border-round justify-content-between align-items-center"}>
                                     <div className={"flex align-items-center"}>
                                         <div>
                                             <div>
                                                 <TaskPriorityIndicator taskPriority={el.priority}/>
                                             </div>
                                             <TaskTypeIndicator taskType={el.type}/>
                                         </div>
                                         <h4 className={"m-3"}>{el.title}</h4></div>
                                     <UsersAssignedToTask task={el}/>
                                     <Button label={"edit"} onClick={() => dispatch(openDetailsTask(el))}/>
                                 </div>
                             )
                         }}>
            {board}
        </ControlledBoard>
    )
}