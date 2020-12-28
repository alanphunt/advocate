import React from "react";

const DashWidget = ({className, flexSize, cardMainHeight, children, header}) => {
    return (
        <div className={`card ${className || ""}`} style={{'flex': flexSize}}>
            <div className={`${cardMainHeight ? "height-100" : ""}`}>
                {
                    header
                    ? <div className="cardheader"><h2>{header}</h2></div>
                    : <></>
                }
                {children}
            </div>
        </div>
    )
};

export default DashWidget;