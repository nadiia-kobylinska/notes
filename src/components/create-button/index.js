import AddIcon from '@mui/icons-material/Add';
import {Button} from '@mui/material';

const CreateButton = (props)=>{
    return(<Button
        aria-label="Create"
        variant="contained"
        color="secondary"
        startIcon={<AddIcon/>}
        size="large"
        onClick={props.onCreate}
        sx={{ mb: 5}}
    >
        Create note
    </Button>);
}
export default CreateButton;