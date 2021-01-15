import React from "react";
import { useProvideUi, UiContext } from "./UiHooks";

/*
     props:

     state:

*/

const UiProvider = ({children}) => {
    const ui = useProvideUi();
    return (
        <UiContext.Provider value = {ui}>
            {children}
        </UiContext.Provider>
    );
};

export default UiProvider;
