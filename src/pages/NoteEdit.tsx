import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import NoteEditForm from "../components/NoteEditForm";
import Lobby from "../components/Lobby";
import { useParams } from "react-router-dom";
import { useViewModeState } from "../store/contexts/ViewModeContext";
import { ViewMode } from "../types/ViewMode";
import { useNoteListState } from "../store/contexts/NoteListContext";

function NoteEdit() {
  const { id } = useParams();
  const [_, actions] = useViewModeState();
  const [__, actionsNote] = useNoteListState();
  useEffect(()=>{
    if (id !== undefined && id !== null){
      actionsNote.onEditNote(+id);
      actions.onChangeViewMode(+id, ViewMode.EDIT);
    }
  },[id])
  return (
    <Lobby>
      <Grid container spacing={5} columns={16}>
        <Grid item xs={16} md={11} className="col-wrp">
          <NoteEditForm />
        </Grid>
      </Grid>
    </Lobby>
  );
}
export default NoteEdit;
