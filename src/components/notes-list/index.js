import {Box} from "@mui/material";
import * as React from "react";
import NotePreview from "./note-view";


const NoteList = (props) => {
    const notes = props.notes || [];

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'column',
            mt: 10,
            pr:5,
            minWidth:'fit-content'
        }}>
            {notes.map((note, i) =>
                <NotePreview data={note} key={i} delete={props.delete} edit={props.edit} open={props.open}/>
            )}
        </Box>
    )

}
export default NoteList;