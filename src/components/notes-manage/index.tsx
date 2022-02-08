import * as React from 'react';
import Form from "./form-view";
import {useListState} from "../../store/contexts/NoteListContext";

const NotesManage = () => {
    const [state, actions] = useListState();
    const note = state.notes.find((Note) => Note.id === state.editId) || null;
    return (
        <Form note={note} id={state.editId} onCancel={actions.cancelEditNote} onSave={actions.addNote} onUpdate={actions.updateNote}/>
    );
}
export default NotesManage;