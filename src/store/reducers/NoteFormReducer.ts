import { isValid } from '../../utils/validate';
import { Dispatcher, NoteFormEvent, NoteFormEventType, NoteFormState } from "../../types/NoteForm";

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

export const onChangeTitleForm = (dispatch: Dispatcher) => (title: string, countCharTitle: number, percentCharTitle: number): void =>
  dispatch({
    type: NoteFormEventType.ChangeTitleForm,
    title,
    countCharTitle,
    percentCharTitle
  });

export const onChangeContentForm = (dispatch: Dispatcher) => (content: string, countCharContent: number, percentCharContent: number): void =>
  dispatch({
    type: NoteFormEventType.ChangeContentForm,
    content,
    countCharContent,
    percentCharContent
  });


export const onUpdateForm = (dispatch: Dispatcher) => (id: number, title: string, content: string): void =>
  dispatch({
    type: NoteFormEventType.UpdateForm,
    id,
    title,
    content
  });

