import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        SidebarColumn:{
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'column',
            marginTop: 80,
            marginBottom: 80,
            width:'100%'
        },
        SearchFieldWrp:{
            width:'100%'
        }
    })
);
export default useStyles;