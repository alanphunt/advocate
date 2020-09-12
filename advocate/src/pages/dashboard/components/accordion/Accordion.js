import React from "react";
import AccordionItem from "./AccordionItem";


const Accordion = (props) => {
    const {data, icons, sendIndexUp, allOpen, openIndex} = {...props};
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
                                props.children[index]
                            }
                        </AccordionItem>
                    )
                })
            }
        </div>
    )
};

export default Accordion;