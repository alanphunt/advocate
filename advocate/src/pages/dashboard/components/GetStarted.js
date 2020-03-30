import React from "react";
import {Link} from "react-router-dom";

const GetStarted = (props) => {
    return (
        <Link to={props.to} className={"getstarted br"} onClick={()=>{props.navHandler.updateActiveCategory("classroom")}}>
            {props.children}
        </Link>
    )
};

export default GetStarted;