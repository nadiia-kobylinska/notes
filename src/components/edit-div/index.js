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
            {props.percentChar!==0 &&
            <div className="characters">
                <div className={props.countChar >= 0 ? "circle-wrap" : "circle-red circle-wrap"} style={{"--deg": props.percentChar}}>
                    <div className="circle">
                        <div className="mask full">
                            <div className="fill"> </div>
                        </div>
                        <div className="mask half">
                            <div className="fill"> </div>
                        </div>
                        <div className="inside-circle">{props.countChar<10 && <span className={props.countChar >= 0 ? "text-orange" : "text-red"}>{props.countChar} </span> }
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    );
}
EditDiv.propTypes = {
    percentChar: PropTypes.number,
    fieldRef: PropTypes.any,
    changeEv: PropTypes.func,
    countChar: PropTypes.number
};
export default EditDiv;