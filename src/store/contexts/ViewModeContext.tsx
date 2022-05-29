import React, { useContext, useState } from 'react';
import { initialViewModeState, onChangeViewMode } from "../reducers/ViewModeReducer";
import { Dispatcher, ViewModeState } from '../../types/ViewMode';

export const ViewModeContext = React.createContext<[ViewModeState, Dispatcher]>([initialViewModeState, () => null]);

export const useViewModeState = () => {
    const [state, dispatch] = useContext(ViewModeContext)
    const [actions] = useState(() => ({
        onChangeViewMode: onChangeViewMode(dispatch)
    }))

    return [state, actions] as const;
}
