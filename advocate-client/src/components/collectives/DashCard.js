import React from "react";

/*
    props:
        children: object - the actual content of the card
        className: string - additional class names for the card
        closeModal: function - the callback to close the modal of the parent
        header: String - the header for the card
        noCanvas: boolean - if you just want a widget layout w/ no background
 */

const DashCard = (props) => {
    const {children, className, closeModal, header, noCanvas} = {...props};
    return (

        <div className={`dash-main-inner ${className || ""}`} onClick={closeModal || null}>
            {
                noCanvas
                    ? <>{ children }</>
                    : <div className={"card width-100"}>
                        <div className={"cardheader"}><h2>{ header }</h2></div>
                        <div className={"cardmain"}>
                            { children }
                        </div>
                      </div>
            }
        </div>
    )
};

export default DashCard;