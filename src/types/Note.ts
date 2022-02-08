import Mode from './Mode';

export type Note = {
  readonly id: number;
  readonly title: string;
  readonly content: string;
};
export enum NoteListEventType {
  AddNote = 'AddNote',
  RemoveNote = 'RemoveNote',
  EditNote = 'EditNote',
  CancelEditNote = 'CancelEditNote',
  UpdateNote = 'UpdateNote',
  PreviewNote = 'PreviewNote',
  CreateNote = 'CreateNote'
}

export type AddNoteEvent = {
  readonly type: NoteListEventType.AddNote;
  readonly title: string;
  readonly content: string;
};

export type RemoveNoteEvent = {
  readonly type: NoteListEventType.RemoveNote;
  readonly id: number;
};

export type EditNoteEvent = {
  readonly type: NoteListEventType.EditNote;
  readonly id: number;
};

export type CancelEditNoteEvent = {
  readonly type: NoteListEventType.CancelEditNote;
};

export type UpdateNoteEvent = {
  readonly type: NoteListEventType.UpdateNote;
  readonly id: number;
  readonly title: string;
  readonly content: string;
};

export type PreviewNoteEvent = {
  readonly type: NoteListEventType.PreviewNote;
  readonly id: number;
};
export type CreateNoteEvent = {
  readonly type: NoteListEventType.CreateNote;
};

export type NoteListEvent =
    | AddNoteEvent
    | RemoveNoteEvent
    | EditNoteEvent
    | UpdateNoteEvent
    | CancelEditNoteEvent
    | CreateNoteEvent
    | PreviewNoteEvent;

export type NoteListState = {
  readonly notes: readonly Note[];
  readonly editId: number | null;
  readonly mode: Mode;
};
export type Dispatcher = (event: NoteListEvent) => void;
