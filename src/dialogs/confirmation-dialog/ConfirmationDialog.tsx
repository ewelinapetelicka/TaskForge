import {confirmDialog, ConfirmDialog} from "primereact/confirmdialog";
import {ReactNode} from "react";

export interface ConfirmModalProps {
    button: ReactNode;
    accept: () => void;
    reject?: () => void;
    message: string;
    header: string;
}

export function ConfirmationDialog(props: ConfirmModalProps) {
    const confirm = () => {
        confirmDialog({
            message: props.message,
            header: props.header,
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            reject: props.reject,
            accept: props.accept,
        });
    };

    return (
        <>
            <ConfirmDialog/>
            <div className="card flex flex-wrap gap-2 justify-content-center" onClick={() => confirm()}>
                {props.button}
            </div>
        </>
    )
}