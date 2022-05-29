import {Box, Button, Typography} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import * as React from "react";

type Props = {
    readonly onCreate: () => void;
    readonly headline: string;
}
const WelcomeScreen = (props:Props) => {
    return (
        <Box className={'fullscreen-container'} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', p: 1, m: 1}}>
            <Typography variant="h2" component="h1" gutterBottom className={"notes-title"} sx={{textAlign: 'center', mb: 10}}
                        dangerouslySetInnerHTML={{ __html: props.headline }}/>
            <Button aria-label="Create" variant="contained" color="secondary" startIcon={<AddIcon/>} size="large"
                onClick={props.onCreate}>
                Create note
            </Button>
        </Box>
    )
}

export default WelcomeScreen;
