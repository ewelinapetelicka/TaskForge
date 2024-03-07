import {useDispatch, useSelector} from "react-redux";
import {openDetailsProfile, selectProfileDetailOpen, selectUser} from "../../../../store/user/user.slice";
import {Card} from "primereact/card";
import {Avatar} from "primereact/avatar";
import {selectProfileProjects} from "../../../../store/profile/profile.slice";
import {ProfileProjectPreview} from "../../components/ProfileProjectPreview";
import {Button} from "primereact/button";
import {ProfileDialog} from "../../dialogs/profile-dialog/ProfileDialog";

export function ProfilePage() {
    const projects = useSelector(selectProfileProjects);
    const user = useSelector(selectUser);
    const visible = useSelector(selectProfileDetailOpen);
    const dispatch = useDispatch();

    function openProfileModal() {
        dispatch(openDetailsProfile(user))
    }

    return (
        <div className={"w-12 h-full flex align-items-center justify-content-center"}>
            <Card className={"w-7"} header={
                <div className={"flex align-items-center gap-2 pl-3"}>
                    <i className="pi pi-user" style={{fontSize: '1.5rem'}}></i>
                    <h2 className={"w-12"}>Account</h2>
                </div>
            }>
                <div className={"w-12 flex flex-row justify-content-between gap-8"}>
                    <div className={"w-5 flex flex-column  justify-content-center"}>
                        <Avatar image={user.avatar} shape={"circle"} size={"xlarge"}/>
                        <div className={"flex align-items-center gap-2"}>
                            <p>User name:</p>
                            <h4>{user.name}</h4>
                        </div>
                        <div className={"flex align-items-center gap-2"}>
                            <p>Email address:</p>
                            <h4>{user.email}</h4>
                        </div>
                        <div className={"flex align-items-center"}>
                            <Button icon={"pi pi-pencil"} size="small" rounded text
                                    label={"Menage your account settings"}
                                    onClick={() => openProfileModal()}/>
                        </div>
                    </div>
                    <div className={"w-7"}>
                        {projects.map((el) => (
                            <ProfileProjectPreview project={el}/>
                        ))}
                    </div>
                </div>
            </Card>
            {visible && <ProfileDialog></ProfileDialog>}
        </div>
    )
}