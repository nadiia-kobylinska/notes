import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    FormNoteWrp:{
      marginBottom: '6rem'
    },
    FormNote: {
      marginTop: '1rem',
      '& .MuiTextField-root': {
        marginTop: '1rem',
        width: '100%'
      }
    },
    FormTitleWrp: {
      display:'flex',
      justifyContent:'space-between',
      marginBottom:'1rem',
      marginTop:100,
      alignItems:'flex-start'
    },
    FormTitle: {
      marginBottom: '1.5rem'
    },
    FormButtons: {
      marginTop: '3rem',
      justifyContent:'flex-end'
    }
  })
);
export default useStyles;
