import {Outlet, useNavigate} from "react-router-dom";
import {Box, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import React from "react";

export function ProjectLayoutPage() {
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const navigate = useNavigate();

    const navigateAndHandleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
        patch: string,
    ) => {
        setSelectedIndex(index);
        navigate(patch);
    };

    return (
        <div style={{width:'100%', height:'100%',display:'flex'}}>
            <Box sx={{width: '30%',height:'100%', bgcolor: 'background.paper'}}>
                <List component="nav" aria-label="main mailbox folders">
                    <ListItemButton
                        selected={selectedIndex === 0}
                        onClick={(event) => navigateAndHandleListItemClick(event, 0, 'backlog')}
                    >
                        <ListItemText primary="Backlog"/>
                    </ListItemButton>
                    <ListItemButton
                        selected={selectedIndex === 1}
                        onClick={(event) => navigateAndHandleListItemClick(event, 1, 'browser')}
                    >
                        <ListItemText primary="Task browser"/>
                    </ListItemButton>
                    <ListItemButton
                        selected={selectedIndex === 2}
                        onClick={(event) => navigateAndHandleListItemClick(event, 2, 'settings')}
                    >
                        <ListItemText primary="Settings"/>
                    </ListItemButton>
                </List>
            </Box>
            <div style={{width:'70%', height:'100%'}}>
                <Outlet></Outlet>
            </div>
        </div>
    )
}