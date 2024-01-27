import {SprintList} from "../../components/sprint-list/SprintList";
import {useSelector} from "react-redux";
import {selectSprints} from "../../../../store/sprints/sprints.slice";

export function ProjectBacklogPage() {
    const sprints = useSelector(selectSprints);

    return (
        <div>
            test backlog
            {sprints.map((el) => <SprintList sprintId={el.id}></SprintList>)}
            <SprintList sprintId={null}></SprintList>
        </div>
    )
}