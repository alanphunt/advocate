import React from "react";
import ConfirmOrCancelButtons from "./ConfirmOrCancelButtons";

const ModalBody = (props) => {
    return (
        <div className={""}>
            <div className={"itemcardhead"}>
                <h2>{props.header}</h2>
            </div>
            <div className={"marg-bot-2"}>
                {props.children}
            </div>
            {
                props.hideButtons
                    ? <></>
                    : <div>
                        <ConfirmOrCancelButtons
                            confirmCallback={props.confirmCallback}
                            cancelCallback={props.cancelCallback}
                        />
                      </div>
            }

        </div>
    )
};

export default ModalBody;