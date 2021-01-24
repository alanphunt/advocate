import React, {useState, useEffect} from "react";
import {FaCaretDown as CaretIcon} from "react-icons/fa";

/*
     props:
        header: string- used for the header
        icons: object: optional- {key: <Icon/>}
        iconClickedCallback: function(key, index): optional-
        preOpened: boolean: optional- determines if this accordion item should be rendered as open
        children: object- renders the object inside the accordion item
     state:

*/

const AccordionItem = ({header, icons, iconClickedCallback, preOpened, children}) => {
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
                            Object.keys(icons).map((key, index) => {
                                return <span key={`iconaction-${key}-${index}`} onClick={(e) => {
                                    //prevents accordion item from closing
                                    e.stopPropagation();
                                    iconClickedCallback(key, index);
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