import {Box, Button, Stack, Typography} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import LoadingButton from "@mui/lab/LoadingButton";
import CheckIcon from "@mui/icons-material/Check";
import {useRef, useEffect, useReducer} from "react";
import EditDiv from "../edit-div";
import HTMLDiv from "../html-div";
import validateTextLength from "../../utility/validate-text-length";
import cleanUpHTML from "../../utility/clean-up-html";
import formReducer from "./formReducer";
import RoundCounter from "../round-counter";

const initialState = {
    loading: false,
    title: '',
    content: '',
    editMode: false,
    countCharTitle: 0,
    percentCharTitle: 0,
    countCharContent: 0,
    percentCharContent: 0
}
const Form = (props) => {

    const [state, dispatch] = useReducer(formReducer, initialState);

    let titleRef = useRef(null);
    let contentRef = useRef(null);

    useEffect(()=>{
        if (!props.id) {
            resetForm();
        }else if (props.id !== state.editMode) {
            dispatch({type: 'change', payload: { editMode: props.id}})
        }
    },[props.id]);

    useEffect(()=>{
        if (props.id && state.editMode && props.id === state.editMode) {
            const note = props.notes.filter(note => note.id === props.id)[0];
            dispatch({type: 'change', payload: {
                    content: note.content,
                    title: note.title
            }})
            titleRef.current.innerHTML = note.title;
            contentRef.current.innerHTML = note.content;
            titleRef.current.focus();
        }
    },[state.editMode]);

    function resetForm(){
        dispatch({type: 'change', payload: initialState})
        titleRef.current.innerHTML = '';
        contentRef.current.innerHTML = '';
        titleRef.current.focus();
    }
    function saveNote(e) {
        e.preventDefault();
        dispatch({type: 'change', payload: {loading: true}})
        try {
            const hasNoteIndex = props.notes.findIndex((obj => obj.id === state.editMode));
            props.save({
                    id: hasNoteIndex!==-1 ? state.editMode : Date.now(),
                    title: state.title || "No name",
                    content: state.content || "empty"
                }, hasNoteIndex);

            resetForm();
        } catch (error) {
            console.log(error)
        }
    }
    function changeTitle(e){
        const result = validateTextLength(e, e.target,100, titleRef);
        dispatch({type: 'change', payload: {
                countCharTitle: result.count,
                percentCharTitle:result.percent,
                title: e.target.innerText
        }})
    }
    function changeContent(e){
        cleanUpHTML(e.target,
            'iframe, script, noscript, frame, form, input, textarea',
            ['data-ga ','id','jsaction', 'jscontroller', 'onclick', 'data-ved', 'ping', 'data-google-query-id','itemprop']
        );
        const result = validateTextLength(e, e.target,1000, contentRef, false);
        dispatch({type: 'change', payload: {
            countCharContent: result.count,
            percentCharContent:result.percent,
            content: e.target.innerHTML
        }})
    }

    if (props.id && !state.editMode && props.id !== state.editMode){
        dispatch({type: 'change', payload: {editMode: props.id}})
    }
    const isDisabled = state.content === "" || state.title === "" || state.percentCharTitle>100 || state.percentCharContent>100;

    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{mt: 1, '& .MuiTextField-root': { m: 1, width: '100%' }}}
            onSubmit={saveNote}
        >
            <Box sx={{display:'flex',justifyContent:'space-between',marginBottom:'1rem',mt:10, alignItems:'flex-start'}}>
                <Typography
                    variant="h4"
                    component="div"
                    gutterBottom
                    className={"fi=orm-title"}
                    sx={{ mb: 5}}>
                    {!state.editMode ? "New Note" : "Edit Note"}
                </Typography>
            </Box>
            <EditDiv
                changeEv = {changeTitle}
                fieldRef = {titleRef}
                counter = <RoundCounter count={state.countCharTitle} percent={state.percentCharTitle}/>
            />
            <HTMLDiv
                changeEv = {changeContent}
                fieldRef = {contentRef}
                counter = <RoundCounter count={state.countCharContent} percent={state.percentCharContent}/>
            />
            <Stack direction="row" spacing={4} sx={{
                mt: 3,
                justifyContent:'flex-end'
            }}>
                <Button aria-label="cancel" variant="text" color="secondary" startIcon={<CancelIcon />} onClick={props.cancel}>
                    Cancel
                </Button>
                <LoadingButton
                    color="secondary"
                    onClick={saveNote}
                    loading={state.loading}
                    loadingPosition="start"
                    startIcon={<CheckIcon />}
                    variant="contained"
                    disabled={isDisabled}
                >
                    Save
                </LoadingButton>
            </Stack>
        </Box>
    );
}
export default Form;