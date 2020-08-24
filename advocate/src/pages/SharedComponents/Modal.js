import React from "react";
import {FaRegTimesCircle as ExitIcon} from "react-icons/fa";

const Modal = (props) => {

    const isDisplayed = props.displayed ? "display fadeinfromtop" : "";

    return(
        <div className={`modalwrapper posabs ${isDisplayed} ${props.large && "modal-lg"}`}>
            <ExitIcon className={"modal-exit"}/>
            <div className={`modal bubble`}>
                {props.children}
            </div>
        </div>

    )
}

export const exitModal = (event, displayed, callback) => {
    if (
        displayed
        && ((event.target.closest(".modal") === null && event.target.closest(".promptcontainer") === null)
        || event.currentTarget.classList.contains("cancelButton"))
    )
        callback(false, "");
};

export default Modal;