import React from "react";

const DashWidget = ({className, flexSize, header, cardMainHeight, children}) => {
    return (
        <div className={`card ${className || ""}`} style={{'flex': flexSize}}>
            {
                header
                    ? <div className={"cardheader"}><h2>{header}</h2></div>
                    : <></>
            }
            <div className={`cardmain ${cardMainHeight ? "height-100" : ""}`}>
                {children}
            </div>
        </div>
    )
};

export default DashWidget;