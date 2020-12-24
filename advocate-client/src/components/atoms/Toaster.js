import React from "react";
import {FaThumbsUp as ThumbIcon} from "react-icons/fa";

const Toaster = ({display, setDisplay, children}) => {
    return (
        <div
            className={`bubble toasterwrapper ${display ? "display fadeInFromBottom" : ""}`}
            onClick={() => setDisplay(false)}
        >
            { 
                children
                    ? <>{children}</>
                    : <>
                        <ThumbIcon className={"i-right"}/>
                        <span>Success!</span>
                      </>
            }
        </div>
    )
};

export default Toaster;