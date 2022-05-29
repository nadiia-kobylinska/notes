import {Dispatcher, NoteListEvent, NoteListEventType, NoteListState} from "../../types/Note";
import {getNotesDS, setNotesDS} from "../../services/data.source";
import { ViewMode } from "../../types/ViewMode";

export const initialState: NoteListState = {
    notes: getNotesDS,
    editId: null,
    mode: ViewMode.PREVIEW
};

export const NoteListReducer = (
    state: NoteListState,
    event: NoteListEvent
): NoteListState => {
    switch (event.type) {
        case NoteListEventType.AddNote: {
            const id = Date.now();
            const updatedNotes = [
                {
                    id: id,
                    title: event.title,
                    content: event.content
                },
                ...state.notes
            ];
            return {
                ...state,
                notes: updatedNotes,
                editId: id,
                mode: ViewMode.PREVIEW
            };
        }

        case NoteListEventType.RemoveNote: {
            const updatedNotes = state.notes.filter((Note) => Note.id !== event.id);
            return {
                ...state,
                notes: updatedNotes
            };
        }

        case NoteListEventType.EditNote: {
            return {
                ...state,
                editId: event.id,
                mode: ViewMode.EDIT
            };
        }

        case NoteListEventType.UpdateNote: {
            const updatedNotes = state.notes.map((Note) => Note.id === event.id
                    ? { ...Note, title: event.title, content: event.content }
                    : Note
                );
            return {
                editId: event.id,
                notes: updatedNotes,
                mode: ViewMode.PREVIEW
            };
        }
        case NoteListEventType.CancelEditNote: {
            return {
                ...state,
                editId: null,
                mode: ViewMode.PREVIEW

            };
        }
        case NoteListEventType.PreviewNote: {
            return {
                ...state,
                editId: event.id,
                mode: ViewMode.PREVIEW
            };
        }
        case NoteListEventType.CreateNote: {
            return {
                ...state,
                editId: Date.now(),
                mode: ViewMode.CREATE
            };
        }
    }
};

export const onAddNote = (dispatch: Dispatcher) => (title: string, content: string): void =>
    dispatch({
        type: NoteListEventType.AddNote,
        title,
        content
    });

export const onRemoveNote = (dispatch: Dispatcher) => (id: number): void =>
    dispatch({
        type: NoteListEventType.RemoveNote,
        id
    });

export const onEditNote = (dispatch: Dispatcher) => (id: number): void =>
    dispatch({
        type: NoteListEventType.EditNote,
        id
    });

export const onCancelEditNote = (dispatch: Dispatcher) => (): void =>
    dispatch({
        type: NoteListEventType.CancelEditNote
    });

export const onUpdateNote = (dispatch: Dispatcher) => (
    id: number,
    title: string,
    content: string
): void =>
    dispatch({
        type: NoteListEventType.UpdateNote,
        id,
        title,
        content
    });

export const onPreviewNote = (dispatch: Dispatcher) => (id: number): void =>
    dispatch({
        type: NoteListEventType.PreviewNote,
        id
    });

export const onCreateNote = (dispatch: Dispatcher) => (): void =>
    dispatch({
        type: NoteListEventType.CreateNote
    });
