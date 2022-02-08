import React from "react";
import {Fab} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {useListState} from "../../store/contexts/NoteListContext";

export type FloatingActionBarProps = {
    readonly onCreate: () => void;
};

export const FloatingCreateButton: React.FC<FloatingActionBarProps> = ({onCreate}) => {
    return (
        <Fab color="secondary" aria-label="add" onClick={onCreate}>
            <AddIcon />
        </Fab>
    )
}
export const FloatingActionBar:React.FC = () => {
    const [_, actions] = useListState();
    return (
        <div className="fixed-button">
            <FloatingCreateButton onCreate={actions.createNote}/>
        </div>
    )
}
