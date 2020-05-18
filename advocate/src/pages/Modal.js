import React from "react";

const Modal = (props) => {

    const isDisplayed = props.displayed ? "display fadeinfromtop" : "";

    return(
        <div className={`modalwrapper posabs ${isDisplayed} ${props.large ? "modal-lg" : ""}`}>
            <i className={`far fa-times-circle modal-exit`}/>
            <div className={`modal bubble`}>
                {props.children}
            </div>
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