import {Card, CardActionArea,CardActions, CardContent, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import * as React from "react";
import {plainText, truncate} from "../../utils/text";

const NotePreview = (props) => {
    const {title, content, id} = props.data;

    return(
    <Card className={"notes-item"} onClick={()=>props.open(id)}>
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
                <IconButton aria-label="edit" color="primary" onClick={(event)=>props.edit(event, id)}>
                    <EditIcon />
                </IconButton>
                <IconButton aria-label="delete" color="primary" onClick={(event)=>props.delete(event, id)}>
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </CardActionArea>
    </Card>
    )
}
export default NotePreview;