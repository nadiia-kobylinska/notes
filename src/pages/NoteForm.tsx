import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import FormNote from "../components/NoteForm";
import Lobby from "../components/Lobby";
import { useParams } from "react-router-dom";
import { useViewModeState } from "../store/contexts/ViewModeContext";
import { ViewMode } from "../types/ViewMode";
import { useNoteListState } from "../store/contexts/NoteListContext";

function NoteForm() {

  const { id } = useParams();
  const [_, actions] = useViewModeState();
  const [__, actionsNote] = useNoteListState();
  useEffect(()=>{
    if (!!id) {
      actionsNote.onEditNote(+id);
      actions.onChangeViewMode(+id, ViewMode.EDIT);
    }else{
      actions.onChangeViewMode(null, ViewMode.PREVIEW);
    }
    },[id]);

  return (
    <Lobby>
      <Grid container spacing={5} columns={16}>
        <Grid item xs={16} md={11} className="col-wrp">
          <FormNote />
        </Grid>
      </Grid>
    </Lobby>
  );
}
export default NoteForm;
