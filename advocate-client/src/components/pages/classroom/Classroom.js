import React from 'react';
<<<<<<< HEAD:advocate-client/src/components/pages/classroom/Classroom.js
import Accordion from "components/collectives/Accordion";
import Table from "components/collectives/Table";
import DashCard from "components/collectives/DashCard";
=======
import Table from "./components/Table";
import Accordion from "./components/accordion/Accordion";
import DashCard from "./components/DashCard";
>>>>>>> a95f801ec3a4c1b1baef8efb874e845b688000e5:advocate/src/pages/dashboard/Classroom.js


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
