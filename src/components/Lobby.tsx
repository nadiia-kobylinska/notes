import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import HeadlineButtonScreen from './headline-button-screen/index.js';
import PreviewNote from './note-detail/index.js';
import NotesManage from './notes-manage';
import Search from './search/index.js';
import { useListState } from '../store/contexts/NoteListContext';
import Mode from '../types/Mode';
import { FloatingActionBar } from './FloatingActionBar/FloatingActionBar';

function Lobby() {
  const [state, actions] = useListState();
  return (
    <>
      <Container maxWidth="lg">
        {state.mode === Mode.EMPTY
          && (
            <HeadlineButtonScreen
              onCreate={actions.createNote}
              headline="Welcome! <br/> You can create your first note."
            />
          )}
        {state.mode !== Mode.EMPTY && (
          <Grid container spacing={5} columns={16}>
            <Search />
            <Grid item xs={16} md={11} className="col-wrp">
              {state.mode === Mode.EDIT && (
                <Box component="div" className="notes-create" sx={{ mb: 10 }}>
                  <NotesManage />
                </Box>
              )}
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
