export enum NoteFormEventType {
  ResetForm = 'ResetForm',
  ChangeTitleForm = 'ChangeTitleForm',
  ChangeContentForm = 'ChangeContentForm',
  UpdateForm = 'UpdateForm'
}

export type ResetFormEvent = {
  readonly type: NoteFormEventType.ResetForm;
  readonly loading: boolean;
  readonly title: string;
  readonly content: string;
  readonly id: number | null;
  readonly countCharTitle: number;
  readonly percentCharTitle: number;
  readonly countCharContent: number;
  readonly percentCharContent: number;
  readonly isValid: boolean;
};

export type ChangeTitleFormEvent = {
  readonly type: NoteFormEventType.ChangeTitleForm;
  readonly title: string;
  readonly countCharTitle: number;
  readonly percentCharTitle: number;
};

export type ChangeContentFormEvent = {
  readonly type: NoteFormEventType.ChangeContentForm;
  readonly content: string;
  readonly countCharContent: number;
  readonly percentCharContent: number;
};

export type UpdateFormEvent = {
  readonly type: NoteFormEventType.UpdateForm;
  readonly id: number;
  readonly title: string;
  readonly content: string;
};

export type NoteFormEvent =
    | ResetFormEvent
    | ChangeTitleFormEvent
    | ChangeContentFormEvent
    | UpdateFormEvent;

export type NoteFormState = {
  readonly loading: boolean;
  readonly title: string;
  readonly content: string;
  readonly id: number | null;
  readonly countCharTitle: number;
  readonly percentCharTitle: number;
  readonly countCharContent: number;
  readonly percentCharContent: number;
  readonly isValid: boolean;
};
export type Dispatcher = (event: NoteFormEvent) => void;
