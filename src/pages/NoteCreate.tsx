import { Grid } from "@mui/material";
import React from "react";
import NoteCreateForm from "../components/NoteCreateForm";
import Lobby from "../components/Lobby";

function NoteCreate() {
  return (
    <Lobby>
      <Grid container spacing={5} columns={16}>
        <Grid item xs={16} md={11} className="col-wrp">
          <NoteCreateForm />
        </Grid>
      </Grid>
    </Lobby>
  );
}
export default NoteCreate;
