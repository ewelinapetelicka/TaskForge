import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {Sprint} from "../../modules/projects/models/sprint/sprint";

interface SprintsSlice {
    sprints: Sprint[];
    sprintsLoaded: boolean;
}

const initialState: SprintsSlice = {
    sprints: [],
    sprintsLoaded: false
}

export const sprintsSlice = createSlice({
    name: "sprintsSlice",
    initialState,
    reducers: {
        setSprints: (state, action: PayloadAction<Sprint[]>) => {
            state.sprints = action.payload;
            state.sprintsLoaded = true;
        },
    }
});

export const selectSprints = (state: RootState) => state.sprints.sprints;
export const selectSprintById = (id: number) => (state: RootState) => state.sprints.sprints.find((el) => el.id === id)!;
export const selectLoadedSprints = (state: RootState) => state.sprints.sprintsLoaded;
export const {setSprints} = sprintsSlice.actions;
