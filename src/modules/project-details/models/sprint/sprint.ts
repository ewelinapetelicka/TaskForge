import {SprintStatus} from "./sprint-status/sprint-status";

export interface Sprint {
    id: number;
    projectId: number;
    name: string;
    status: SprintStatus
}