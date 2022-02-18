import React, { useContext, useState } from 'react';
import { onCancelEditNote, onAddNote, onEditNote, initialState, onRemoveNote, onUpdateNote, onPreviewNote, onCreateNote } from '../reducers/NoteListReducer';
import { Dispatcher, NoteListState } from '../../types/Note';

export const NoteListContext = React.createContext<[NoteListState, Dispatcher]>([initialState, () => null]);

export const useNoteListState = () => {
    const [state, dispatch] = useContext(NoteListContext)
    const [actions] = useState(() => ({
        onAddNote: onAddNote(dispatch),
        onRemoveNote: onRemoveNote(dispatch),
        onEditNote: onEditNote(dispatch),
        onCancelEditNote: onCancelEditNote(dispatch),
        onUpdateNote: onUpdateNote(dispatch),
        onPreviewNote: onPreviewNote(dispatch),
        onCreateNote: onCreateNote(dispatch)
    }))

    return [state, actions] as const;
}