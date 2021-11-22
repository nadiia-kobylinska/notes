import * as React from 'react';
import './App.css';
import {Box, Fab} from '@mui/material';
import Container from '@mui/material/Container';
import AddIcon from '@mui/icons-material/Add';
import NotesManage from "./components/notes-manage";
import NoteList from "./components/notes-list";
import NoteDetail from "./components/note-detail";
import {getNotesDS, setNotesDS} from "./services/data.source";
import HeadlineButtonScreen from "./components/headline-button-screen";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: getNotesDS,
            isEmpty: !getNotesDS.length,
            previewMode: getNotesDS.length>0,
            editMode: false,
            id: false
        }
        this.create = this.create.bind(this);
        this.cancel = this.cancel.bind(this);
        this.updateList = this.updateList.bind(this);
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
        this.save = this.save.bind(this);
        this.open = this.open.bind(this);
    }
    create() {
        this.setState({
            isEmpty: false,
            editMode: true,
            id: false,
            previewMode: false
        });
    }
    cancel() {
        this.setState({
            isEmpty: true,
            editMode: false,
            previewMode: true,
            id: false
        });
    }
    updateList(notes) {
        this.setState({
            notes: notes,
            id: false
        });
    }
    save(note, index) {
        let notes = this.state.notes;
        if (index >= 0){
            notes[index] = note;
        }else{
            notes = [ ...notes, note]
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
            id: false,
            editMode: !state.id,
            previewMode: !!state.id
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
        return (
            <div className="App">
                <Container maxWidth="lg">
                    {!this.state.notes.length && this.state.isEmpty  &&
                        <HeadlineButtonScreen
                            create={this.create}
                            headline={"Welcome! <br/> You can create your first note."}
                        />
                    }
                    {(this.state.notes.length || !this.state.isEmpty) &&
                        <Box sx={{display: 'flex', width:'100%'}}>
                            <NoteList notes={this.state.notes} delete={this.delete} edit={this.edit} open={this.open}/>
                            <Box component="div" sx={{
                                maxWidth:'100%',
                                overflow:'hidden',
                                width:'100%'
                            }}>
                                {((this.state.editMode || this.state.id) && !this.state.previewMode) &&
                                    <Box component="div" className={"notes-create"}
                                         sx={{
                                             mb: 10
                                         }}>
                                        <NotesManage
                                            id={this.state.id}
                                            cancel={this.cancel}
                                            notes={this.state.notes}
                                            save={this.save}
                                        />
                                    </Box>
                                }
                                {this.state.previewMode && <NoteDetail note={openNote}/>}
                            </Box>
                        </Box>
                    }
                </Container>
                <div className={"fixed-button"}>
                    <Fab color="secondary" aria-label="add" onClick={this.create}>
                        <AddIcon/>
                    </Fab>
                </div>
            </div>
        );
    }
}

export default App;
