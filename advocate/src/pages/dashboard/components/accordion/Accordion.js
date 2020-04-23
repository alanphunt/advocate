import React, {useState} from "react";
import AccordionItem from "./AccordionItem";
import StudentCard from "../studentcard/StudentCard";

const Accordion = (props) => {
    const name = Object.keys(props.array[0]).filter(k => k.toLowerCase().includes("name"));

    const [extCard, setExtCard] = useState();

    return (
        <div className={"accordion"}>
            {
                props.array.map((value, index) => {
                    return(
                        <AccordionItem key={`acc-item${index}`} header={name} object={value} index={index}>
                            {
                                value.students.map((student, stuind) => {
                                    return <StudentCard
                                        index={`${index}${stuind}`}
                                        updateDisplayed={setExtCard}
                                        displayed={extCard === `${index}${stuind}`}
                                        key={`${student.name}stucard${stuind}`}
                                        student={student}
                                    />
                                })
                            }
                        </AccordionItem>
                    )
                })
            }
        </div>
    )
};

export default Accordion;