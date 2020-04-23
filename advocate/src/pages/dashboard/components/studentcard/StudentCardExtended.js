import React from "react";

const StudentCardExtended = (props) => {
    return (
        <div className={`stucard-extended ${props.display ? "display" : ""}`}>
            <span className={props.display ? "exit" : "nodisplay"} onClick={() => {props.updateDisplayed(999)}}><i className={"fas fa-times"}/></span>

        </div>
    )
};

export default StudentCardExtended;