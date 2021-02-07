import React from "react";
import ConfirmOrCancelButtons from "components/molecules/ConfirmOrCancelButtons";
import Section from "components/atoms/Section";

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
                <h2>{header}</h2>
            </div>
            <Section>
                {children}
            </Section>
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