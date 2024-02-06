import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import {MultiSelect} from "primereact/multiselect";
import {Button} from "primereact/button";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectProjectById, setProjectById} from "../../../../store/projects/projects.slice";
import {selectUsers, selectUsersByIds} from "../../../../store/user/user.slice";
import {useState} from "react";
import {useHttpClient} from "../../../../hooks/use-http-client/use-http-client";
import {enqueueSnackbar} from "notistack";
import {Avatar} from "primereact/avatar";
import {ListBox} from "primereact/listbox";
import {projectsIconsOptions} from "../../const/projects-icons-options";

export function SettingsGeneral() {
    const params = useParams<{ id: string }>();
    const project = useSelector(selectProjectById(parseInt(params.id!)));
    const assignee = useSelector(selectUsersByIds(project.userIds));
    const users = useSelector(selectUsers);
    const [editableProject, setEditableProject] = useState({...project});
    const http = useHttpClient();
    const dispatch = useDispatch();
    const iconTemplate = (option: any) => {
        return (
            <div className="flex align-items-center gap-3">
                <Avatar image={option.value} size={"large"}/>
                <div>{option.label}</div>
            </div>
        );
    };

    function editProject() {
        http.patch("projects/" + editableProject.id, {...editableProject}).then(() => {
            enqueueSnackbar(project.title + ' has been edited successfully');
            dispatch(setProjectById(editableProject));
        })
    }

    return (
        <div className="flex flex-column gap-3">
            <InputText value={editableProject.title}
                       onChange={(e) => setEditableProject({...editableProject, title: e.target.value})}></InputText>
            <InputTextarea value={editableProject.description} className={"h-14rem"}
                           onChange={(e) => setEditableProject({
                               ...editableProject,
                               description: e.target.value
                           })}></InputTextarea>
            <div className={"flex gap-3 align-items-center"}>
                <Avatar image={editableProject.icon} size={"xlarge"}/>
                <ListBox value={projectsIconsOptions}
                         onChange={(e) => setEditableProject({...editableProject, icon: e.target.value})}
                         optionLabel={"name"}
                         itemTemplate={iconTemplate} options={projectsIconsOptions} className="w-full "
                         listStyle={{maxHeight: '150px', minWidth: '400px'}}></ListBox>
            </div>
            <MultiSelect value={assignee} options={users} optionLabel="name" display="chip"
                         onChange={(e) => setEditableProject({...editableProject, userIds: e.target.value})}/>
            <div className={"w-12 flex justify-content-center "}>
                <Button label="Save" onClick={() => editProject()}></Button>
            </div>
        </div>
    )
}