import {Box, Button, Card, CardContent, Grid, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {loginUser} from "../../store/user/user.slice";
import {useHttpClient} from "../../hooks/use-http-client/use-http-client";
import {useSnackbar} from "notistack";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const http = useHttpClient();
    const { enqueueSnackbar } = useSnackbar();


    function logIn() {
        http.post("login", {
            password: password,
            email: email
        })
            .then((res) => dispatch(loginUser(res)))
            .catch((err: Error) => enqueueSnackbar(err.message))
    }

    return (
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: "100vw", height: "100vh"}}>
            <Card sx={{width: "40%", height: "40%"}}>
                <CardContent sx={{display: 'flex', gap: "3"}}>
                    <Grid container direction={'column'} gap={"4px"}>
                        <Typography variant="h5" component="div">
                            Login
                        </Typography>
                        <TextField id="outlined-basic" label="Email" variant="outlined" value={email}
                                   onChange={(el) => setEmail(el.target.value)}/>
                        <TextField id="outlined-basic" label="Password" variant="outlined" value={password}
                                   onChange={(el) => setPassword(el.target.value)}/>
                        <Button variant="contained" onClick={() => logIn()}>Login</Button>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    )
}