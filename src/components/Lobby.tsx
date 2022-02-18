import React from 'react';
import { Container, Grid } from '@mui/material';
import WelcomeScreen from './WelcomeScreen';
import PreviewNote from './NoteView';
import FormNote from './NoteForm';
import Search from './Search';
import { useNoteListState } from '../store/contexts/NoteListContext';
import Mode from '../types/Mode';
import { FloatingActionBar } from './FloatingActionBar/FloatingActionBar';

function Lobby() {
  const [state, actions] = useNoteListState();
  return (
    <>
      <Container maxWidth="lg">
        {state.mode === Mode.EMPTY
            && <WelcomeScreen onCreate={actions.onCreateNote} headline="Welcome! <br/> You can create your first note." />}
        {state.mode !== Mode.EMPTY
          && (
            <Grid container spacing={5} columns={16}>
              <Search />
              <Grid item xs={16} md={11} className="col-wrp">
                {state.mode === Mode.EDIT && <FormNote />}
                {state.mode === Mode.PREVIEW && <PreviewNote />}
              </Grid>
            </Grid>
          )}
      </Container>
      <FloatingActionBar />
    </>
  );
}
export default Lobby;
