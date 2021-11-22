import * as PropTypes from "prop-types";
const HTMLDiv = (props) => {
    return (
        <div className={'MuiFormControl-root MuiTextField-root editable-field'}>
            <label className={"MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-standard MuiFormLabel-root MuiFormLabel-colorSecondary "}>
                Content
            </label>
            <div ref={props.fieldRef}
                 className="text-field html-field"
                 contentEditable
                 onInput={props.changeEv}
                 onFocus={props.changeEv}
                 onKeyUp={props.changeEv}
            ></div>
        </div>
    );
}

HTMLDiv.propTypes = {
    ref: PropTypes.any,
    changeEv: PropTypes.any
};
export default HTMLDiv;