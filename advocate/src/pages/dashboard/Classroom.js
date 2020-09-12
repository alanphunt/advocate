import React from 'react';
import Table from "./components/Table";
import Accordion from "./components/accordion/Accordion";


const Classroom = (props) => {
    return (
        <div className={"dash-main-inner"}>
            <div className={"card width-100"}>
                <div className={"cardheader"}>
                    <h2>Classrooms</h2>
                </div>
                <div className={"cardmain"}>
                    <Accordion
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
                </div>
            </div>
        </div>
    )
}

export default Classroom;
