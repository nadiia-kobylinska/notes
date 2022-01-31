import {Box, Button, Stack, Typography} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import LoadingButton from "@mui/lab/LoadingButton";
import CheckIcon from "@mui/icons-material/Check";
import {useEffect, useReducer} from "react";
import EditDiv from "../edit-div";
import calcCountChar from "../../utility/calc-count-char";
import cleanUpHTML from "../../utility/clean-up-html";
import formReducer from "./formReducer";
import RoundCounter from "../round-counter";
import {isValid} from "./func";

const Form = (props) => {

    const note = props.note;
    const [state, dispatch] = useReducer(formReducer, {
            loading: false,
            title: note ? note.title : '',
            content: note ? note.content : '',
            noteID: note ? note.id : props.id,
            countCharTitle: 0,
            percentCharTitle: 0,
            countCharContent: 0,
            percentCharContent: 0,
            isValid: false
        }, (initialState) => {
        return {...initialState, isValid: isValid(initialState)};
    });

    useEffect(()=>{
        if (!note) {
            resetForm();
            return;
        }
        if (note.id !== state.noteID) {
            dispatch({type: 'change', payload: {
                noteID: note.id,
                title: note.title,
                content: note.content
            }})
        }
    },[note,props.id]);

    function resetForm(){
        dispatch({type: 'reset', payload: {
            loading: false,
            title: '',
            content: '',
            noteID: props.id,
            countCharTitle: 0,
            percentCharTitle: 0,
            countCharContent: 0,
            percentCharContent: 0,
            isValid: false
        }});
    }
    function onSubmit(e) {
        e.preventDefault();
        const newNote = {
            id: state.noteID,
            title: state.title,
            content: state.content
        }
        resetForm();
        props.onSave(newNote);
    }
    function onChangeTitle(e){
        const countChar = calcCountChar(e.target.innerText, 100);
        // if (countChar.count<0){highlightOverlimit(e.target, e.target.innerText, countChar.count)}
        dispatch({type: 'change', payload: {
            countCharTitle: countChar.count,
            percentCharTitle:countChar.percent,
            title: e.target.innerText
        }})
    }
    function onChangeContent(e){
        const countChar = calcCountChar(e.target.innerText,1000);
        dispatch({type: 'change', payload: {
            countCharContent: countChar.count,
            percentCharContent:countChar.percent,
            content: cleanUpHTML(e.target.innerHTML)
        }})
    }
    const pageTitle = !state.noteID ? "New Note" : "Edit Note";

    return (
        <Box noValidate component="form" autoComplete="off" sx={{mt: 1, '& .MuiTextField-root': { m: 1, width: '100%' }}}
            onSubmit={onSubmit}
        >
            <Box sx={{display:'flex',justifyContent:'space-between',marginBottom:'1rem',mt:10, alignItems:'flex-start'}}>
                <Typography variant="h4" component="div" gutterBottom  className={"fi=orm-title"} sx={{ mb: 5}}>
                    {pageTitle}
                </Typography>
            </Box>
            <EditDiv
                type = "text"
                label = "Title"
                value = {state.title}
                noteID = {state.noteID}
                excess = {state.countCharTitle}
                changeEv = {onChangeTitle}
                counter = {<RoundCounter count={state.countCharTitle} percent={state.percentCharTitle}/>}
                focus = {true}
                highlighting={true}
            />
            <EditDiv
                type = "html"
                label = "Content"
                value = {state.content}
                noteID = {state.noteID}
                changeEv = {onChangeContent}
                counter = {<RoundCounter count={state.countCharContent} percent={state.percentCharContent}/>}
            />
            <Stack direction="row" spacing={4} sx={{mt: 3, justifyContent:'flex-end'}}>
                <Button aria-label="cancel" variant="text" color="secondary" startIcon={<CancelIcon />} onClick={props.onCancel}>
                    Cancel
                </Button>
                <LoadingButton
                    color="secondary"
                    onClick={onSubmit}
                    loading={state.loading}
                    loadingPosition="start"
                    startIcon={<CheckIcon />}
                    variant="contained"
                    disabled={!state.isValid}
                >
                    Save
                </LoadingButton>
            </Stack>
        </Box>
    );
}
export default Form;