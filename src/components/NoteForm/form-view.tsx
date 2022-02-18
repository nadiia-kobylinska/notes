import {Box, Button, Stack, Typography} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import LoadingButton from "@mui/lab/LoadingButton";
import CheckIcon from "@mui/icons-material/Check";
import {ChangeEvent, SyntheticEvent, useEffect, useReducer} from "react";
import EditableDiv from "../EditableDiv";
import calcCountChar from "../../utils/calc-count-char";
import cleanUpHTML from "../../utils/clean-up-html";
import formReducer from "../../store/reducers/formReducer";
import RoundCounter from "../CounterRound";
import {isValid} from "./func";
import {
    CHANGE_CONTENT_FORM,
    CHANGE_TITLE_FORM,
    RESET_FORM,
    UPDATE_DATA_FORM
} from "../../store/actionTypes";
import {Note} from "../../types/Note";

type FormProps = {
    note: Note | null;
    id: number | null;
    onCancel: () => void;
    onSave: (title: string, content: string) => void;
    onUpdate: (id: number, title: string, content: string) => void;
}
const Form = (props:FormProps) => {

    const note = props.note;

    const [state, dispatch] = useReducer(formReducer, {
            loading: false,
            title: note ? note.title : '',
            content: note ? note.content : '',
            id: note ? note.id : props.id,
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
        if (note.id !== state.id) {
            dispatch({type: UPDATE_DATA_FORM, payload: {
                id: note.id,
                title: note.title,
                content: note.content
            }})
        }
    },[note,props.id]);

    function resetForm(){
        dispatch({type: RESET_FORM, payload: {
            loading: false,
            title: '',
            content: '',
            id: props.id,
            countCharTitle: 0,
            percentCharTitle: 0,
            countCharContent: 0,
            percentCharContent: 0,
            isValid: false
        }});
    }
    function onSubmit(e:SyntheticEvent) {
        e.preventDefault();
        if (note?.id === state.id){
            props.onUpdate(state.id, state.title, state.content);
        }else{
            props.onSave(state.title, state.content);
        }
        resetForm();
    }
    function onChangeTitle(e:ChangeEvent<HTMLInputElement>){
        const countChar = calcCountChar(e.target.innerText, 100);
        // if (countChar.count<0){highlightOverlimit(e.target, e.target.innerText, countChar.count)}
        dispatch({type: CHANGE_TITLE_FORM, payload: {
            countCharTitle: countChar.count,
            percentCharTitle:countChar.percent,
            title: e.target.innerText
        }})
    }
    function onChangeContent(e:ChangeEvent<HTMLInputElement>){
        const countChar = calcCountChar(e.target.innerText,1000);
        dispatch({type: CHANGE_CONTENT_FORM, payload: {
            countCharContent: countChar.count,
            percentCharContent:countChar.percent,
            content: cleanUpHTML(e.target.innerHTML)
        }})
    }
    const pageTitle = !state.id ? "New Note" : "Edit Note";

    return (
        <Box noValidate component="form" autoComplete="off" sx={{mt: 1, '& .MuiTextField-root': { m: 1, width: '100%' }}}
            onSubmit={onSubmit}
        >
            <Box sx={{display:'flex',justifyContent:'space-between',marginBottom:'1rem',mt:10, alignItems:'flex-start'}}>
                <Typography variant="h4" component="div" gutterBottom  className={"fi=orm-title"} sx={{ mb: 5}}>
                    {pageTitle}
                </Typography>
            </Box>
            <EditableDiv
                type = "text"
                label = "Title"
                value = {state.title}
                id = {state.id}
                excess = {state.countCharTitle}
                changeEv = {onChangeTitle}
                counter = {<RoundCounter count={state.countCharTitle} percent={state.percentCharTitle}/>}
                focus = {true}
                highlighting={true}
            />
            <EditableDiv
                type = "html"
                label = "Content"
                value = {state.content}
                id = {state.id}
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