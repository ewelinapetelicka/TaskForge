import {Box, Button, Card, CardContent, Grid, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {loginUser} from "../../store/user/user.slice";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    function logIn() {
        fetch("http://localhost:8000/login", {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            if(res.ok) {
                return res.json();
            } else {
                throw new Error('')
            }
        }).then((res) => {
            dispatch(loginUser(res))
        }).catch(() => {
        })
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