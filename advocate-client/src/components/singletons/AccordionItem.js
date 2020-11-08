import React, {useState, useEffect} from "react";
import {FaCaretDown as CaretIcon} from "react-icons/fa";

const AccordionItem = (props) => {
    const {header, icons, index, sendIndexUp} = {...props};
    // const {header, icons, index, sendIndexUp, modifyOpen, open} = {...props};
    const [open, setOpen] = useState(props.open || false);
    const openClass = `acc-item-main ${open ? "display" : ""}`;
    //this is for when a user is redirected to a page and essentially needs derived state from useLocation.state
    //this componenet won't rerender if the props.open is passed from that because it's not stateful
    useEffect(() => {
        if(props.open)
            setOpen(true);
    }, [props.open]);

    return (
        <div className={"acc-item"}>
            {/*<div className={"acc-item-head"} onClick={()=>{modifyOpen(index);}}>*/}
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