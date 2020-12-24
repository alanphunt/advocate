import React from "react";
import AccordionItem from "components/atoms/AccordionItem";
/*
    props:
        data- string array or single string-
        icons: object- {action: <IconComponent>}
        sendIndexUp: function- a callback to indicate which accordian item is focused
        allOpen: boolean- indicates whether all accordian items should render open
        openIndex: number- the specific accordian item that should be prerendered as open
        children: object- the children that will be rendered in the accordion item
 */

const Accordion = ({data, icons, sendIndexUp, allOpen, openIndex, children}) => {

    return (
        <div className={"accordion"}>
            {
                data.map((value, index) => {
                    return(
                        <AccordionItem
                            open={allOpen || openIndex === index}
                            key={`acc-item${index}`}
                            header={typeof data === "object" ? data[index] : data}
                            object={value}
                            index={index}
                            icons={icons || null}
                            sendIndexUp={sendIndexUp}
                        >
                            {
                                children.length
                                    ? children[index]
                                    : children
                            }
                        </AccordionItem>
                    )
                })
            }
        </div>
    )
};

export default Accordion;