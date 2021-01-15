import React from "react";
import {FaRegTimesCircle as ExitIcon} from "react-icons/fa";

/*
    Props:
        displayed- boolean- parent-owned state whether the modal should be displayed or not
        children- objects- what will actually be displayed within the modal
        closeModal- function- the callback to set the visibility to hidden
        large- boolean- determines if it'll be a full screen modal
 */
const Modal = ({displayed, children, closeModal, largeModal}) => {
    const isDisplayed = displayed ? "display fadeinfromtop" : "";
    const preventPropagation = (e) => {
        //prevents click from bubbling and being captured by closeModal event listener on the parent element
        e.stopPropagation();
    };

    return(
        <div
            className={`modalwrapper posabs ${isDisplayed} ${largeModal ? "modal-lg" : ""}`}
            onClick={preventPropagation}
        >
            <ExitIcon className={"modal-exit"} onClick={closeModal}/>
            <div className={`modal bubble`}>
                {children}
            </div>
        </div>

    )
}

export default Modal;