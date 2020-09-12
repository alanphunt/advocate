import React from "react";
import {FaCheck as CheckIcon, FaTimes as XIcon} from "react-icons/fa";

const ConfirmOrCancelButtons = (props) => {
    const onEnterConfirm = (e) => {
        if(e.key === "Enter")
            props.confirmCallback();
    };

    const onEnterCancel = (e) => {
        if(e.key === "Enter")
            props.cancelCallback();
    };

    return (
        <div className={""}>
            <button
                className={"marg-right"}
                onClick={props.confirmCallback}
                onKeyPress={onEnterConfirm}
            >
                <CheckIcon className={"i-right"}/>
                <span>Confirm</span>
            </button>
            <button
                className={"cancelButton"}
                onClick={props.cancelCallback}
                onKeyPress={onEnterCancel}
            >
                <XIcon className={"i-right"}/>
                <span>Cancel</span>
            </button>
        </div>
    )
};

export default ConfirmOrCancelButtons;