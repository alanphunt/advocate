import React from "react";
import {Link} from "react-router-dom";
import {FaPlus as PlusIcon} from "react-icons/fa";

const GetStarted = (props) => {
    return (
        <Link push={"true"} to={props.to} className={"getstarted br"}>
            <PlusIcon className={"marg-bot"}/>
            {props.children}
        </Link>
    )
};

export default GetStarted;