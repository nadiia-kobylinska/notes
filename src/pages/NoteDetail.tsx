import { Grid } from '@mui/material';
import React, { useEffect } from "react";
import PreviewNote from '../components/NoteView';
import Lobby from '../components/Lobby';
import { useParams } from "react-router-dom";
import { useViewModeState } from "../store/contexts/ViewModeContext";
import { useNoteListState } from "../store/contexts/NoteListContext";
import { ViewMode } from "../types/ViewMode";

function NoteDetail() {
  const { id } = useParams();
  const [_, actions] = useViewModeState();
  const [__, actionsNote] = useNoteListState();

  useEffect(()=>{
    if (!!id){
      actionsNote.onPreviewNote(+id);
      actions.onChangeViewMode(+id, ViewMode.PREVIEW);
    }else{
      actions.onChangeViewMode(null, ViewMode.PREVIEW);
    }
  },[id]);

  return (
    <Lobby>
      <Grid container spacing={5} columns={16}>
        <Grid item xs={16} md={11} className="col-wrp">
          <PreviewNote />
        </Grid>
      </Grid>
    </Lobby>
  );
}
export default NoteDetail;
