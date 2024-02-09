import {useDispatch, useSelector} from "react-redux";
import {selectTasks, setTaskStatus} from "../../../../store/tasks/tasks.slice";
import {KanbanBoard, UncontrolledBoard} from '@caldwell619/react-kanban'
import '@caldwell619/react-kanban/dist/styles.css';
import "./ProjectKanbanPage.css";
import {Task} from "../../models/task/task";
import {TaskStatus} from "../../models/task/task-status/task-status";
import {useHttpClient} from "../../../../hooks/use-http-client/use-http-client";


export function ProjectKanbanPage() {
    const tasks = useSelector(selectTasks);
    const http = useHttpClient();
    const dispatch = useDispatch();

    function changeTaskStatus(board: KanbanBoard<Task>, task: Task) {
        let status: TaskStatus = undefined!;
        const isInToDoColumn = !!board.columns[0].cards.find((e) => e.id === task.id);
        const isInProgressColumn = !!board.columns[1].cards.find((e) => e.id === task.id);
        const isInDoneColumn = !!board.columns[2].cards.find((e) => e.id === task.id);

        if (isInDoneColumn) {
            status = TaskStatus.DONE;
        }
        if (isInProgressColumn) {
            status = TaskStatus.IN_PROGRESS;
        }
        if (isInToDoColumn) {
            status = TaskStatus.TO_DO;
        }

        http.patch("tasks/" + task.id, {
            status: status
        }).then(() => {
            dispatch(setTaskStatus({status: status, taskId: task.id}))
        })
    }

    const board: KanbanBoard<Task> = {
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
    }

    return (
        <UncontrolledBoard initialBoard={board} disableColumnDrag
                           onCardDragEnd={(board: any, task: any) => changeTaskStatus(board, task)}
                           renderCard={(el) => {
                               return (
                                   <div className={"bg-gray-600 w-12 p-1 border-round"}>
                                       <h4 className={"m-3"}>{el.title}</h4>
                                   </div>
                               )
                           }}/>
    )
}