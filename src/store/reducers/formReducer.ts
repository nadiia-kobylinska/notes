import { isValid } from '../../components/notes-manage/func';
import {CHANGE_CONTENT_FORM, CHANGE_TITLE_FORM, RESET_FORM, UPDATE_DATA_FORM} from "../actionTypes";
import {Note} from "../../types/Note";

type State  = {
  loading: boolean,
  title: string,
  content: string,
  id: number | null,
  countCharTitle: number,
  percentCharTitle: number,
  countCharContent: number,
  percentCharContent: number,
  isValid: boolean
}
type ChangeTitleState  = {
  title: string,
  countCharTitle: number,
  percentCharTitle: number
}
type ChangeContentState  = {
  content: string,
  countCharContent: number,
  percentCharContent: number
}

type Action = { type: typeof RESET_FORM, payload: State }
    | { type: typeof CHANGE_TITLE_FORM, payload: ChangeTitleState}
    | { type: typeof CHANGE_CONTENT_FORM, payload: ChangeContentState}
    | { type: typeof CHANGE_CONTENT_FORM, payload: ChangeContentState}
    | { type: typeof UPDATE_DATA_FORM, payload: Note}

function formReducer(state:State, action:Action) {
  switch (action.type) {
    case RESET_FORM:
      return { ...state, ...action.payload };
    case CHANGE_TITLE_FORM: {
      const nextState = { ...state, ...action.payload };
      return ({ ...nextState, isValid: isValid(nextState) });
    }
    case CHANGE_CONTENT_FORM: {
      const nextState = { ...state, ...action.payload };
      return ({ ...nextState, isValid: isValid(nextState) });
    }
    case UPDATE_DATA_FORM: {
      const nextState = { ...state, ...action.payload };
      return ({ ...nextState, isValid: isValid(nextState) });
    }
    default:
      return state;
  }
}

export default formReducer;
