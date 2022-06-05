import useStyles from "./styles";
import {useNoteListState} from "../../store/contexts/NoteListContext";
import {Box, Typography} from "@mui/material";
import PopoverLinkHTML, {PropsPopoverLinkHTML} from "../PopoverLinkHTML";
import * as React from "react";
import PreviewNote, {EmptyPage} from "./index";
import ButtonCreateNote from "../ButtonCreateNote";
import { ViewMode } from "../../types/ViewMode";
import { useViewModeState } from "../../store/contexts/ViewModeContext";

interface PreviewNote extends PropsPopoverLinkHTML{
    contentRef: React.RefObject<HTMLDivElement>
    contentNote: EmptyPage
}

const Note = ({contentRef, positionPopup, id, onOpen, onClose, contentNote}:PreviewNote) => {
    const classes = useStyles();
    const [_, actionsNote] = useNoteListState();
    const [__, actionsViewMode] = useViewModeState();
    const {content, title} = contentNote;

    const onCreate = () => {
      actionsNote.onCreateNote();
      actionsViewMode.onChangeViewMode(null,ViewMode.CREATE);
    }
    return (
        <Box className={classes.NotePreviewWrp}>
            <Box className={classes.headerNote}>
                <Typography variant="h4" component="div" gutterBottom className={classes.noteTitle}>{title}</Typography>
                <ButtonCreateNote onCreate={onCreate}/>
            </Box>
            <Box>
                <Typography ref={contentRef} variant="body2" gutterBottom className={classes.noteDescription}
                            dangerouslySetInnerHTML={{__html:content}}>
                </Typography>
                <PopoverLinkHTML id={id} positionPopup={positionPopup} onClose={onClose} onOpen={onOpen}/>
            </Box>
        </Box>
    );
}
export default Note;
