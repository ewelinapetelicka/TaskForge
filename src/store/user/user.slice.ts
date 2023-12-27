import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from "../../models/user/user";
import {RootState} from "../store";

interface UserState {
    user: User | null;
    token: string | null;
}

const initialState: UserState = {
    user: JSON.parse(localStorage.getItem("user") || 'null'),
    token: localStorage.getItem("token") || null
}

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        loginUser: (state, action: PayloadAction<{user: User, accessToken: string}>) => {
            state.user = action.payload.user;
            state.token = action.payload.accessToken;
            localStorage.setItem('user', JSON.stringify(state.user));
            localStorage.setItem("token", state.token);
        },
        logoutUser : (state)=>{
            state.user = null;
            localStorage.clear();
            state.token = null;
        }
    },
});

export const selectUser = (state: RootState) => state.user.user;
export const isUserLoggedIn = (state: RootState) => state.user.user !== null;

export const { loginUser, logoutUser } = userSlice.actions;
