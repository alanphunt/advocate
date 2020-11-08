import React from "react";
import Modal from "./Modal";
import ConfirmOrCancelButtons from "./ConfirmOrCancelButtons";

const CompletionModal = ({displayed, closeModal, successMessage, confirmCallback, children}) => {
    return (
        <Modal displayed={displayed} closeModal={closeModal}>
            <>
                <h2 className={"marg-bot"}>Success!</h2>
                <p className={"marg-bot"}>{successMessage}</p>
                {
                    confirmCallback
                        ? <ConfirmOrCancelButtons
                            confirmCallback={confirmCallback}
                            cancelCallback={closeModal}
                        />
                        : children
                }
            </>
        </Modal>
    )
};

export default CompletionModal;