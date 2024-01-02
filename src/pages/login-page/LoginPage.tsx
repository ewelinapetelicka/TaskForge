import {Box, Button, Card, CardContent, Grid, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {loginUser} from "../../store/user/user.slice";
import {useHttpClient} from "../../hooks/use-http-client/use-http-client";
import {useSnackbar} from "notistack";

export function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const http = useHttpClient();
    const {enqueueSnackbar} = useSnackbar();


    function logIn() {
        http.post("login-page", {
            password: password,
            email: email
        })
            .then((res) => dispatch(loginUser(res)))
            .catch((err: Error) => enqueueSnackbar(err.message))
    }

    return (
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: "100vw", height: "100vh"}}>
            <Card sx={{width: "40%", height: "40%"}}>
                <CardContent sx={{display: 'flex', gap: "3", height:'100%'}}>
                    <Grid
                        sx={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}}>
                        <Typography variant="h5" component="div">Login</Typography>
                        <TextField id="outlined-basic" label="Email" variant="outlined" value={email}
                                   onChange={(el) => setEmail(el.target.value)}/>
                        <TextField id="outlined-basic" label="Password" variant="outlined" value={password} type="password"
                                   onChange={(el) => setPassword(el.target.value)}/>
                        <div style={{width: '100%', display:'flex', justifyContent:'center'}}>
                            <Button variant="contained" sx={{width: '40%'}} onClick={() => logIn()}>Login</Button>
                        </div>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    )
}