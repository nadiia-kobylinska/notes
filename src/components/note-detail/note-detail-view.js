import {Box, Typography, Popover, Button} from "@mui/material";
import * as PropTypes from "prop-types";
import {useEffect, useRef, useState} from "react";
import CreateButton from "../create-button";

const Note = (props) => {
    const {title, content} = props.data;
    const contentRef = useRef(null);
    const [anchorEl, setAnchorEl] = useState('');
    const [positionPopup, setPositionPopup] = useState({top:0, left:0});

    useEffect(()=>{
        const links = contentRef.current.querySelectorAll('a');
        links.forEach((a)=>{
            a.addEventListener('click', alertLink)
        })
        return () => {
            window.removeEventListener('click', alertLink)
        }
    },[props.data]);

    useEffect(()=>{},[anchorEl]);

    const handleClose = () => {
        setAnchorEl('');
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const alertLink = event =>{
        event.preventDefault();
        event.target.setAttribute('aria-describedby',id);
        setAnchorEl(event.target.getAttribute('href'));
        setPositionPopup({
            top:  event?.target?.getBoundingClientRect().y + event?.target?.getBoundingClientRect().height,
            left: event?.target?.getBoundingClientRect().x
        });
    }
    function openLink(){
        if (anchorEl) {
            window.open(anchorEl);
        }
        handleClose();
    }
    return (
    <Box component="div" className={"notes-preview"} sx={{mt: 1, mb:10, flexGrow:1, width:'100%'}}>
        <Box sx={{display:'flex',justifyContent:'space-between',marginBottom:'1rem',mt:10, alignItems:'flex-start', flexWrap:'wrap-reverse'}}>
            <Typography variant="h4" component="div" gutterBottom className={"notes-title"} sx={{ mb: 5}}>
                {title}
            </Typography>
            <CreateButton onCreate={props.onCreate}/>
        </Box>
        <Box component="div">
            <Typography ref={contentRef} variant="body2" gutterBottom className={"notes-description"}
                        dangerouslySetInnerHTML={{__html:content}}>
            </Typography>
            <Popover
                anchorReference="anchorPosition"
                anchorPosition={{ top: positionPopup.top, left: positionPopup.left }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handleClose}
                id={id}
                open={open}
            >
                <Typography variant="body3" sx={{p:1}}>Open the link in a new tab?</Typography>
                <Button onClick={handleClose} size={'small'}>No</Button>
                <Button onClick={openLink} size={'small'}>Yes</Button>
            </Popover>
        </Box>
    </Box>
    );
}
Note.propTypes = {
    data: PropTypes.object
}
export default Note;