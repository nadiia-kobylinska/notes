import {Box, Button} from "@mui/material";
import * as React from "react";
class EditorPanel extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            editor: props.editor.current
        }
        this.codeView = this.codeView.bind(this);
        this.modeExecCommand = this.modeExecCommand.bind(this);
    }
    codeView = function (){

    }
    modeExecCommand = function (mode){
        document.execCommand(mode)
    }
    render() {
        return(
            <Box>
                <Button onClick={() => this.modeExecCommand('bold')}><b>B</b></Button>
                <Button onClick={() => this.modeExecCommand('italic')}><i>I</i></Button>
                <Button onClick={() => this.modeExecCommand('underline')}><u>U</u></Button>
                <Button onClick={() => this.modeExecCommand('insertUnorderedList')}>ul</Button>
                <Button onClick={() => this.modeExecCommand('insertOrderedList')}>ol</Button>
                {/*<Button onClick={this.codeView}>HTML</Button>*/}
            </Box>
        )
    }

}
export default EditorPanel;