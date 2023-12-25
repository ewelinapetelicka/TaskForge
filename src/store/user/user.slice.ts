import {createSlice} from "@reduxjs/toolkit";
import {User} from "../../models/user/user";
import {RootState} from "../store";

interface UserState {
    user: User | null;
}

const initialState: UserState = {
    user: null
}

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
    },
});

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user.user;
export const isUserLoggedIn = (state: RootState) => state.user.user !== null;
