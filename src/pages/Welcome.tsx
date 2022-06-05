import React from 'react';
import WelcomeScreen from '../components/WelcomeScreen';
import { useNoteListState } from '../store/contexts/NoteListContext';
import Lobby from '../components/Lobby';
import { useViewModeState } from "../store/contexts/ViewModeContext";
import { ViewMode } from "../types/ViewMode";

function Welcome() {
  const [_, actionsNote] = useNoteListState();
  const [__, actionsViewMode] = useViewModeState();
  const onCreate = () => {
    actionsNote.onCreateNote();
    actionsViewMode.onChangeViewMode(null,ViewMode.CREATE);
  }
  return (
    <Lobby>
      <WelcomeScreen onCreate={onCreate} headline="Welcome! <br/> You can create your first note." />
    </Lobby>
  );
}
export default Welcome;
