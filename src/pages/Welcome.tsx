import React from 'react';
import WelcomeScreen from '../components/WelcomeScreen';
import { useNoteListState } from '../store/contexts/NoteListContext';
import Lobby from '../components/Lobby';

function Welcome() {
  const [_, actions] = useNoteListState();
  return (
    <Lobby>
      <WelcomeScreen onCreate={actions.onCreateNote} headline="Welcome! <br/> You can create your first note." />
    </Lobby>
  );
}
export default Welcome;
