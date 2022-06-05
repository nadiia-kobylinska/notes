import React, { useReducer } from 'react';
import Form from "./viewModel";
import {Box} from "@mui/material";
import useStyles from "./styles";
import { NoteFormContext } from "../../store/contexts/NoteFormContext";
import { initialState, NoteFormReducer } from "../../store/reducers/NoteFormReducer";

export const NoteFormProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(NoteFormReducer, initialState);
    return <NoteFormContext.Provider value={[state, dispatch]}>{children}</NoteFormContext.Provider>;
};
const FormNote = () => {
    const classes = useStyles();
    return (
      <NoteFormProvider>
        <Box component="div" className={classes.FormNoteWrp}>
            <Form/>
        </Box>
      </NoteFormProvider>
    );
}
export default FormNote;
