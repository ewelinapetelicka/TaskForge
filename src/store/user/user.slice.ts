import {createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from "../../models/user/user";
import {RootState} from "../store";

interface UserState {
    profile: User | null;
    token: string | null;
    users: User[];
    profileDetails: User | null;
}

const initialState: UserState = {
    profile: JSON.parse(localStorage.getItem("profile") || 'null'),
    token: localStorage.getItem("token") || null,
    users: [],
    profileDetails: null
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
        },
        openDetailsProfile: (state, action: PayloadAction<User>) => {
            state.profileDetails = action.payload;
        },
        closeDetailsProfile: (state) => {
            state.profileDetails = null;
        },
        editProfile: (state, action: PayloadAction<User>) => {
            state.users = state.users.map((el) => {
                if (el.id === action.payload.id) {
                    return action.payload
                }
                return el;
            });
            state.profile = action.payload;
            localStorage.setItem('profile', JSON.stringify(state.profile));
        }
    }
});

export const selectUser = (state: RootState) => state.user.profile!;
export const selectIsLogged = (state: RootState) => state.user.profile !== null;
export const selectToken = (state: RootState) => state.user.token!;
export const selectProfileAvatar = (state: RootState) => state.user.profile!.avatar;
export const selectUsers = (state: RootState) => state.user.users;
export const selectProfileDetailOpen = (state: RootState) => state.user.profileDetails !== null;
export const selectUsersByIds = (ids: number[]) => createSelector(
    selectUsers, (users: User[]) => users.filter((el) => ids.includes(el.id)));

export const {
    loginUser,
    logoutUser,
    setUsers,
    openDetailsProfile,
    closeDetailsProfile,
    editProfile
} = userSlice.actions;
