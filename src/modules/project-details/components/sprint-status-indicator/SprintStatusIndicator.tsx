import {SprintStatus} from "../../models/sprint/sprint-status/sprint-status";
import {Badge} from "primereact/badge";
import React from "react";

export interface SprintStatusIndicatorProps {
    sprintStatus: SprintStatus;
}

export function SprintStatusIndicator(props: SprintStatusIndicatorProps) {
    if (props.sprintStatus === SprintStatus.OPEN) {
        return <Badge value="OPEN" className={"bg-primary-400 flex align-items-center justify-content-center"}
                      style={{width: "100px", height: "30px"}}></Badge>;
    }
    if (props.sprintStatus === SprintStatus.IN_PROGRESS) {
        return <Badge value="IN PROGRESS" className={"bg-primary-400 flex align-items-center justify-content-center"}
                      style={{width: "100px", height: "30px"}}></Badge>;
    }
    if (props.sprintStatus === SprintStatus.DONE) {
        return <Badge value="DONE" className={"bg-primary-400 flex align-items-center justify-content-center"}
                      style={{width: "100px", height: "30px"}}></Badge>;
    }
    return null;
}