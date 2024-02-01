import {Dialog} from "primereact/dialog";
import {useDispatch, useSelector} from "react-redux";
import {closeDetailsProject, selectProjectDetails} from "../../../../store/projects/projects.slice";
import {InputText} from "primereact/inputtext";
import {useState} from "react";
import {Button} from "primereact/button";
import {selectUsers, selectUsersByIds} from "../../../../store/user/user.slice";
import {MultiSelect} from "primereact/multiselect";
import {Avatar} from "primereact/avatar";
import {User} from "../../../../models/user/user";
import {InputTextarea} from "primereact/inputtextarea";

export function ProjectDetailsModal() {
    const dispatch = useDispatch();
    const project = useSelector(selectProjectDetails);
    const [newProject, setNewProject] = useState({...project});
    const users = useSelector(selectUsers);
    const assignee = useSelector(selectUsersByIds(newProject.userIds));

    return (
        <Dialog visible={true} onHide={() => dispatch(closeDetailsProject())} style={{width: '70vw'}}
                header={<InputText placeholder={"Add project title..."} value={newProject.title} className={"w-12"}
                                   onChange={(event) => setNewProject({...newProject, title: event.target.value})}>
                </InputText>}>
            <div className={"flex flex-column gap-4"}>
                <InputText placeholder={"Add link to project logo ..."} value={newProject.icon} className={"w-12"}
                           onChange={(event) => setNewProject({...newProject, icon: event.target.value})}>
                </InputText>
                <InputTextarea value={newProject.description} className={"w-12"} onChange={(event) => setNewProject({
                    ...newProject,
                    description: event.target.value
                })}></InputTextarea>
                <MultiSelect value={assignee}
                             options={users}
                             itemTemplate={(el) => {
                                 return (
                                     <div className="flex align-items-center gap-2 ">
                                         <span>{el.name}</span>
                                         <Avatar image={el.avatar} shape={"circle"}></Avatar>
                                     </div>
                                 )
                             }}
                             optionLabel="name"
                             placeholder="Add profile..."
                             className="w-full "
                             display="chip"
                             onChange={(e) => setNewProject({
                                 ...newProject,
                                 userIds: e.target.value.map((user: User) => user.id)
                             })}/>
                <div className={"w-12 flex justify-content-center"}>
                    <Button>Add new</Button>
                </div>
            </div>
        </Dialog>
    )
}