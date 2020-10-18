import React from "react";
import {FaCheck as CheckIcon, FaTimes as XIcon} from "react-icons/fa";

//takes in 2 callback methods to either confirm or cancel an action
const ConfirmOrCancelButtons = ({confirmCallback, cancelCallback, confirmText, cancelText}) => {
    const onEnterConfirm = (e) => {
        if(e.key === "Enter")
            confirmCallback();
    };

    const onEnterCancel = (e) => {
        if(e.key === "Enter")
            cancelCallback();
    };

    return (
        <div className={""}>
            <button
                className={"marg-right"}
                onClick={confirmCallback}
                onKeyPress={onEnterConfirm}
            >
                <CheckIcon className={"i-right"}/>
                <span>{confirmText || 'Confirm'}</span>
            </button>
            <button
                className={"cancelButton"}
                onClick={cancelCallback}
                onKeyPress={onEnterCancel}
            >
                <XIcon className={"i-right"}/>
                <span>{cancelText || 'Cancel'}</span>
            </button>
        </div>
    )
};

export default ConfirmOrCancelButtons;