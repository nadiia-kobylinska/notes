import * as React from 'react';
import Form from "./form-view";
export default class NotesManage extends React.Component {
    render() {
        return (
            <Form id={this.props.id} cancel={this.props.cancel} notes={this.props.notes} save={this.props.save}/>
        );
    }
}