import {Dialog} from "primereact/dialog";
import {useDispatch, useSelector} from "react-redux";
import {closeDetailsTask, selectTaskDetail} from "../../../../store/tasks/tasks.slice";
import {InputTextarea} from "primereact/inputtextarea";
import {useState} from "react";
import {RadioButton} from "primereact/radiobutton";
import {Avatar} from "primereact/avatar";
import {selectUsersByIds} from "../../../../store/user/user.slice";
import {InputText} from "primereact/inputtext";
import {Card} from "primereact/card";
import {selectProjectById} from "../../../../store/projects/projects.slice";
import {Button} from "primereact/button";
import {useHttpClient} from "../../../../hooks/use-http-client/use-http-client";
import {MultiSelect} from "primereact/multiselect";
import {taskPriorityOptions} from "../../const/task-priority-options";
import {taskStatusOptions} from "../../const/task-status-options";
import {taskTypeOptions} from "../../const/task-type-options";
import {User} from "../../../../models/user/user";

export function TaskDetailsModal() {
    const task = useSelector(selectTaskDetail);
    const [newTask, setNewTask] = useState({...task});
    const dispatch = useDispatch();
    const http = useHttpClient();
    const project = useSelector(selectProjectById(task.projectId));
    const assignee = useSelector(selectUsersByIds(newTask.userIds));
    const projectUsers = useSelector(selectUsersByIds(project.userIds))


    function saveChangesInTask() {
        http.patch("tasks/"+ newTask.id, newTask)
    }

    return (
        <Dialog header={"Edit task"} visible={true} style={{width: '80vw', height: '90vh'}}
                onHide={() => dispatch(closeDetailsTask())}>
            <Card>
                <div className="flex flex-column w-12 h-full gap-3">
                    <div className="p-float-label mt-4">
                        <InputText className="m-0 w-12" value={newTask.title}
                                   onChange={(e) => setNewTask({...newTask, title: e.target.value})}></InputText>
                        <label>Task title</label>
                    </div>
                    <div className="p-float-label mt-4">
                        <InputTextarea className="m-0 w-12" value={newTask.description}
                                       onChange={(e) => setNewTask({...newTask, description: e.target.value})}>
                        </InputTextarea>
                        <label>Task description</label>
                    </div>
                    <div className="flex gap-4">
                        <div className="card flex justify-content-center">
                            <MultiSelect value={assignee}
                                         options={projectUsers}
                                         itemTemplate={(el) => {
                                             return (
                                                 <div className="flex align-items-center gap-2">
                                                     <span>{el.name}</span>
                                                     <Avatar image={el.avatar} shape={"circle"}></Avatar>
                                                 </div>
                                             )
                                         }}
                                         optionLabel="name"
                                         placeholder="Search profile"
                                         className="w-full md:w-20rem"
                                         display="chip"
                                         onChange={(e) => setNewTask({
                                             ...newTask,
                                             userIds: e.target.value.map((user: User) => user.id)
                                         })}/>
                        </div>
                        <div className="flex gap-4 align-items-center">
                            <span>Assigned to:</span>
                            {assignee.map(user => (
                                <>
                                    <Avatar image={user.avatar} key={user.id} shape={"circle"} size={'large'}/>
                                    <p>{user.name}</p>
                                </>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-wrap flex-column">
                        <h4>Task priority:</h4>
                        <div className="flex gap-3">
                            {taskPriorityOptions.map(option => (
                                <div className="flex align-items-center">
                                    <RadioButton name={option.label} value={option.value}
                                                 onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                                                 checked={newTask.priority === option.value}/>
                                    <label className="ml-2">{option.label}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-wrap flex-column">
                        <h4>Task status:</h4>
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
                    </div>
                    <div className="flex flex-wrap flex-column">
                        <h4>Task type:</h4>
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
                    <div className="w-12 flex justify-content-center">
                        <Button className="w-1 flex justify-content-center" onClick={()=> saveChangesInTask()}>SAVE</Button>
                    </div>
                </div>
            </Card>
        </Dialog>
    )
}