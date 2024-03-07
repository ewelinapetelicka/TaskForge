import {Project} from "../../project-list/models/project/project";
import {useSelector} from "react-redux";
import {
    selectProfileSprintInProgressByProjectId,
    selectProfileTasksPerSprint
} from "../../../store/profile/profile.slice";

interface ProfileProjectPreviewProps {
    project: Project
}

export function ProfileProjectPreview(props: ProfileProjectPreviewProps) {
    const sprint = useSelector(selectProfileSprintInProgressByProjectId(props.project!.id));
    const tasks = useSelector(selectProfileTasksPerSprint(sprint!.id));

    return (
        <div className={"flex flex-column justify-content-around"}>
            <div className={"flex align-items-center gap-2"}>
                <p>Project assigned to the user: </p>
                <h3>{props.project.title}</h3>
            </div>
            <div className={"flex align-items-center gap-2"}>
                <p>Recent sprint:</p>
                <h3>{sprint!.name}</h3>
            </div>
            <p>Recent tasks:
                {tasks.map((task) => (
                    <h3>{task.title}</h3>
                ))}
            </p>
        </div>
    )
}