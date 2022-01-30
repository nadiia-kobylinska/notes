import * as React from 'react';
import './App.css';
import {Box, Fab, Grid} from '@mui/material';
import Container from '@mui/material/Container';
import AddIcon from '@mui/icons-material/Add';
import NotesManage from "./components/notes-manage";
import NoteDetail from "./components/note-detail";
import {getNotesDS, setNotesDS} from "./services/data.source";
import HeadlineButtonScreen from "./components/headline-button-screen";
import Search from "./components/search";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: getNotesDS,
            isEmpty: !getNotesDS.length,
            previewMode: getNotesDS.length>0,
            editMode: false,
            id: null
        }
        this.onCreate = this.onCreate.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.updateList = this.updateList.bind(this);
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
        this.onSave = this.onSave.bind(this);
        this.open = this.open.bind(this);
    }
    onCreate() {
        this.setState({
            isEmpty: false,
            editMode: true,
            id: Date.now(),
            previewMode: false
        });
    }
    onCancel() {
        this.setState({
            isEmpty: true,
            editMode: false,
            previewMode: true,
            id: null
        });
    }
    updateList(notes) {
        this.setState({
            notes: notes,
            id: Date.now()
        });
    }
    onSave(note) {
        let notes = this.state.notes;
        const index = notes.findIndex((obj => obj.id === note.id));

        if (index >= 0){
            notes[index] = note;
        }else{
            notes = [note, ...notes]
        }
        setNotesDS(notes);
        this.updateList(notes);
    }
    delete(event, id){
        event.stopPropagation();
        const notes = this.state.notes.filter(note => note.id !== id)
        setNotesDS(notes);

        this.setState((state)=>({
            notes: notes,
            id: id === state.id ? false : state.id,
            editMode: id !== state.id,
            previewMode:  id === state.id

        }));
    }
    edit(event, id){
        event.stopPropagation();
        this.setState({
            editMode: true,
            previewMode: false,
            id: id
        });
    }
    open(id){
        this.setState({
            editMode: false,
            previewMode: true,
            id: id
        });
    }
    render() {
        let openNote = {
            title : 'Empty',
            content : 'Choose a note to display.',
        }
        if (this.state.previewMode && this.state.id) {
            openNote = this.state.notes.find(note => note.id === this.state.id);
        }
        const note = this.state.notes.find(note => note.id === this.state.id);
        return (
            <div className="App">
                <Container maxWidth="lg">
                    {!this.state.notes.length && this.state.isEmpty  &&
                        <HeadlineButtonScreen
                            onCreate={this.onCreate}
                            headline={"Welcome! <br/> You can create your first note."}
                        />
                    }
                    {(this.state.notes.length || !this.state.isEmpty) &&
                        <Grid container spacing={5} columns={16}>
                            <Search notes={this.state.notes} delete={this.delete} edit={this.edit} open={this.open}/>

                            <Grid item xs={16} md={11} className={"col-wrp"}>
                                {((this.state.editMode || this.state.id) && !this.state.previewMode) &&
                                    <Box component="div" className={"notes-create"} sx={{ mb: 10 }}>
                                        <NotesManage
                                            onCancel={this.onCancel}
                                            id={this.state.id}
                                            note={note}
                                            onSave={this.onSave}
                                        />
                                    </Box>
                                }
                                {this.state.previewMode && <NoteDetail note={openNote} onCreate={this.onCreate}/>}
                            </Grid>

                        </Grid>
                    }
                </Container>
                <div className={"fixed-button"}>
                    <Fab color="secondary" aria-label="add" onClick={this.onCreate}>
                        <AddIcon/>
                    </Fab>
                </div>
            </div>
        );
    }
}

export default App;
