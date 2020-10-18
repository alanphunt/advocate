import React from 'react';
import Table from "./components/Table";
import Accordion from "./components/accordion/Accordion";
import DashCard from "./components/DashCard";


const Classroom = (props) => {
    return (
        <DashCard
            header={"Classrooms"}
        >
            {
                props.teacher.classrooms.length > 0
                    ? <Accordion
                        array={props.teacher.classrooms}
                        data={props.teacher.classrooms.map(v => v.className)}>
                        {
                            props.teacher.classrooms.map((cr, ind) =>
                                <Table
                                    key={`classroomtable${ind}`}
                                    data={cr.students}
                                    filterable={true}
                                    studentTable={true}
                                />
                            )
                        }
                    </Accordion>
                    : <></>
            }
        </DashCard>
    )
}

export default Classroom;
