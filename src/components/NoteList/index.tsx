import {Box} from "@mui/material";
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
        <NoteCard note={note} key={i}
                  onPreviewNote={actions.onPreviewNote}
                  onEditNote={actions.onEditNote}
                  onRemoveNote={actions.onRemoveNote}
        />
    ));
    return (
        <Box className={classes.NoteListWrp}>
            {filtered}
        </Box>
    )

}
export default NoteList;