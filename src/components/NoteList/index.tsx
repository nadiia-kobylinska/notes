import { Box, Grid } from "@mui/material";
import * as React from "react";
import NoteCard from "./NoteCard";
import {Note} from "../../types/Note";
import useStyles from "./styles";
import {useNoteListState} from "../../store/contexts/NoteListContext";

type NoteList = {
    readonly notes:Note[]
}
const NoteList = (props:NoteList) => {
    const classes = useStyles();
    const notes = props.notes || [];
    const [_, actions] = useNoteListState();

    const filtered = notes.map((note, i) => (
      <Grid item xs={16} md={4} key={i}>
          <NoteCard note={note}
                  onPreviewNote={actions.onPreviewNote}
                  onEditNote={actions.onEditNote}
                  onRemoveNote={actions.onRemoveNote}
        />
      </Grid>
    ));
    return (
        <Box className={classes.NoteListWrp}>
            <Grid container spacing={2}>
                {filtered}
            </Grid>
        </Box>
    )

}
export default NoteList;
