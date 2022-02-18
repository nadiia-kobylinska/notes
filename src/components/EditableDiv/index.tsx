import React, {useEffect, useRef, useState} from "react";
import EditorPanel from "../EditorPanel";

type EditableDivProps = {
    value: string;
    id: number | null;
    label:string;
    focus?: boolean;
    type: string;
    changeEv: any;
    counter: JSX.Element,
    excess?: number,
    highlighting?: boolean
}
const EditableDiv = ({value= '', id = null, label= '', focus= false, type= 'html', changeEv = () => {}, counter = <></>, excess= 0, highlighting= false}:EditableDivProps) => {
    const defaultRef = useRef(value);
    const editorRef = useRef(null);
    const [_, setForceUpd] = useState('');

    useEffect(() => {
        defaultRef.current = value;
        setForceUpd(defaultRef.current);
    }, [id]);

    return (
        <div className={'MuiFormControl-root MuiTextField-root editable-field'}>
            <label className={"MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-standard MuiFormLabel-root MuiFormLabel-colorSecondary "}>
                {label}
            </label>
            {type==='html' && <EditorPanel editor={editorRef}/>}
            <div className={`text-field ${type==='html' ? "html-field" : ""}`}
                 ref = {editorRef}
                // @ts-ignore
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

export default EditableDiv;