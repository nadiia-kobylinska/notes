import * as React from 'react';
import Form from "./form-view";
import {useNoteListState} from "../../store/contexts/NoteListContext";
import {Box} from "@mui/material";

const FormNote = () => {
    const [state, actions] = useNoteListState();
    const note = state.notes.find((Note) => Note.id === state.editId) || null;
    return (
        <Box component="div" className="notes-create" sx={{ mb: 10 }}>
            <Form note={note} id={state.editId} onCancel={actions.onCancelEditNote} onSave={actions.onAddNote} onUpdate={actions.onUpdateNote}/>
        </Box>
    );
}
export default FormNote;