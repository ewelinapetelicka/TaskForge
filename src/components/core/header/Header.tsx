import {AppBar, Avatar, Box, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography} from "@mui/material";
import KeyboardCommandKeyIcon from '@mui/icons-material/KeyboardCommandKey';
import {useNavigate} from "react-router-dom";
import {MouseEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser, selectProfileAvatar} from "../../../store/user/user.slice";

export function Header() {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const avatar = useSelector(selectProfileAvatar);

    const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    function logOut() {
        dispatch(logoutUser());
    }

    return (
        <AppBar position="static">
            <Toolbar disableGutters
                     sx={{width: '100%', display: "flex", justifyContent: "space-between", pl: 1, pr: 2}}>
                <div style={{display: "flex", alignItems: "center", cursor: "pointer"}}>
                    <div onClick={() => navigate("/dashboard-page")} style={{display: "flex", alignItems: "center", cursor: "pointer"}}>
                        <KeyboardCommandKeyIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}} color="primary"
                                               fontSize="large"/>
                        <Typography
                            variant="h5"
                            noWrap
                            sx={{
                                mr: 2,
                                display: {xs: 'none', md: 'flex'},
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                textDecoration: 'none',
                            }}
                        >
                            TaskForge
                        </Typography>
                    </div>
                    <MenuItem onClick={() => navigate('/project-dashboard-page')}>
                        <Typography textAlign="center">Products</Typography>
                    </MenuItem>
                </div>
                <Box sx={{flexGrow: 0}}>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                            <Avatar src={avatar}/>
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{mt: '45px'}}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        <MenuItem onClick={handleCloseUserMenu}>
                            <Typography textAlign="center">Profile</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => logOut()}>
                            <Typography textAlign="center">Logout</Typography>
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    )
}