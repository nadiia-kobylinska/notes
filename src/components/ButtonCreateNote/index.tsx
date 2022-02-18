import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';

type ButtonCreateNoteProps = {
    onCreate: () => void
}
const ButtonCreateNote = ({ onCreate}:ButtonCreateNoteProps)=>{
    return(<Button
        aria-label="Create"
        variant="contained"
        color="secondary"
        startIcon={<AddIcon/>}
        size="large"
        onClick={onCreate}
        sx={{ mb: 5}}
    >
        Create note
    </Button>);
}
export default ButtonCreateNote;