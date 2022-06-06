import { isValid } from '../../utils/validate';
import { Dispatcher, NoteFormEvent, NoteFormEventType, NoteFormState } from "../../types/NoteForm";
import calcCountChar, { highlightOverlimit } from "../../utils/calc-count-char";
import cleanUpHTML from "../../utils/clean-up-html";

export const initialState: NoteFormState = {
  loading: false,
  title: '',
  content: '',
  id: null,
  countCharTitle: 0,
  percentCharTitle: 0,
  countCharContent: 0,
  percentCharContent: 0,
  isValid: false
}

export const NoteFormReducer = (
  state: NoteFormState,
  event: NoteFormEvent
): NoteFormState => {
  switch (event.type) {
    case NoteFormEventType.ResetForm: {
      return {
        ...event
      };
    }
    case NoteFormEventType.ChangeTitleForm: {
      const nextState = {
        ...state,
        title: event.title,
        countCharTitle: event.countCharTitle,
        percentCharTitle: event.percentCharTitle
      };
      return {
        ...nextState, isValid: isValid(nextState)
      }
    }
    case NoteFormEventType.ChangeContentForm: {
      const nextState = {
        ...state,
        content: event.content,
        countCharContent: event.countCharContent,
        percentCharContent: event.percentCharContent
      };
      return {
        ...nextState, isValid: isValid(nextState)
      }
    }
    case NoteFormEventType.UpdateForm: {
      const nextState = {
        ...state,
        id: event.id,
        title: event.title,
        content: event.content
      };
      return {
        ...nextState, isValid: isValid(nextState)
      }
    }
  }
};

export const onResetForm = (dispatch: Dispatcher) => (): void =>
  dispatch({
    type: NoteFormEventType.ResetForm,
    ...initialState
  });

export const onChangeTitleForm = (dispatch: Dispatcher) => (target:HTMLInputElement, limit:number): void =>{
  const countChar = calcCountChar(target.innerText, limit);
  highlightOverlimit(target, target.innerText, countChar.count);

  dispatch({
    type: NoteFormEventType.ChangeTitleForm,
    title: target.innerText,
    countCharTitle: countChar.count,
    percentCharTitle: countChar.percent
  });
}

export const onChangeContentForm = (dispatch: Dispatcher) => (target:HTMLInputElement, limit:number): void => {
  const countChar = calcCountChar(target.innerText,limit);

  dispatch({
    type: NoteFormEventType.ChangeContentForm,
    content: cleanUpHTML(target.innerHTML),
    countCharContent: countChar.count,
    percentCharContent: countChar.percent
  });
}

export const onUpdateForm = (dispatch: Dispatcher) => (id: number, title: string, content: string): void =>
  dispatch({
    type: NoteFormEventType.UpdateForm,
    id,
    title,
    content
  });

