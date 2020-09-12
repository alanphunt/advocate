import React, {useState} from "react";
import {FaCaretDown as CaretIcon} from "react-icons/fa";

const AccordionItem = (props) => {
    const {header, icons, index, sendIndexUp} = {...props};
    const [open, setOpen] = useState(props.open || false);
    const openClass = `acc-item-main ${open ? "display" : ""}`;

    return (
        <div className={"acc-item"}>
            <div className={"acc-item-head"} onClick={()=>{setOpen(prevState => !prevState)}}>
                <h2 className={"flex-center-vert"}>
                    <CaretIcon className={`${open ? "caretflip" : ""} i-right transition`}/>
                    {header}
                </h2>
                {
                    icons &&
                    <h2>
                        {
                            Object.keys(icons).map(key => {
                                return <span key={`iconaction${key}`} onClick={(e) => {
                                    e.stopPropagation();
                                    sendIndexUp(key, index);
                                }}>{icons[key]}</span>;
                            })
                        }
                    </h2>
                }
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