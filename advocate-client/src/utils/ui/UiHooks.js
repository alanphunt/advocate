import {useState, useContext, createContext} from "react";

export const UiContext = createContext();

export const useProvideUi = () => {
    const [modalBody, setModalBody] = useState(null);
    const [toasterText, setToasterText] = useState("");
    const [largeModal, setLargeModal] = useState(false);
    const closeModal = () => setModalBody(null);
    const closeToaster = () => setToasterText("");
    const [modalAction, setModalAction] = useState("");

    return {
        largeModal,
        setLargeModal,
        closeModal,
        modalBody,
        setModalBody,
        setToasterText,
        toasterText,
        closeToaster,
        modalAction,
        setModalAction
    };
};

export const useUi = () => {
    return useContext(UiContext);
};