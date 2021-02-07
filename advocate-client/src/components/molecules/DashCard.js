import React from "react";

/*
    props:
        children: object - the actual content of the card
        className: string: optional - additional class names for the card
        closeModal: function: optional - the callback to close the modal of the parent
        fitOnPage: boolean: optional - adds flex class to parent to spread out the children to fit on a single view (goal center page)
 */

const DashCard = ({children, className, closeModal, fitOnPage}) => {
    return (
        <div className={`overflow-auto dash-main-inner ${className || ""}`} onClick={closeModal || null}>
            <div className={`width-100 height-100${fitOnPage ? " row-wrapper" : ""}`}>
                { children }
            </div>
        </div>
    )
};

export default DashCard;