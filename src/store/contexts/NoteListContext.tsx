import React, { useContext, useState } from 'react';
import { cancelEditNote, addNote as addNote, editNote, initialState, removeNote, updateNote, previewNote, createNote } from '../reducers/NoteListReducer';
import { Dispatcher, NoteListState } from '../../types/Note';

export const NoteListContext = React.createContext<[NoteListState, Dispatcher]>([initialState, () => null]);

export const useListState = () => {
    const [state, dispatch] = useContext(NoteListContext)
    const [actions] = useState(() => ({
        addNote: addNote(dispatch),
        removeNote: removeNote(dispatch),
        editNote: editNote(dispatch),
        cancelEditNote: cancelEditNote(dispatch),
        updateNote: updateNote(dispatch),
        previewNote: previewNote(dispatch),
        createNote: createNote(dispatch)
    }))

    return [state, actions] as const;
}