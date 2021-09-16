import React from "react";
import H2 from "../atoms/H2";

const DashWidget = ({className, flexSize, cardMainHeight, children, header}) => {
    return (
        <div className={`card ${className || ""}`} style={{'flex': flexSize}}>
            <div className={`${cardMainHeight ? "height-100" : ""}`}>
                {
                    header
                    ? <div className="cardheader"><H2>{header}</H2></div>
                    : <></>
                }
                {children}
            </div>
        </div>
    )
};

export default DashWidget;