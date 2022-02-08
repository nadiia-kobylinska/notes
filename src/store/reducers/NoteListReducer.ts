import {Dispatcher, NoteListEvent, NoteListEventType, NoteListState} from "../../types/Note";
import {getNotesDS, setNotesDS} from "../../services/data.source";
import Mode from "../../types/Mode";

export const initialState: NoteListState = {
    notes: getNotesDS,
    editId: null,
    mode: !getNotesDS.length ? Mode.EMPTY : Mode.PREVIEW
};

export const NoteListReducer = (
    state: NoteListState,
    event: NoteListEvent
): NoteListState => {
    switch (event.type) {
        case NoteListEventType.AddNote: {
            const updatedNotes = [
                ...state.notes,
                {
                    id: Date.now(),
                    title: event.title,
                    content: event.content
                }
            ];
            setNotesDS(updatedNotes);
            return {
                ...state,
                notes: updatedNotes,
                mode: Mode.EDIT
            };
        }

        case NoteListEventType.RemoveNote: {
            const updatedNotes = state.notes.filter((Note) => Note.id !== event.id);
            setNotesDS(updatedNotes);
            return {
                ...state,
                notes: updatedNotes
            };
        }

        case NoteListEventType.EditNote: {
            return {
                ...state,
                editId: event.id,
                mode: Mode.EDIT
            };
        }

        case NoteListEventType.UpdateNote: {
            const updatedNotes = state.notes.map((Note) => Note.id === event.id
                    ? { ...Note, title: event.title, content: event.content }
                    : Note
                );
            setNotesDS(updatedNotes);

            return {
                editId: event.id,
                notes: updatedNotes,
                mode: Mode.PREVIEW
            };
        }
        case NoteListEventType.CancelEditNote: {
            return {
                ...state,
                editId: null,
                mode: state.notes.length ? Mode.PREVIEW : Mode.EMPTY

            };
        }
        case NoteListEventType.PreviewNote: {
            return {
                ...state,
                editId: event.id,
                mode: Mode.PREVIEW
            };
        }
        case NoteListEventType.CreateNote: {
            return {
                ...state,
                editId: Date.now(),
                mode: Mode.EDIT
            };
        }
    }
};

export const addNote = (dispatch: Dispatcher) => (title: string, content: string): void =>
    dispatch({
        type: NoteListEventType.AddNote,
        title,
        content
    });

export const removeNote = (dispatch: Dispatcher) => (id: number): void =>
    dispatch({
        type: NoteListEventType.RemoveNote,
        id
    });

export const editNote = (dispatch: Dispatcher) => (id: number): void =>
    dispatch({
        type: NoteListEventType.EditNote,
        id
    });

export const cancelEditNote = (dispatch: Dispatcher) => (): void =>
    dispatch({
        type: NoteListEventType.CancelEditNote
    });

export const updateNote = (dispatch: Dispatcher) => (
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

export const previewNote = (dispatch: Dispatcher) => (id: number): void =>
    dispatch({
        type: NoteListEventType.PreviewNote,
        id
    });

export const createNote = (dispatch: Dispatcher) => (): void =>
    dispatch({
        type: NoteListEventType.CreateNote
    });
