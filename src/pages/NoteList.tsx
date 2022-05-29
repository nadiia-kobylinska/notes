import { Grid } from '@mui/material';
import React from 'react';
import Search from '../components/Search';
import Lobby from '../components/Lobby';

function NoteList() {
  return (
    <Lobby>
      <Grid container spacing={5} columns={16}>
        <Search />
      </Grid>
    </Lobby>
  );
}
export default NoteList;
