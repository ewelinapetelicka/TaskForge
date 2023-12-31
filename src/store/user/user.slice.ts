import {createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from "../../models/user/user";
import {RootState} from "../store";

interface UserState {
    profile: User | null;
    token: string | null;
    users: User[];
}

const initialState: UserState = {
    profile: JSON.parse(localStorage.getItem("profile") || 'null'),
    token: localStorage.getItem("token") || null,
    users: []
}

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        loginUser: (state, action: PayloadAction<{ user: User, accessToken: string }>) => {
            state.profile = action.payload.user;
            state.token = action.payload.accessToken;
            localStorage.setItem('profile', JSON.stringify(state.profile));
            localStorage.setItem("token", state.token);
        },
        logoutUser: (state) => {
            state.profile = null;
            localStorage.clear();
            state.token = null;
        },
        setUsers: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
        }
    },
});

export const selectUser = (state: RootState) => state.user.profile;
export const selectIsLogged = (state: RootState) => state.user.profile !== null;
export const selectProfileAvatar = (state: RootState) => state.user.profile!.avatar;
export const selectUsers = (state: RootState) => state.user.users;
export const selectUsersByIds = (ids: number[]) => createSelector(
    selectUsers,
    (users: User[]) => users.filter((el) => ids.includes(el.id))
);

export const {loginUser, logoutUser, setUsers} = userSlice.actions;
