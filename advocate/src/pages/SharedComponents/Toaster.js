import React from "react";
import {FaThumbsUp as ThumbIcon} from "react-icons/fa";

const Toaster = (props) => {
    return (
        <div
            className={`bubble toasterwrapper ${props.display ? "display fadeInFromBottom" : ""}`}
            onClick={() => {props.setDisplay(false)}}
        >
            { props.children
                ? <></>
                : <>
                    <ThumbIcon className={"i-right"}/>
                    <span>Success!</span>
                </>
            }
        </div>
    )
};

export default Toaster;