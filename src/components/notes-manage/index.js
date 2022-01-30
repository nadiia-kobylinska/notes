import * as React from 'react';
import Form from "./form-view";
export default class NotesManage extends React.Component {
    render() {
        return (
            <Form note={this.props.note} onCancel={this.props.onCancel} onSave={this.props.onSave}/>
        );
    }
}