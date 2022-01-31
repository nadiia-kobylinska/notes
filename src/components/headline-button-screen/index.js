import {Box, Button, Typography} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import * as React from "react";
import * as PropTypes from "prop-types";

const HeadlineButtonScreen = (props) => {
    return (
        <Box className={'fullscreen-container'} sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            p: 1,
            m: 1
        }}>
            <Typography
                variant="h2"
                component="h1"
                gutterBottom
                className={"notes-title"}
                sx={{textAlign: 'center', mb: 10}}
                dangerouslySetInnerHTML={{__html:props.headline}}
            >
            </Typography>
            <Button
                aria-label="Create"
                variant="contained"
                color="secondary"
                startIcon={<AddIcon/>}
                size="large"
                onClick={props.onCreate}
            >
                Create note
            </Button>
        </Box>
    )
}
HeadlineButtonScreen.propTypes = {
    onCreate : PropTypes.func,
    headline: PropTypes.string
}
export default HeadlineButtonScreen;