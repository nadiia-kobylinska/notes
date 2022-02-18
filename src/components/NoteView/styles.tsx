import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        NotePreviewWrp: {
            marginTop:'1rem',
            marginBottom: 80,
            flexGrow:1,
            width:'100%'
        },
        headerNote:{
            display:'flex',
            justifyContent:'space-between',
            marginBottom:'1rem',
            marginTop:80,
            alignItems:'flex-start',
            flexWrap:'wrap-reverse'
        },
        noteTitle:{
            marginBottom:50
        },
        noteDescription:{
            position: 'relative',
            wordBreak: 'break-word',
            maxWidth: '100%',
            overflowX: 'auto',
            "& img":{
                maxWidth: '100%'
            },
            "& *":{
                boxSizing: 'border-box'
            }
        },
        PopoverTitle:{
            padding: '1rem'
        }
    })
);
export default useStyles;