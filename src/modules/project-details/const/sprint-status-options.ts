import {Option} from "../../../models/option/option";
import {SprintStatus} from "../models/sprint/sprint-status/sprint-status";

export const sprintStatusOptions: Option<SprintStatus>[] = [
    {label: "Done", value: SprintStatus.DONE},
    {label: "In progress", value: SprintStatus.IN_PROGRESS},
    {label: "Open", value: SprintStatus.OPEN}
]