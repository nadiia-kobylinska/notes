import * as React from 'react'
import {useNoteListState} from '../../store/contexts/NoteListContext'
import {useEffect, useRef, useState} from 'react'
import Note from './view'

export type EmptyPage = {
    title: string
    content: string
}
const EmptyPage:EmptyPage = {
    title: 'Empty',
    content: 'Choose a note to display.'
}

const PreviewNote = () => {
    const [state] = useNoteListState();
    const content:EmptyPage = state.notes.find((Note) => Note.id === state.editId) || EmptyPage;

    const contentRef = useRef<HTMLDivElement>(null);
    const [anchorEl, setAnchorEl] = useState('' as string | null);
    const [positionPopup, setPositionPopup] = useState({top:0, left:0});
    const id = Boolean(anchorEl) ? 'simple-popover' : undefined;
    const onClose = () => {setAnchorEl('');};
    function onOpen(){
        if (anchorEl) { window.open(anchorEl); }
        onClose();
    }
    useEffect(()=>{
        const links = contentRef.current?.querySelectorAll('a');
        if (links){
            links.forEach((a)=>{
                a.addEventListener('click', alertLink, false);
                a.dispatchEvent(new Event('click'));

            })
        }
        return window.removeEventListener('click', alertLink, false);
    },[content]);

    const alertLink = (event: MouseEvent) =>{
        event.preventDefault();
        const node = event.target as HTMLAnchorElement;
        if (id) node.setAttribute('aria-describedby', id);
        setAnchorEl(node.getAttribute('href'));
        setPositionPopup({
            top: node.getBoundingClientRect().y + node.getBoundingClientRect().height,
            left: node.getBoundingClientRect().x
        });
    }
    return <Note contentRef={contentRef} positionPopup={positionPopup} id={id} onOpen={onOpen} onClose={onClose} contentNote={content}/>
}

export default PreviewNote;