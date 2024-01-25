import {Dialog} from "primereact/dialog";
import {useDispatch, useSelector} from "react-redux";
import {
    addTask,
    closeDetailsTask,
    editTask,
    removeTaskById,
    selectTaskDetail
} from "../../../../store/tasks/tasks.slice";
import {useState} from "react";
import {RadioButton} from "primereact/radiobutton";
import {Avatar} from "primereact/avatar";
import {selectUsersByIds} from "../../../../store/user/user.slice";
import {InputText} from "primereact/inputtext";
import {selectProjectById} from "../../../../store/projects/projects.slice";
import {Button} from "primereact/button";
import {useHttpClient} from "../../../../hooks/use-http-client/use-http-client";
import {MultiSelect} from "primereact/multiselect";
import {taskPriorityOptions} from "../../const/task-priority-options";
import {taskStatusOptions} from "../../const/task-status-options";
import {taskTypeOptions} from "../../const/task-type-options";
import {User} from "../../../../models/user/user";
import {useSnackbar} from "notistack";
import {Editor} from "primereact/editor";
import {ConfirmModal} from "../../../../components/confirm-modal/ConfirmModal";

export function TaskDetailsModal() {
    const task = useSelector(selectTaskDetail);
    const [newTask, setNewTask] = useState({...task});
    const [description, setDescription] = useState(task.description)
    const [requestIsPending, setRequestIsPending] = useState(false);
    const dispatch = useDispatch();
    const http = useHttpClient();
    const project = useSelector(selectProjectById(task.projectId));
    const assignee = useSelector(selectUsersByIds(newTask.userIds));
    const projectUsers = useSelector(selectUsersByIds(project.userIds))
    const {enqueueSnackbar} = useSnackbar();
    const [isEditing] = useState(!!task.id)

    function saveChangesInTask() {
        setRequestIsPending(true);
        http.patch("tasks/" + newTask.id, {...newTask, description}).then(() => {
            dispatch(closeDetailsTask());
            enqueueSnackbar(newTask.title + ' has been edited successfully');
            dispatch(editTask(newTask));
        })
    }

    function addNewTask() {
        http.post("tasks", {...newTask, description}).then(() => {
            dispatch(closeDetailsTask());
            enqueueSnackbar("New task added");
            dispatch(addTask(newTask));
        })
    }

    function deleteTask() {
        http.delete("tasks/" + task.id).then(() => {
            dispatch(closeDetailsTask());
            enqueueSnackbar('Task has been deleted');
            dispatch(removeTaskById(task.id));
        })
    }

    return (
        <Dialog header={
            <InputText value={newTask.title} className={"w-12"}
                       placeholder={"Add task title..."}
                       onChange={(e) => setNewTask({...newTask, title: e.target.value})}/>
        }
                visible={true} style={{width: '80vw'}}
                onHide={() => dispatch(closeDetailsTask())}>
            <div className={"w-12 flex gap-3"}>
                <Editor value={description}
                        onTextChange={(value) => setDescription(value.htmlValue!)}
                        className={"w-8"}
                        style={{height: '400px'}}/>
                <div className={"flex flex-column w-4 gap-3"}>
                    <p>Task assignee:</p>
                    <MultiSelect value={assignee}
                                 options={projectUsers}
                                 itemTemplate={(el) => {
                                     return (
                                         <div className="flex align-items-center gap-2 ">
                                             <span>{el.name}</span>
                                             <Avatar image={el.avatar} shape={"circle"}></Avatar>
                                         </div>
                                     )
                                 }}
                                 optionLabel="name"
                                 placeholder="Search profile"
                                 className="w-full "
                                 display="chip"
                                 onChange={(e) => setNewTask({
                                     ...newTask,
                                     userIds: e.target.value.map((user: User) => user.id)
                                 })}/>
                    <p>Task priority:</p>
                    <div className="flex gap-3">
                        {taskPriorityOptions.map(option => (
                            <div className="flex align-items-center">
                                <RadioButton name={option.label} value={option.value}
                                             onChange={(e) => setNewTask({
                                                 ...newTask,
                                                 priority: e.target.value
                                             })}
                                             checked={newTask.priority === option.value}/>
                                <label className="ml-2">{option.label}</label>
                            </div>
                        ))}
                    </div>
                    <p>Task status:</p>
                    <div className="flex gap-3">
                        {taskStatusOptions.map(option => (
                            <div className="flex align-items-center">
                                <RadioButton name={option.label} value={option.value}
                                             onChange={(e) => setNewTask({...newTask, status: e.target.value})}
                                             checked={newTask.status === option.value}/>
                                <label className="ml-2">{option.label}</label>
                            </div>
                        ))}
                    </div>
                    <p>Task type:</p>
                    <div className="flex gap-3">
                        {taskTypeOptions.map(option => (
                            <div className="flex align-items-center">
                                <RadioButton name={option.label} value={option.value}
                                             onChange={(e) => setNewTask({...newTask, type: e.target.value})}
                                             checked={newTask.type === option.value}/>
                                <label className="ml-2">{option.label}</label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {isEditing ? (
                <div className="w-12 flex justify-content-between gap-8 mt-3 ">
                    <ConfirmModal header={"Delete Confirmation"}
                                  message={"Do you want to delete this task?"}
                                  accept={() => deleteTask()}
                                  button={
                                      <Button label={"DELETE"}
                                              severity={"danger"}
                                              text>
                                      </Button>
                                  }/>
                    <Button loading={requestIsPending}
                            label={"SAVE"}
                            onClick={() => saveChangesInTask()}>
                    </Button>
                </div>
            ) : (
                <div className="w-12 flex justify-content-end gap-8 mt-3 ">
                    <Button label={"ADD NEW"} className={"align-self-end"}
                            onClick={() => addNewTask()}
                            disabled={!newTask.title || !newTask.description}>
                    </Button>
                </div>
            )}
        </Dialog>
    )
}