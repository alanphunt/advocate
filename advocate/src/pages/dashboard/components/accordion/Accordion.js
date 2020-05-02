import React from "react";
import AccordionItem from "./AccordionItem";


const Accordion = (props) => {
    //const name = Object.keys(props.array[0]).filter(k => k.toLowerCase().includes("name"));
    const name = props.name;
    const opened = props.open;

    return (
        <div className={"accordion"}>
            {
                props.array.map((value, index) => {
                    return(
                        <AccordionItem open={opened} key={`acc-item${index}`} header={typeof name === "object" ? name[index] : name} object={value} index={index}>
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