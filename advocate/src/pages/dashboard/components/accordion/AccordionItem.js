import React, {useState} from "react";

const AccordionItem = (props) => {
    const name = props.header;
    const ind = props.index;
    const obj = props.object;
    const [open, setOpen] = useState(false);
    const openClass = `acc-item-main ${open ? "display" : ""}`;
    return (
        <div className={"acc-item"}>
            <div className={"acc-item-head"} onClick={()=>{setOpen(!open)}}>
                <h2><i className={`fas fa-caret-down ${open ? "caretflip" : ""} i-right transition`}/>{obj[name]}</h2>
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