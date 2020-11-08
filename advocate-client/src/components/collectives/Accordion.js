import React, {useEffect, useState} from "react";
import AccordionItem from "components/singletons/AccordionItem";
/*
    props:
        data- object array-
        icons- component array-
        sendIndexUp- function-
        allOpen- number-
        openIndex- number-
 */

const Accordion = (props) => {
    const {data, icons, sendIndexUp, allOpen, openIndex} = {...props};

    // const [openIndexes, setOpenIndexes] = useState([]);

    // const addOrRemoveIndex = (index) => {
    //     if(openIndexes.includes(index))
    //         setOpenIndexes(openIndexes.filter(el => el !== index));
    //     else
    //         setOpenIndexes(openIndexes.concat(index));
    // };

    // useEffect(() => {
    //     if(openIndex !== null)
    //         addOrRemoveIndex(openIndex);
    // }, [openIndex]);



    return (
        <div className={"accordion"}>
            {
                data.map((value, index) => {
                    return(
                        <AccordionItem
                            open={allOpen || openIndex === index}
                            // open={allOpen || openIndexes.includes(index)}
                            // modifyOpen={addOrRemoveIndex}
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