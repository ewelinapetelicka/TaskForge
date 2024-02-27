import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {Sprint} from "../../modules/project-details/models/sprint/sprint";
import {SprintStatus} from "../../modules/project-details/models/sprint/sprint-status/sprint-status";

interface SprintsSlice {
    sprints: Sprint[];
    sprintsLoaded: boolean;
    sprintDetails: Sprint | null;
}

const initialState: SprintsSlice = {
    sprints: [],
    sprintsLoaded: false,
    sprintDetails: null
}

export const sprintsSlice = createSlice({
    name: "sprintsSlice",
    initialState,
    reducers: {
        setSprints: (state, action: PayloadAction<Sprint[]>) => {
            state.sprints = action.payload;
            state.sprintsLoaded = true;
        },
        openDetailsSprint: (state, action: PayloadAction<Sprint>) => {
            state.sprintDetails = action.payload;
        },
        closeDetailsSprint: (state) => {
            state.sprintDetails = null;
        },
        addSprint: (state, action: PayloadAction<Sprint>) => {
            state.sprints.push(action.payload);
        },
        editSprint: (state, action: PayloadAction<Sprint>) => {
            state.sprints = state.sprints.map((el) => {
                if (el.id === action.payload.id) {
                    return action.payload
                }
                return el;
            });
        }
    }
});

export const selectSprints = (state: RootState) => state.sprints.sprints;
export const selectSprintById = (id: number | null) => (state: RootState) => state.sprints.sprints.find((el) => el.id === id)!;
export const selectLoadedSprints = (state: RootState) => state.sprints.sprintsLoaded;
export const selectUndoneSprints = (state: RootState) => state.sprints.sprints.filter((sprint) => sprint.status !== SprintStatus.DONE);
export const selectInProgressSprint = (state: RootState) => state.sprints.sprints.find((sprint) => sprint.status === SprintStatus.IN_PROGRESS);
export const selectHasSprintInProgress = (state: RootState) => !!state.sprints.sprints.find((sprint) => sprint.status === SprintStatus.IN_PROGRESS);
export const selectSprintDetailOpen = (state: RootState) => state.sprints.sprintDetails !== null;
export const selectSprintDetail = (state: RootState) => state.sprints.sprintDetails as Sprint;
export const {setSprints, openDetailsSprint, closeDetailsSprint, addSprint, editSprint} = sprintsSlice.actions;
