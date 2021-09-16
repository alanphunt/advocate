import React from "react";
import ConfirmOrCancelButtons from "components/molecules/ConfirmOrCancelButtons";
import H2 from "../atoms/H2";

/*
    Props:
        header: string- the modal header
        children: objects- renders what is to be the body of the modal
        confirmCallback: function: optional- callback for clicking confirm button
        confirmCallback: function: optional- callback for clicking cancel button
        hideButtons: boolean: optional- to display confirm/cancel buttons or not
    State:
        
*/

const ModalBody = React.forwardRef(({header, children, confirmCallback, cancelCallback, hideButtons, isLoading}, ref) => {
    return (
        <div className="modalbody">
            <div ref={ref} className={"itemcardhead"}>
                <H2>{header}</H2>
            </div>
            <div>
                {children}
            </div>
            {
                hideButtons
                    ? <></>
                    : <div>
                        <ConfirmOrCancelButtons
                            confirmCallback={confirmCallback}
                            cancelCallback={cancelCallback}
                            isLoading={isLoading}
                        />
                      </div>
            }
        </div>
    )
});

export default ModalBody;