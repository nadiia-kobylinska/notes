import {Box, Button, Stack, Typography} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import LoadingButton from "@mui/lab/LoadingButton";
import CheckIcon from "@mui/icons-material/Check";
import { useState, useRef, useEffect} from "react";
import EditDiv from "../edit-div";
import HTMLDiv from "../html-div";
import validateTextLength from "../../utility/validate-text-length";
import cleanUpHTML from "../../utility/clean-up-html";
import CreateButton from "../create-button";

const Form = (props) => {
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [countChar, setCountChar] = useState(0);
    const [percentChar, setPercentChar] = useState(0);

    let titleRef = useRef(null);
    let contentRef = useRef(null);

    useEffect(()=>{
        if (!props.id) {
            resetForm();
        }
        if (props.id && props.id !== editMode) {
            setEditMode(props.id);
        }
    },[props.id]);

    useEffect(()=>{
        if (props.id && editMode && props.id === editMode) {
            const note = props.notes.filter(note => note.id === props.id)[0];
            setContent(note.content);
            setTitle(note.title);
            titleRef.current.innerHTML = note.title;
            contentRef.current.innerHTML = note.content;
            titleRef.current.focus();
        }
    },[editMode]);

    function resetForm(){
        setEditMode(false);
        setLoading(false);
        setContent('');
        setTitle('');
        titleRef.current.innerHTML = '';
        contentRef.current.innerHTML = '';
        titleRef.current.focus();
        // titleRef.current.blur();
    }
    function saveNote(e) {
        e.preventDefault();
        if ((content !== "" || title !== "") && validateTextLength(e, titleRef.current,100, titleRef).valid) {
            setLoading(true);
            try {
                const hasNoteIndex = props.notes.findIndex((obj => obj.id === editMode));
                props.save({
                        id: hasNoteIndex!==-1 ? editMode : Date.now(),
                        title: title || "No name",
                        content: content || "empty"
                    }, hasNoteIndex);

                resetForm();
            } catch (error) {
                console.log(error)
            }
        }
    }

    if (props.id && !editMode && props.id !== editMode){
        setEditMode(props.id);
    }
    function changeTitle(e){
        const result = validateTextLength(e, e.target,100, titleRef);
        setCountChar(result.count);
        setPercentChar(result.percent);
        setTitle(e.target.innerText);
    }
    function changeContent(e){
        cleanUpHTML(e.target,
            'iframe, script, noscript, frame, form, input, textarea',
            ['data-ga ','id','jsaction', 'jscontroller', 'onclick', 'data-ved', 'ping', 'data-google-query-id','itemprop']
        );
        setContent(e.target.innerHTML);
    }

    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{
                mt: 1,
                '& .MuiTextField-root': { m: 1, width: '100%' },
            }}
            onSubmit={saveNote}
        >
            <Box sx={{display:'flex',justifyContent:'space-between',marginBottom:'1rem',mt:10, alignItems:'flex-start'}}>
                <Typography
                    variant="h4"
                    component="div"
                    gutterBottom
                    className={"fi=orm-title"}
                    sx={{ mb: 5}}>
                    {!editMode ? "New Note" : "Edit Note"}
                </Typography>
            </Box>
            <EditDiv
                changeEv = {changeTitle}
                countChar = {countChar}
                percentChar = {percentChar}
                fieldRef = {titleRef}
            />
            <HTMLDiv
                changeEv = {changeContent}
                fieldRef = {contentRef}
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
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<CheckIcon />}
                    variant="contained"
                    disabled={((content === "" && title === "") || percentChar>100)}
                >
                    Save
                </LoadingButton>
            </Stack>
        </Box>
    );
}
export default Form;