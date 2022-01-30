import {Box, Button, Stack, Typography} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import LoadingButton from "@mui/lab/LoadingButton";
import CheckIcon from "@mui/icons-material/Check";
import {useEffect, useReducer} from "react";
import EditDiv from "../edit-div";
import validateTextLength from "../../utility/validate-text-length";
import cleanUpHTML from "../../utility/clean-up-html";
import formReducer from "./formReducer";
import RoundCounter from "../round-counter";
import {isValid} from "./func";

const Form = (props) => {

    const note = props.note;

    const initialState = {
        loading: false,
        title: note?.title ?? '',
        content: note?.content ?? '',
        editNote: note?.id ?? null,
        countCharTitle: 0,
        percentCharTitle: 0,
        countCharContent: 0,
        percentCharContent: 0,
        isValid: false
    }

    const [state, dispatch] = useReducer(formReducer, initialState, (initialState) => {
        return {...initialState, isValid: isValid(initialState)};
    });

    useEffect(()=>{
        if (!note) {
            resetForm();
            return;
        }
        if (note.id !== state.editNote) {
            dispatch({type: 'change', payload: {...initialState,
                editNote: note.id,
                title: note.title,
                content: note.content
            }})
        }
    },[note]);

    function resetForm(){
        dispatch({type: 'reset', payload: initialState});
    }
    function onSubmit(e) {
        e.preventDefault();
        dispatch({type: 'loading', payload: {loading: true}})
        props.onSave({
            title: state.title,
            content: state.content
        }, state.editNote);

        resetForm();
    }
    function onChangeTitle(e){
        const result = validateTextLength(e,100);
        dispatch({type: 'change', payload: {
                countCharTitle: result.count,
                percentCharTitle:result.percent,
                title: e.target.innerText
        }})
    }
    function onChangeContent(e){
        cleanUpHTML(e.target,
            'iframe, script, noscript, frame, form, input, textarea',
            ['data-ga ','id','jsaction', 'jscontroller', 'onclick', 'data-ved', 'ping', 'data-google-query-id','itemprop']
        );
        const result = validateTextLength(e,1000, false);
        dispatch({type: 'change', payload: {
            countCharContent: result.count,
            percentCharContent:result.percent,
            content: e.target.innerHTML
        }})
    }
    const pageTitle = !state.editNote ? "New Note" : "Edit Note";

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
                editNote = {state.editNote}
                changeEv = {onChangeTitle}
                counter = <RoundCounter count={state.countCharTitle} percent={state.percentCharTitle}/>
                focus = {true}
            />
            <EditDiv
                type = "html"
                label = "Content"
                value = {state.content}
                editNote = {state.editNote}
                changeEv = {onChangeContent}
                counter = <RoundCounter count={state.countCharContent} percent={state.percentCharContent}/>
                focus = {false}
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