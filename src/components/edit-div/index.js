import * as PropTypes from "prop-types";

const EditDiv = (props) => {
    return (
        <div className={'MuiFormControl-root MuiTextField-root editable-field'}>
            <label className={"MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-standard MuiFormLabel-root MuiFormLabel-colorSecondary "}>
                Title
            </label>
            <div ref={props.fieldRef}
                 className="text-field"
                 contentEditable={"plaintext-only"}
                 id={"editfield"}
                 onInput={props.changeEv}
                 onFocus={props.changeEv}
                 onKeyUp={props.changeEv}
            ></div>
            {props.counter}
        </div>
    );
}
EditDiv.propTypes = {
    fieldRef: PropTypes.any,
    changeEv: PropTypes.func,
};
export default EditDiv;