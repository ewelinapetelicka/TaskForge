import {Button, Card, CardContent, Grid, TextField, Typography} from "@mui/material";
import styles from './Login.module.css';

export function Login(){
    return (
        <div className={styles.test}>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Grid container direction={'column'}>
                        <Typography variant="h5" component="div">
                            Login
                        </Typography>
                        <TextField id="outlined-basic" label="Email" variant="outlined" />
                        <TextField id="outlined-basic" label="Password" variant="outlined" />
                        <Button variant="contained">Login</Button>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    )
}