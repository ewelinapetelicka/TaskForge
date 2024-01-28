import {SprintList} from "../../components/sprint-list/SprintList";
import {useSelector} from "react-redux";
import {selectSprints} from "../../../../store/sprints/sprints.slice";
import {BacklogList} from "../../components/backlog-list/BacklogList";

export function ProjectBacklogPage() {
    const sprints = useSelector(selectSprints);

    return (
        <div>
            {sprints.map((el) => <SprintList sprintId={el.id}></SprintList>)}
            <BacklogList></BacklogList>
        </div>
    )
}