import * as PropTypes from "prop-types";
import {useEffect, useRef, useState} from "react";
import EditorPanel from "../editor-panel";

const EditDiv = (props) => {
    const defaultRef = useRef(props.value);
    const editorRef = useRef(null);
    const [forceUpd, setForceUpd] = useState(null);

    useEffect(() => {
        defaultRef.current = props.value;
        setForceUpd(props.value);
    }, [props.editNote]);

    return (
        <div className={'MuiFormControl-root MuiTextField-root editable-field'}>
            <label className={"MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-standard MuiFormLabel-root MuiFormLabel-colorSecondary "}>
                {props.label}
            </label>
            {props.type==='html' && <EditorPanel editor={editorRef}/>}
            <div className={`text-field ${props.type==='html' ? "html-field" : ""}`}
                 ref = {editorRef}
                 contentEditable={props.type==='text' ? "plaintext-only" : ''}
                 dangerouslySetInnerHTML={{ __html: defaultRef.current}}
                 autoFocus={props.focus}
                 onInput={props.changeEv}
                 onFocus={props.changeEv}
                 onKeyUp={props.changeEv}
            ></div>
            {props.counter}
        </div>
    );
}
EditDiv.propTypes = {
    changeEv: PropTypes.func,
};
export default EditDiv;