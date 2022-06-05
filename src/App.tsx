import React, { useEffect, useReducer } from "react";
import './App.css';
import Lobby from './components/Lobby';
import { NoteListContext } from './store/contexts/NoteListContext';
import { initialState, NoteListReducer } from './store/reducers/NoteListReducer';
import { setNotesDS } from "./services/data.source";

export const NoteListProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(NoteListReducer, initialState);
  useEffect(() => {
    setNotesDS(state.notes);
  }, [state.notes]);
  return <NoteListContext.Provider value={[state, dispatch]}>{children}</NoteListContext.Provider>;
};
function App() {
  return (
    <NoteListProvider>
      <Lobby />
    </NoteListProvider>
  );
}

export default App;
