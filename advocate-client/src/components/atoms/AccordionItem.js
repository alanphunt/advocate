import React, {useState, useEffect} from "react";
import {FaCaretDown as CaretIcon} from "react-icons/fa";

/*
     props:
        header: string- used for the header
        children: object- renders the object inside the accordion item
        index: number- used for callbacks attached to the icons to indicate which object to perform an action on
        icons: object: optional- {key: <Icon/>}
        sendIndexUp: function(key, index): optional- 
        open: boolean: optional- determines if this accordion item should be rendered as open 
     state:

*/

const AccordionItem = ({header, icons, index, sendIndexUp, open: preOpened, children}) => {
    const [open, setOpen] = useState(preOpened || false);
    const openClass = `acc-item-main ${open ? "display" : ""}`;
    //this is for when a user is redirected to a page and essentially needs derived state from useLocation.state
    //this componenet won't rerender if the props.open is passed from that because it's not stateful
    useEffect(() => {
        if(preOpened)
            setOpen(true);
    }, [preOpened]);

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
                                    //prevents accordion item from closing
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
                      children
                    }
                </div>
            </div>
        </div>
    )
};

export default AccordionItem;