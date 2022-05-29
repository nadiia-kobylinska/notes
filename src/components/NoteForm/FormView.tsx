import { Box, Button, Stack, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import LoadingButton from "@mui/lab/LoadingButton";
import CheckIcon from "@mui/icons-material/Check";
import EditableDiv from "../EditableDiv";
import RoundCounter from "../CounterRound";
import useStyles from "./styles";
import { useNoteFormState } from "../../store/contexts/NoteFormContext";
import { ChangeEvent, useEffect } from "react";
import calcCountChar, { highlightOverlimit } from "../../utils/calc-count-char";
import cleanUpHTML from "../../utils/clean-up-html";
import { Note } from "../../types/Note";

type FormProps = {
    note: Note | null;
    PageTitle: string;
    onCancel: () => void;
    onSave: (title: string, content: string) => void;
    onUpdate: (id:number,title: string, content: string) => void;
}

const Form = ({note, PageTitle, onCancel, onUpdate, onSave}:FormProps) => {
    const classes = useStyles();
    const [state, actions] = useNoteFormState();

    useEffect(()=>{
      if (!note) {
        actions.onResetForm();
        return;
      }
      actions.onUpdateForm( note.id, note.title, note.content );
    },[note]);

    const onSubmit = () => {
      if (!!state.id){
        onUpdate(state.id, state.title, state.content)
      }else{
        onSave(state.title, state.content)
      }
      actions.onResetForm();
    }
    function onChangeTitle(e:ChangeEvent<HTMLInputElement>){
      const countChar = calcCountChar(e.target.innerText, 100);
      if (countChar.count<0){
        highlightOverlimit(e.target, e.target.innerText, countChar.count)
      }
      actions.onChangeTitleForm(e.target.innerText, countChar.count, countChar.percent)
    }
    function onChangeContent(e:ChangeEvent<HTMLInputElement>){
      const countChar = calcCountChar(e.target.innerText,1000);
      actions.onChangeContentForm(cleanUpHTML(e.target.innerHTML), countChar.count, countChar.percent)
    }

    return (
        <Box noValidate component="form" autoComplete="off" className={classes.FormNote} onSubmit={onSubmit}>
            <Box className={classes.FormTitleWrp}>
                <Typography variant="h4" component="div" gutterBottom className={classes.FormTitle}>
                    {PageTitle}
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
            <Stack direction="row" spacing={4} className={classes.FormButtons}>
                <Button aria-label="cancel" variant="text" color="secondary" startIcon={<CancelIcon />} onClick={onCancel}>
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
