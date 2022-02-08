import {Card, CardActionArea,CardActions, CardContent, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import * as React from "react";
import {plainText, truncate} from "../../utils/text";
import {useListState} from "../../store/contexts/NoteListContext";
import {Note} from "../../types/Note";

type NoteCardProps = {
    note: Note
}
const NoteCard = (props:NoteCardProps) => {
    const {title, content, id} = props.note;
    const [_, actions] = useListState();

    return(
    <Card className={"notes-item"} onClick={()=>actions.previewNote(id)}>
        <CardActionArea component={"div"}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div"  className={"notes-title"}>
                    {title}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    className={"notes-description"}
                    dangerouslySetInnerHTML={{__html:truncate(plainText(content), 200)}}
                >
                </Typography>
            </CardContent>
            <CardActions  className={"notes-btns"}>
                <IconButton aria-label="edit" color="primary" onClick={(event)=>{ event.stopPropagation(); actions.editNote(id)}}>
                    <EditIcon />
                </IconButton>
                <IconButton aria-label="delete" color="primary" onClick={(event)=>{ event.stopPropagation(); actions.removeNote(id)}}>
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </CardActionArea>
    </Card>
    )
}
export default NoteCard;