import {Avatar, AvatarGroup, Card} from "@mui/material";
import {Project} from "../../models/project/project";
import {useSelector} from "react-redux";
import {selectUsersByIds} from "../../store/user/user.slice";

export interface ProjectTileProps {
    project: Project;
}

export function ProjectTile(props: ProjectTileProps) {
    const users = useSelector(selectUsersByIds(props.project.userIds))
    return (
        <Card sx={{width: '30%', p: 2}}>
            <h3>{props.project.title}</h3>
            <p>{props.project.description}</p>
            <AvatarGroup max={4}>
                {users.map(user=>(
                    <Avatar src={user.avatar}/>
                ))}
            </AvatarGroup>
        </Card>
    )
}