import React, { useContext, useState } from 'react';
import {
    initialState,
    onChangeContentForm,
    onChangeTitleForm,
    onResetForm,
    onUpdateForm
} from "../reducers/NoteFormReducer";
import { Dispatcher, NoteFormState } from '../../types/NoteForm';

export const NoteFormContext = React.createContext<[NoteFormState, Dispatcher]>([initialState, () => null]);

export const useNoteFormState = () => {
    const [state, dispatch] = useContext(NoteFormContext)
    const [actions] = useState(() => ({
        onResetForm: onResetForm(dispatch),
        onChangeTitleForm: onChangeTitleForm(dispatch),
        onChangeContentForm: onChangeContentForm(dispatch),
        onUpdateForm: onUpdateForm(dispatch)
    }))

    return [state, actions] as const;
}
