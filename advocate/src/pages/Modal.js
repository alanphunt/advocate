import React from "react";

const Modal = (props) => {

    return(
        <div className={`modal bubble ${(props.displayed ? "display fadeinfromtop" : "")} ${props.large ? "modal-lg" : ""}`}>
            {props.children}
        </div>
    )
}

export const exitModal = (event, displayed, callback) => {
    if (displayed
        && event.target.closest(".modal") === null
        && event.target.closest(".promptcontainer") === null)
        callback(false, "");
};

export default Modal;