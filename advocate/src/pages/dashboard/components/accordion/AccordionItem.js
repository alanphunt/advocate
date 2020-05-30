import React, {useState} from "react";
import {FaCaretDown as CaretIcon} from "react-icons/fa";

const AccordionItem = (props) => {
    const name = props.header;
    const [open, setOpen] = useState(props.open);
    const openClass = `acc-item-main ${open ? "display" : ""}`;
    return (
        <div className={"acc-item"}>
            <div className={"acc-item-head"} onClick={()=>{setOpen(!open)}}>
                <h2><CaretIcon className={`${open ? "caretflip" : ""} i-right transition`}/>{name}</h2>
            </div>
            <div className={openClass}>
                <div className={"acc-details width-100"}>
                    {
                      props.children
                    }
                </div>
            </div>
        </div>
    )
};

export default AccordionItem;