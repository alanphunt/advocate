import React from "react";

const Toaster = (props) => {
    return (
        <div className={`bubble toasterwrapper ${props.display ? "displayed" : ""}`}>
            {props.children}
        </div>
    )
};

export default Toaster;