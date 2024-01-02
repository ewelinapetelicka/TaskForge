import {Avatar, AvatarGroup, Button, Card} from "@mui/material";
import {Project} from "../../models/project/project";
import {useSelector} from "react-redux";
import {selectUsersByIds} from "../../store/user/user.slice";
import {useNavigate} from "react-router-dom";

export interface ProjectTileProps {
    project: Project;
}

export function ProjectTile(props: ProjectTileProps) {
    const users = useSelector(selectUsersByIds(props.project.userIds));
    const navigate = useNavigate();

    return (
        <Card sx={{width: '30%', p: 2}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                <Avatar src={props.project.icon}></Avatar>
                <h3>{props.project.title}</h3>
            </div>
            <p style={{opacity: 0.6}}>{props.project.description}</p>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', paddingRight:'2rem', paddingLeft:'2rem'}}>
                <AvatarGroup max={3}>
                    {users.map(user => (
                        <Avatar src={user.avatar} key={user.id}/>
                    ))}
                </AvatarGroup>
                <Button onClick={() => navigate('/projects/' + props.project.id + '/backlog')} variant={'outlined'}>MORE</Button>
            </div>
        </Card>
    )
}