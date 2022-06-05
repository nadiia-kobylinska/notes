import { useNoteFormState } from "../../store/contexts/NoteFormContext";
import { ChangeEvent, useEffect } from "react";
import calcCountChar, { highlightOverlimit } from "../../utils/calc-count-char";
import cleanUpHTML from "../../utils/clean-up-html";
import FormView from "./view";
import { useNoteListState } from "../../store/contexts/NoteListContext";
import { ViewMode } from "../../types/ViewMode";
import { useViewModeState } from "../../store/contexts/ViewModeContext";

const Form = () => {
    const [stateNote, actionsNote] = useNoteListState();
    const [state, actions] = useNoteFormState();
    const [_, actionsViewMode] = useViewModeState();
    const note = stateNote.notes.find((Note) => Note.id === stateNote.editId) || null;
    const PageTitle = !!note ? "Edit Note" : "New Note";

    useEffect(()=>{
      if (!note) {
        actions.onResetForm();
        return;
      }
      actions.onUpdateForm(note.id, note.title, note.content );
    },[note]);

    const onSubmit = () => {
      if (!!state.id){
        actionsNote.onUpdateNote(state.id, state.title, state.content)
      }else{
        actionsNote.onAddNote(state.title, state.content)
      }
      actions.onResetForm();
      actionsViewMode.onChangeViewMode(state.id, ViewMode.PREVIEW);
    }
    const onCancel = () => {
      actionsNote.onCancelEditNote();
      actionsViewMode.onChangeViewMode(state.id, ViewMode.PREVIEW);
    }
    function onChangeTitle(e:ChangeEvent<HTMLInputElement>){
      const countChar = calcCountChar(e.target.innerText, 100);
      if (countChar.count<0){
        highlightOverlimit(e.target, e.target.innerText, countChar.count)
      }
      actions.onChangeTitleForm(e.target.innerText, countChar.count, countChar.percent)
    }
    function onChangeContent(e:ChangeEvent<HTMLInputElement>){
      const countChar = calcCountChar(e.target.innerText,1000);
      actions.onChangeContentForm(cleanUpHTML(e.target.innerHTML), countChar.count, countChar.percent)
    }

    return (
      <FormView data={state}
                onSubmit={onSubmit}
                onCancel={onCancel}
                PageTitle={PageTitle}
                onChangeTitle={onChangeTitle}
                onChangeContent={onChangeContent} />
    );
}
export default Form;
