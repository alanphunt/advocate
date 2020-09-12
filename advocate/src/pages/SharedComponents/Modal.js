import React from "react";
import {FaRegTimesCircle as ExitIcon} from "react-icons/fa";

const preventPropagation = (e) => {
    //prevents click from bubbling and being captured by closeModal event listener on
    //the parent element
    e.stopPropagation();
};

const Modal = (props) => {
    const isDisplayed = props.displayed ? "display fadeinfromtop" : "";

    return(
        <div
            className={`modalwrapper posabs ${isDisplayed} ${props.large && "modal-lg"}`}
            onClick={preventPropagation}
        >
            <ExitIcon className={"modal-exit"} onClick={props.closeModal}/>
            <div className={`modal bubble`}>
                {props.children}
            </div>
        </div>

    )
}

export default Modal;