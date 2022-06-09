import { ChangeEvent } from "react";
import { useNavigate } from 'react-router-dom';
import { useNoteFormState } from "../../store/contexts/NoteFormContext";
import calcCountChar, { highlightOverlimit } from "../../utils/calc-count-char";
import cleanUpHTML from "../../utils/clean-up-html";
import FormView from "../Form/view";
import { useNoteListState } from "../../store/contexts/NoteListContext";
import { ViewMode } from "../../types/ViewMode";
import { useViewModeState } from "../../store/contexts/ViewModeContext";

const NoteCreateFormModel = () => {
    const [_, actionsNote] = useNoteListState();
    const [state, actions] = useNoteFormState();
    const [__, actionsViewMode] = useViewModeState();
    const navigate = useNavigate();

    const onSubmit = () => {
      actionsNote.onAddNote(state.title, state.content);
      actionsViewMode.onChangeViewMode(null, ViewMode.PREVIEW);
    }
    const onCancel = () => {
      actionsNote.onCancelEditNote();
      navigate(-1);
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
                PageTitle={"New Note"}
                onChangeTitle={onChangeTitle}
                onChangeContent={onChangeContent} />
    );
}
export default NoteCreateFormModel;
