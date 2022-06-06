import { useNoteFormState } from "../../store/contexts/NoteFormContext";
import { ChangeEvent, useEffect } from "react";
import FormView from "../Form/view";
import { useNoteListState } from "../../store/contexts/NoteListContext";
import { ViewMode } from "../../types/ViewMode";
import { useViewModeState } from "../../store/contexts/ViewModeContext";

const NoteEditFormModel = () => {
    const [stateNote, actionsNote] = useNoteListState();
    const [state, actions] = useNoteFormState();
    const [_, actionsViewMode] = useViewModeState();
    const note = stateNote.notes.find((Note) => Note.id === stateNote.editId) || null;

    useEffect(()=>{
      if (!note) {
        actionsViewMode.onChangeViewMode(null, ViewMode.PREVIEW);
        return;
      }
      actions.onUpdateForm(note.id, note.title, note.content );
    },[stateNote]);

    const onSubmit = () => {
      if (!!state.id){
        actionsNote.onUpdateNote(state.id, state.title, state.content)
      }
      actions.onResetForm();
      actionsViewMode.onChangeViewMode(state.id, ViewMode.PREVIEW);
    }
    const onCancel = () => {
      actionsNote.onCancelEditNote();
      actionsViewMode.onChangeViewMode(state.id, ViewMode.PREVIEW);
    }
    return (
      <FormView data={state}
                onSubmit={onSubmit}
                onCancel={onCancel}
                PageTitle="Edit Note"
                onChangeTitle={(e:ChangeEvent<HTMLInputElement>) => actions.onChangeTitleForm(e.target, 100)}
                onChangeContent={(e:ChangeEvent<HTMLInputElement>) => actions.onChangeContentForm(e.target, 1000)} />
    );
}
export default NoteEditFormModel;
