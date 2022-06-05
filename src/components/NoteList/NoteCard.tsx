import * as React from "react";
import {Card, CardActionArea,CardActions, CardContent, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {plainText, truncate} from "../../utils/text";
import {Note} from "../../types/Note";
import useStyles from "./styles";
import { ViewMode } from "../../types/ViewMode";
import { useViewModeState } from "../../store/contexts/ViewModeContext";

type NoteCardProps = {
    note: Note
    onPreviewNote: (id:number) => void
    onEditNote: (id:number) => void
    onRemoveNote: (id:number) => void
}
const NoteCard = ({note, onPreviewNote, onEditNote, onRemoveNote}:NoteCardProps) => {
    const classes = useStyles();
    const {title, content, id} = note;
    const [_, actions] = useViewModeState();

    const goToNote = ()=>{
        onPreviewNote(id);
        actions.onChangeViewMode(id, ViewMode.PREVIEW);
    }
    const goToEditNote = (event:React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>)=>{
        event.stopPropagation();
        onEditNote(id)
        actions.onChangeViewMode(id, ViewMode.EDIT);
    }
    return(
    <Card className={classes.NoteItem} onClick={goToNote}>
        <CardActionArea component={"div"}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography className={classes.NoteDescription} variant="body2" color="text.secondary"
                            dangerouslySetInnerHTML={{__html:truncate(plainText(content), 200)}}>
                </Typography>
            </CardContent>
            <CardActions className={`NoteBtns ${classes.NoteBtns}`}>
                <IconButton aria-label="edit" color="primary" onClick={goToEditNote}>
                    <EditIcon />
                </IconButton>
                <IconButton aria-label="delete" color="primary"
                            onClick={(event)=>{ event.stopPropagation(); onRemoveNote(id)}}>
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </CardActionArea>
    </Card>
    )
}
export default NoteCard;
