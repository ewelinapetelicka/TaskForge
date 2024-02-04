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

export function SettingsGeneral() {
    const params = useParams<{ id: string }>();
    const project = useSelector(selectProjectById(parseInt(params.id!)));
    const assignee = useSelector(selectUsersByIds(project.userIds));
    const users = useSelector(selectUsers);
    const [editableProject, setEditableProject] = useState({...project});
    const http = useHttpClient();
    const dispatch = useDispatch();

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
            <InputText value={editableProject.icon}
                       onChange={(e) => setEditableProject({...editableProject, icon: e.target.value})}></InputText>
            <InputTextarea value={editableProject.description} className={"h-14rem"}
                           onChange={(e) => setEditableProject({
                               ...editableProject,
                               description: e.target.value
                           })}></InputTextarea>
            <MultiSelect value={assignee} options={users} optionLabel="name" display="chip"
                         onChange={(e) => setEditableProject({...editableProject, userIds: e.target.value})}/>
            <div className={"w-12 flex justify-content-center "}>
                <Button label="Save" onClick={() => editProject()}></Button>
            </div>
        </div>
    )
}