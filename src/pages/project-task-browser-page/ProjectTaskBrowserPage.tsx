import {
    Input,
    InputAdornment,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {Search} from "@mui/icons-material";
import Paper from '@mui/material/Paper';
import {useDispatch, useSelector} from "react-redux";
import {selectTasks, setTasks} from "../../store/tasks/tasks.slice";
import {useHttpClient} from "../../hooks/use-http-client/use-http-client";
import {useParams} from "react-router-dom";
import {Task} from "../../models/task/task";
import React, {useEffect, useState} from "react";
import {colorTypeTask} from "../../components/common/color-type-task/ColorTypeTask";

export function ProjectTaskBrowserPage() {
    const tasks = useSelector(selectTasks);
    const http = useHttpClient();
    const params = useParams();
    const dispatch = useDispatch();
    const [search, setSearch] = useState<string>("");
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([])


    useEffect(() => {
        getTasks();
        setFilteredTasks(tasks.filter((el)=> el.title.toLowerCase().includes(search.toLowerCase())));
    }, [search,tasks]);

    function getTasks() {
        http.get("project/" + params.id + "/tasks")
            .then((tasks: Task[]) => dispatch(setTasks(tasks)))
    }

    return (
        <div>
            <div style={{width: '100%', display: 'flex', justifyContent: 'end', padding: '1rem', paddingRight: '5rem'}}>
                <Input
                    id="input-with-icon-adornment"
                    onChange={(e) => setSearch(e.target.value)}
                    startAdornment={
                        <InputAdornment position="start">
                            <Search/>
                        </InputAdornment>
                    }
                />
            </div>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>TYPE</TableCell>
                            <TableCell align="left">TASK NAME</TableCell>
                            <TableCell align="center">PRIORITY</TableCell>
                            <TableCell align="center">STATUS</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredTasks.map((task) => (
                            <TableRow
                                key={task.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell sx={{width: '20px'}}>{colorTypeTask(task.type)}</TableCell>
                                <TableCell align='left'>
                                    {task.title}
                                </TableCell>
                                <TableCell align="center">{task.priority}</TableCell>
                                <TableCell align="center">{task.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination count={filteredTasks.length / 10} variant="outlined" color="secondary"/>
        </div>
    )
}