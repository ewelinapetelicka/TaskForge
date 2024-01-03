import {Input, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {Search} from "@mui/icons-material";
import Paper from '@mui/material/Paper';
import {useDispatch, useSelector} from "react-redux";
import {selectTasks, setTasks} from "../../store/tasks/tasks.slice";
import {useHttpClient} from "../../hooks/use-http-client/use-http-client";
import {useParams} from "react-router-dom";
import {Task} from "../../models/task/task";
import {useEffect} from "react";


export function ProjectTaskBrowserPage() {
    const tasks = useSelector(selectTasks);
    const http = useHttpClient();
    const params = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        getTasks();
    }, []);

    function getTasks() {
        http.get("project/" + params.id + "/tasks")
            .then((tasks: Task[]) => dispatch(setTasks(tasks)))
    }

    return (
        <div>
            <Input
                id="input-with-icon-adornment"
                startAdornment={
                    <InputAdornment position="start">
                        <Search/>
                    </InputAdornment>
                }
            />
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>TASK NAME</TableCell>
                            <TableCell align="right">PRIORITY</TableCell>
                            <TableCell align="right">STATUS</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map((task) => (
                            <TableRow
                                key={task.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {task.title}
                                </TableCell>
                                <TableCell align="right">{task.priority}</TableCell>
                                <TableCell align="right">{task.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}