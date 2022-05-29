import * as React from 'react';
import Form from "./FormView";
import {useNoteListState} from "../../store/contexts/NoteListContext";
import {Box} from "@mui/material";
import { NoteFormContext } from "../../store/contexts/NoteFormContext";
import { useReducer } from "react";
import { initialState, NoteFormReducer } from "../../store/reducers/NoteFormReducer";
import useStyles from "./styles";

export const NoteFormProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(NoteFormReducer, initialState);
    return <NoteFormContext.Provider value={[state, dispatch]}>{children}</NoteFormContext.Provider>;
};
const FormNote = () => {
    const [state, actions] = useNoteListState();
    const note = state.notes.find((Note) => Note.id === state.editId) || null;
    const classes = useStyles();
    const PageTitle = !!note ? "Edit Note" : "New Note";

    return (
      <NoteFormProvider>
        <Box component="div" className={classes.FormNoteWrp}>
            <Form note={note} PageTitle={PageTitle} onCancel={actions.onCancelEditNote} onSave={actions.onAddNote} onUpdate={actions.onUpdateNote}/>
        </Box>
      </NoteFormProvider>
    );
}
export default FormNote;
