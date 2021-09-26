import React, {useState, useEffect} from "react";
import {FaCaretDown as CaretIcon} from "react-icons/fa";
import H3 from "./H3";

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
    if (preOpened)
      setOpen(true);
  }, [preOpened]);

  const stopProp = (e, key, index) => {
    //prevents accordion item from closing
    e.stopPropagation();
    iconClickedCallback(key, index);
  };

  return (
    <div className={"acc-item"}>
      {/*<div className={"acc-item-head"} onClick={()=>{modifyOpen(index);}}>*/}
      <div className={"acc-item-head"} onClick={() => {
        setOpen(prevState => !prevState)
      }}>
        <H3 classes={"flex-center-vert"}>
          <CaretIcon className={`${open ? "caretflip" : ""} i-right transition`}/>
          {header}
        </H3>
        {
          icons &&
          <H3 classes={"flex-center-vert"}>
            {
              Object.keys(icons).map((key, index) => {
                return <span className="flex" key={`iconaction-${key}-${index}`} onClick={(e) => stopProp(e, key, index)}>{icons[key]}</span>;
              })
            }
          </H3>
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