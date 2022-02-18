import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        NoteListWrp:{
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'column',
            marginTop:30,
            minWidth:'100%'
        },
        NoteItem:{
            marginBottom: '2rem',
            width: '100%',
            borderBottom: '1px solid #ccc',
            cursor: 'pointer',
            "&:hover .NoteBtns":{
                visibility: 'visible'
            }
        },
        NoteBtns:{
            display: 'flex',
            justifyContent: 'flex-end',
            visibility: 'hidden',
            transition: '0.5s',
            '@media (max-width:768px)':{
                visibility: 'visible'
            }
        },
        NoteDescription:{
            "& a *":{
                pointerEvents: 'none'

            }
        }
    })
);
export default useStyles;