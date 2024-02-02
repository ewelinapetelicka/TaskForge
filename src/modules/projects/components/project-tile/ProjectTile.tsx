import {Project} from "../../models/project/project";
import {useSelector} from "react-redux";
import {selectUsersByIds} from "../../../../store/user/user.slice";
import {useNavigate} from "react-router-dom";
import {Card} from "primereact/card";
import {Avatar} from "primereact/avatar";
import {AvatarGroup} from "primereact/avatargroup";
import {Button} from "primereact/button";

export interface ProjectTileProps {
    project: Project;
}

export function ProjectTile(props: ProjectTileProps) {
    const users = useSelector(selectUsersByIds(props.project.userIds));
    const navigate = useNavigate();

    return (
        <Card className="flex-1 m-2 " style={{minWidth: "25%"}} title={(
            <div className={"flex  align-items-center justify-content-between pr-3 "}>
                <div className="flex align-items-center gap-2">
                    <Avatar image={props.project.icon}></Avatar>
                    <h3>{props.project.title}</h3>
                </div>
                <Button label={"Edit..."} outlined
                        onClick={() => navigate("/projects/" + props.project.id + "/settings")}/>
            </div>

        )}>
            <p className="opacity-60">{props.project.description}</p>
            <div className="flex align-items-center justify-content-between pr-3 pl-2">
                <AvatarGroup>
                    {users.map(user => (
                        <Avatar image={user.avatar} key={user.id} shape={"circle"} size={'large'}/>
                    ))}
                </AvatarGroup>
                <Button onClick={() => navigate('/projects/' + props.project.id + '/backlog')}>MORE</Button>
            </div>
        </Card>
    )
}
