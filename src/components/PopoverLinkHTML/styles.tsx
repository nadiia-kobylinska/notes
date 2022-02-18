import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        PopoverTitle:{
            padding: '1rem'
        }
    })
);
export default useStyles;