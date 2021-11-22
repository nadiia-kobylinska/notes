import * as React from "react";
import Note from "./note-detail-view";
import * as PropTypes from "prop-types";

const NoteDetail = (props) => {
    return <Note data={props.note}/>
}

NoteDetail.propTypes = {
    data: PropTypes.object
}
export default NoteDetail;