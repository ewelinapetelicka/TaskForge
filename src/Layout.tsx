import {Header} from "./components/header/Header";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectIsLogged, setUsers} from "./store/user/user.slice";
import {useHttpClient} from "./hooks/use-http-client/use-http-client";
import {User} from "./models/user/user";
import {LoginPage} from "./pages/login-page/LoginPage";

export function Layout() {
    const location = useLocation();
    const isLogged = useSelector(selectIsLogged);
    const dispatch = useDispatch();
    const http = useHttpClient();

    useEffect(() => {
        if (isLogged) {
            getUsers();
        }
    }, [isLogged]);

    function getUsers() {
        http.get("users")
            .then((users: User[]) => dispatch(setUsers(users)))
    }

    if (!isLogged) {
        return <LoginPage/>
    }

    if (location.pathname === "/") {
        return <Navigate to={"/dashboard-page"}/>
    }

    return (
        <div style={{height: '100vh'}}>
            <Header/>
            <main style={{height: 'calc(100% - 87px)'}} className={"overflow-y-auto"}>
                <Outlet/>
            </main>
        </div>
    )
}