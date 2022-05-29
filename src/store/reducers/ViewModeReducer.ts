import {
  Dispatcher,
  ViewMode,
  ViewModeEvent,
  ViewModeEventType,
  ViewModeState
} from "../../types/ViewMode";

export const initialViewModeState: ViewModeState = {
  id: null,
  mode: ViewMode.PREVIEW
}

export const ViewModeReducer = (
  state: ViewModeState,
  event: ViewModeEvent
): ViewModeState => {
  switch (event.type) {
    case ViewModeEventType.ChangeViewMode: {
      return {
        mode: event.mode,
        id: event.id
      };
    }
  }
};

export const onChangeViewMode = (dispatch: Dispatcher) => (id:number | null, mode: ViewMode): void =>
  dispatch({
    type: ViewModeEventType.ChangeViewMode,
    mode: mode,
    id: id
  });
