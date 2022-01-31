import * as PropTypes from "prop-types";
import {useEffect, useRef, useState} from "react";
import EditorPanel from "../editor-panel";

const EditDiv = ( {value= '', noteID= null, label= '', focus= false, type= 'html', changeEv = null, counter= null,excess= 0, highlighting= false}) => {
    const defaultRef = useRef(value);
    const editorRef = useRef(null);
    const [forceUpd, setForceUpd] = useState(null);

    useEffect(() => {
        defaultRef.current = value;
        setForceUpd(defaultRef.current);
    }, [noteID]);

    return (
        <div className={'MuiFormControl-root MuiTextField-root editable-field'}>
            <label className={"MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-standard MuiFormLabel-root MuiFormLabel-colorSecondary "}>
                {label}
            </label>
            {type==='html' && <EditorPanel editor={editorRef}/>}
            <div className={`text-field ${type==='html' ? "html-field" : ""}`}
                 ref = {editorRef}
                 contentEditable={type==='text' ? "plaintext-only" : ''}
                 dangerouslySetInnerHTML={{ __html: defaultRef.current}}
                 autoFocus={focus}
                 onInput={changeEv}
                 onFocus={changeEv}
                 onKeyUp={changeEv}
            ></div>
            {counter}
        </div>
    );
}
EditDiv.propTypes = {
    changeEv: PropTypes.func,
};
export default EditDiv;