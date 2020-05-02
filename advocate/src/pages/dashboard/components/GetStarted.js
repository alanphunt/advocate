import React from "react";
import {Link} from "react-router-dom";

const GetStarted = (props) => {
    return (
        <Link push={"true"} to={props.to} className={"getstarted br"}>
            {props.children}
        </Link>
    )
};

export default GetStarted;