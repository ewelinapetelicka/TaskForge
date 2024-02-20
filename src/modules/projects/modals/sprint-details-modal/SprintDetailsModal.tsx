import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import {RadioButton} from "primereact/radiobutton";
import {addSprint, closeDetailsSprint, selectSprintDetail} from "../../../../store/sprints/sprints.slice";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {sprintStatusOptions} from "../../const/sprint-status-options";
import {useHttpClient} from "../../../../hooks/use-http-client/use-http-client";
import {useSnackbar} from "notistack";
import {Button} from "primereact/button";

export function SprintDetailsModal() {
    const dispatch = useDispatch();
    const sprint = useSelector(selectSprintDetail)
    const [newSprint, setNewSprint] = useState({...sprint});
    const http = useHttpClient();
    const {enqueueSnackbar} = useSnackbar();
    const [isEditing] = useState(!!sprint.id);

    function addNewSprint() {
        http.post("sprints/", {...newSprint}).then((data) => {
            dispatch(closeDetailsSprint());
            dispatch(addSprint(data));
            enqueueSnackbar(newSprint.name + ' has been added successfully');
        })
    }

    function saveChangesInSprint() {
        return (
            <div>test</div>
        )
    }

    return (
        <Dialog header={isEditing ? "Edit sprint" : "Create new sprint"} visible={true}
                onHide={() => dispatch(closeDetailsSprint())}
                className={"w-6"}>
            <div>
                <p>Add sprint name:</p>
                <InputText placeholder={"Add sprint title"} className={"w-12"}
                           value={newSprint.name}
                           onChange={(e) => setNewSprint({...newSprint, name: e.target.value})}/>
            </div>
            <div>
                <p>Sprint status:</p>
                <div className="w-12 flex justify-content-start gap-3">
                    {sprintStatusOptions.map((option) => (
                        <div>
                            <RadioButton name={option.label} value={option.value}
                                         onChange={(e) => setNewSprint({...newSprint, status: e.target.value})}
                                         checked={newSprint.status === option.value}/>
                            <label>{option.label}</label>
                        </div>
                    ))}
                </div>
            </div>
            {isEditing ? (
                <div className={"w-12 flex justify-content-center"}>
                    <Button label={"SAVE"} className={"align-self-end"} onClick={() => saveChangesInSprint()}
                            disabled={!newSprint.name}/>
                </div>
            ) : (
                <div className={"w-12 flex justify-content-center"}>
                    <Button label={"ADD NEW"} className={"align-self-end"} onClick={() => addNewSprint()}
                            disabled={!newSprint.name}/>
                </div>
            )}
        </Dialog>
    )
}