import React from "react";
import Modal from "./Modal";
import ConfirmOrCancelButtons from "./ConfirmOrCancelButtons";
import H2 from "../atoms/H2";

const CompletionModal = ({displayed, closeModal, successMessage, confirmCallback, children}) => {
    return (
        <Modal displayed={displayed} closeModal={closeModal}>
            <>
                <H2 margin>Success!</H2>
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