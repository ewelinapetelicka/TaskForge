import {SprintList} from "../../components/sprint-list/SprintList";
import {useDispatch, useSelector} from "react-redux";
import {openDetailsSprint, selectSprintDetailOpen, selectUndoneSprints} from "../../../../store/sprints/sprints.slice";
import {BacklogList} from "../../components/backlog-list/BacklogList";
import {Button} from "primereact/button";
import {useParams} from "react-router-dom";
import {SprintStatus} from "../../models/sprint/sprint-status/sprint-status";
import {SprintDetailsModal} from "../../modals/sprint-details-modal/SprintDetailsModal";

export function ProjectBacklogPage() {
    const sprints = useSelector(selectUndoneSprints);
    const dispatch = useDispatch();
    const params = useParams();
    const visible = useSelector(selectSprintDetailOpen);

    function openSprintModal() {
        dispatch(openDetailsSprint({
            id: null as any,
            name: '',
            projectId: parseInt(params.id!),
            status: SprintStatus.OPEN
        }))
    }

    return (
        <div className={"pt-2"}>
            <Button label={"ADD NEW"} outlined onClick={() => openSprintModal()}></Button>
            {sprints.map((el) => <SprintList sprintId={el.id} key={el.id}></SprintList>)}
            <BacklogList></BacklogList>
            {visible && <SprintDetailsModal></SprintDetailsModal>}
        </div>
    )
}
