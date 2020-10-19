import React from 'react';
import Accordion from "components/collectives/Accordion";
import Table from "components/collectives/Table";
import DashCard from "components/collectives/DashCard";


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
