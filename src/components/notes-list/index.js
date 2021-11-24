import {Box} from "@mui/material";
import * as React from "react";
import NotePreview from "./note-preview";

const NoteList = (props) => {
    const notes = props.notes || [];

    const filtered = notes.map((note, i) => <NotePreview data={note} key={i} delete={props.delete} edit={props.edit} open={props.open}/>);
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