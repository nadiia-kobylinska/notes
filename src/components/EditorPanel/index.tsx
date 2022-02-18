import {Box, Button} from "@mui/material";
import * as React from "react";

type EditorPanelProps = {
    editor: React.MutableRefObject<any>
}

const EditorPanel = ({editor}:EditorPanelProps) =>{
    const modeExecCommand = (mode:string) => {
        document.execCommand(mode)
    }
    return(
        <Box>
            <Button onClick={() => modeExecCommand('bold')}><b>B</b></Button>
            <Button onClick={() => modeExecCommand('italic')}><i>I</i></Button>
            <Button onClick={() => modeExecCommand('underline')}><u>U</u></Button>
            <Button onClick={() => modeExecCommand('insertUnorderedList')}>ul</Button>
            <Button onClick={() => modeExecCommand('insertOrderedList')}>ol</Button>
        </Box>
    )

}
export default EditorPanel;