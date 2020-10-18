import React from "react";
import {FaRegTimesCircle as ExitIcon} from "react-icons/fa";
import ConfirmOrCancelButtons from "../dashboard/components/ConfirmOrCancelButtons";

/*
    Props:
        displayed- parent-owned state whether the modal should be displayed or not
        children- what will actually be displayed within the modal
        closeModal- the callback to set the visibility to hidden
        large- determines either fit-to-size or full screen modal
 */
const Modal = ({displayed, children, closeModal, large, successModal}) => {
    const isDisplayed = displayed ? "display fadeinfromtop" : "";
    const preventPropagation = (e) => {
        //prevents click from bubbling and being captured by closeModal event listener on the parent element
        e.stopPropagation();
    };

    return(
        <div
            className={`modalwrapper posabs ${isDisplayed} ${large ? "modal-lg" : ""}`}
            onClick={preventPropagation}
        >
            <ExitIcon className={"modal-exit"} onClick={closeModal}/>
            <div className={`modal bubble`}>
                {
                    successModal
                        ? <>
                            <h2 className={"marg-bot"}>Success!</h2>
                            <p className={"marg-bot"}>{ successModal.successMessage }</p>
                            <ConfirmOrCancelButtons
                                confirmCallback={successModal.confirmCallback}
                                cancelCallback={successModal.cancelCallback}
                                cancelText={successModal.cancelText}
                                confirmText={successModal.confirmText}
                            />
                          </>
                        : children
                }
            </div>
        </div>

    )
}

export default Modal;