import {Button} from "primereact/button";
import {ConfirmModal} from "../../../../components/confirm-modal/ConfirmModal";
import {useHttpClient} from "../../../../hooks/use-http-client/use-http-client";
import {useSelector} from "react-redux";
import {selectTasks} from "../../../../store/tasks/tasks.slice";
import {selectSprints} from "../../../../store/sprints/sprints.slice";
import {useParams} from "react-router-dom";
import {selectProjectById} from "../../../../store/projects/projects.slice";

export function SettingsProjectRemoval() {
    const http = useHttpClient();
    const params = useParams();
    const tasks = useSelector(selectTasks);
    const sprints = useSelector(selectSprints)
    const project = useSelector(selectProjectById(parseInt(params.id!)));

    function deleteProject() {
        Promise.all([
            ...tasks.map((el) => http.delete("tasks/" + el.id)),
            ...sprints.map((el) => http.delete("sprints/" + el.id)),
            http.delete("projects/" + project.id)
        ]).then(() => {
            console.log("usunieto")
        })
    }
    
    return (
        <div>
            <ConfirmModal
                accept={() => deleteProject()}
                message={"Do you want to delete this project?"}
                header={"Delete Confirmation"}
                button={
                    <Button
                        label={"Remove project"}
                        severity={"danger"}>
                    </Button>}/>
        </div>
    )
}