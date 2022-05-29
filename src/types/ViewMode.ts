export enum ViewMode {
  PREVIEW = 'PREVIEW',
  EDIT = 'EDIT',
  EMPTY = 'EMPTY'
}
export enum ViewModeEventType {
  ChangeViewMode = 'ChangeViewMode'
}
export type ChangeViewModeEvent = {
  readonly type: ViewModeEventType.ChangeViewMode;
  readonly mode: ViewMode;
  readonly id: number | null;
};
export type ViewModeEvent =
  | ChangeViewModeEvent;

export type ViewModeState = {
  readonly id: number | null;
  readonly mode: ViewMode;
};
export type Dispatcher = (event: ViewModeEvent) => void;
