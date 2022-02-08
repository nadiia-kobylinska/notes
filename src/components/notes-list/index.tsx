import {Box} from "@mui/material";
import * as React from "react";
import NoteCard from "./note-card";
import {Note} from "../../types/Note";

type NoteList = {
    readonly notes:Note[]
}
const NoteList = (props:NoteList) => {
    const notes = props.notes || [];

    const filtered = notes.map((note, i) => <NoteCard note={note} key={i}/>);
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'column',
            mt: 3,
            minWidth:'100%'
        }}>
            {filtered}
        </Box>
    )

}
export default NoteList;