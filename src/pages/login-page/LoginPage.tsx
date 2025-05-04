import {useState} from "react";
import {useDispatch} from "react-redux";
import {loginUser} from "../../store/user/user.slice";
import {useHttpClient} from "../../hooks/use-http-client/use-http-client";
import {useSnackbar} from "notistack";
import {Card} from "primereact/card";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";

export function LoginPage() {
    const [email, setEmail] = useState("admin@gmail.com");
    const [password, setPassword] = useState("123456");
    const dispatch = useDispatch();
    const http = useHttpClient();
    const {enqueueSnackbar} = useSnackbar();
    const navigate = useNavigate();

    function logIn() {
        http.post("login-page", {
            password: password,
            email: email
        })
            .then((res) => dispatch(loginUser(res)))
            .then(() => navigate("/projects/dashboard"))
            .catch((err: Error) => enqueueSnackbar(err.message))
    }

    return (
        <div className="flex justify-content-center align-items-center w-screen h-screen">
            <Card className="w-5">
                <div className="w-12 h-12 flex flex-column justify-content-center gap-3 p-0">
                    <h2 className="pl-2">Login</h2>
                    <InputText id="outlined-basic" placeholder="Email" value={email}
                               onChange={(el) => setEmail(el.target.value)}/>
                    <InputText id="outlined-basic" placeholder="Password" value={password} type="password"
                               onChange={(el) => setPassword(el.target.value)}/>
                    <div className="flex justify-content-center w-full pt-4">
                        <Button className="w-4 flex justify-content-center" onClick={() => logIn()}>Login</Button>
                    </div>
                </div>
            </Card>
        </div>
    )
}