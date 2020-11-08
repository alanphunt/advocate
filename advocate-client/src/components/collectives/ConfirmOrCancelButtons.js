import React from "react";
import {FaCheck as CheckIcon, FaTimes as XIcon} from "react-icons/fa";
import Button from "components/singletons/Button";

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
            <Button
                className={"marg-right"}
                onClick={confirmCallback}
                onKeyPress={onEnterConfirm}
                icon={<CheckIcon className={"i-right"}/>}
                text={confirmText || "Confirm"}
            />
            <Button
                className={"cancelButton"}
                onClick={cancelCallback}
                onKeyPress={onEnterCancel}
                icon={<XIcon className={"i-right"}/>}
                text={cancelText || "Cancel"}
            />
        </div>
    )
};

export default ConfirmOrCancelButtons;