import {Dialog} from "primereact/dialog";
import {useDispatch, useSelector} from "react-redux";
import {closeDetailsProfile, editProfile, selectUser} from "../../../../store/user/user.slice";
import {Avatar} from "primereact/avatar";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {useHttpClient} from "../../../../hooks/use-http-client/use-http-client";
import {enqueueSnackbar} from "notistack";
import {useState} from "react";

export function ProfileDialog() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const http = useHttpClient();
    const [editedUser, setEditedUser] = useState({...user});

    function saveChangesInProfile() {
        http.patch("users/" + user.id, {
            name: editedUser.name,
            email: editedUser.email,
            avatar: editedUser.avatar
        }).then(() => {
            dispatch(closeDetailsProfile());
            enqueueSnackbar('Profile has been edited successfully');
            dispatch(editProfile(editedUser));
        })
    }

    return (
        <Dialog onHide={() => dispatch(closeDetailsProfile())} visible={true}>
            <div className={"flex flex-column align-items-center gap-4"}>
                <Avatar image={user.avatar} shape={"circle"} size={"xlarge"}/>
                <InputText value={editedUser.avatar}
                           onChange={(e) => setEditedUser({...user, avatar: e.target.value})}/>
                <InputText value={editedUser.name} onChange={(e) => setEditedUser({...user, name: e.target.value})}/>
                <InputText value={editedUser.email} onChange={(e) => setEditedUser({...user, email: e.target.value})}/>
                <Button label={"SAVE"}
                        onClick={() => saveChangesInProfile()}>
                </Button></div>
        </Dialog>
    )
}