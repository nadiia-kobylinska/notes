import NoteList from "../NoteList/";
import React, { useState } from 'react';
import {Stack, TextField, Grid} from "@mui/material";
import {useNoteListState} from "../../store/contexts/NoteListContext";
import {Note} from "../../types/Note";
import useStyles from "./styles";

const Search = ()=>{
    const classes = useStyles();
    const [state, _] = useNoteListState();

    const [searchField, setSearchField] = useState("");
    const notes:Note[] = state.notes || [];

    const filteredNotes:Note[] = notes.filter(
        note => {
            return (
                note.title.toLowerCase().includes(searchField.toLowerCase())
                || note.content.toLowerCase().includes(searchField.toLowerCase())
            );
        }
    );
    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => setSearchField(e.target.value);

    return (
        <Grid className={classes.SidebarColumn} item xs={16} md={5}>
            <Stack className={classes.SearchFieldWrp} spacing={2}>
                <TextField type="search" placeholder="Search" onChange={ onChange } variant="standard" />
            </Stack>
            <NoteList notes={filteredNotes}/>
        </Grid>
    );

}
export default Search;