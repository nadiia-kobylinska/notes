import React from "react";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNoteListState } from "../../store/contexts/NoteListContext";
import { useViewModeState } from "../../store/contexts/ViewModeContext";
import { ViewMode } from "../../types/ViewMode";

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
export const FloatingActionBar: React.FC = () => {
    const [_, actionsNote] = useNoteListState();
    const [__, actionsViewMode] = useViewModeState();
    const onCreate = () => {
      actionsNote.onCreateNote();
      actionsViewMode.onChangeViewMode(null,ViewMode.CREATE);
    }
    return (
        <div className="fixed-button">
            <FloatingCreateButton onCreate={onCreate}/>
        </div>
    )
}
