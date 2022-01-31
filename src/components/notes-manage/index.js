import * as React from 'react';
import Form from "./form-view";
const NotesManage = (props) => {
    return (
        <Form note={props.note} id={props.id} onCancel={props.onCancel} onSave={props.onSave}/>
    );
}
export default NotesManage;