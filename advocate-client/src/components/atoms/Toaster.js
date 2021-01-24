import React, {useEffect} from "react";
import {FaThumbsUp as ThumbIcon} from "react-icons/fa";

const Toaster = ({displayed, closeToaster, children}) => {
    let timer = null;
    useEffect(() => {
        if(displayed){
            timer = setTimeout(closeToaster, 4000);
        }
        return timer ? () => clearTimeout(timer) : () => {};
    }, [displayed]);

    return (
        <div className={`bubble toasterwrapper ${displayed ? "display fadeInFromBottom" : ""}`}
            onClick={() => {
                    if(timer)
                        clearTimeout(timer);
                    closeToaster();
                }
            }
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