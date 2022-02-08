import NoteList from "../notes-list/";
import React, { useState } from 'react';
import {Stack, TextField, Grid} from "@mui/material";
import {useListState} from "../../store/contexts/NoteListContext";

const Search = ()=>{
    const [state, _] = useListState();

    const [searchField, setSearchField] = useState("");
    const notes = state.notes || [];

    const filteredNotes = notes.filter(
        note => {
            return (
                note.title.toLowerCase().includes(searchField.toLowerCase())
                || note.content.toLowerCase().includes(searchField.toLowerCase())
            );
        }
    );
    const handleChange = e => setSearchField(e.target.value);

    return (
        <Grid item xs={16} md={5} sx={{
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'column',
            mt: 10,
            mb: 10,
            width:'100%'
        }}>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <TextField type = "search" placeholder = "Search" onChange = {handleChange} variant="standard" />
            </Stack>
            <NoteList notes={filteredNotes}/>
        </Grid>
    );

}
export default Search;