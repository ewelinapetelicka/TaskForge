import {TaskType} from "../../../models/task/task-type/task-type";
import {Circle} from "@mui/icons-material";
import React from "react";

export function colorTypeTask(task: string) {
    if (task === TaskType.STORY) {
        return <Circle color={"success"}></Circle>;
    }
    if (task === TaskType.BUG) {
        return <Circle color={"error"}></Circle>;
    }
    if (task === TaskType.TECHNICAL_TASK) {
        return <Circle color={"info"}></Circle>;
    }
}