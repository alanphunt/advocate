import React from "react";

const DashWidget = (props) => {
    return (
        <div className={`card ${props.className || ""}`} style={{'flex': props.flexSize}}>
            {
                props.header
                    ? <div className={"cardheader"}><h2>{props.header}</h2></div>
                    : <></>
            }
            <div className={`cardmain ${props.cardMainHeight ? "height-100" : ""}`}>
                {props.children}
            </div>
        </div>
    )
};

export default DashWidget;