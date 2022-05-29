import React, { useEffect, useReducer } from "react";
import {BrowserRouter} from 'react-router-dom';
import './App.css';
import { NoteListContext } from './store/contexts/NoteListContext';
import { initialState, NoteListReducer } from './store/reducers/NoteListReducer';
import { setNotesDS } from "./services/data.source";
import RouterConfig from './routes';
import { initialViewModeState, ViewModeReducer } from './store/reducers/ViewModeReducer';
import { ViewModeContext } from './store/contexts/ViewModeContext';

export const NoteListProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(NoteListReducer, initialState);
  useEffect(() => {
    setNotesDS(state.notes);
  }, [state.notes]);
  return <NoteListContext.Provider value={[state, dispatch]}>{children}</NoteListContext.Provider>;
};
export const ViewModeProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(ViewModeReducer, initialViewModeState);
  return <ViewModeContext.Provider value={[state, dispatch]}>{children}</ViewModeContext.Provider>;
};

function App() {
  return (
    <ViewModeProvider>
      <NoteListProvider>
        <BrowserRouter>
          <RouterConfig />
        </BrowserRouter>
      </NoteListProvider>
    </ViewModeProvider>
  );
}

export default App;
