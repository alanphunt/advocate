import React from "react";
import TableAccordionGroup from "../table/TableAccordionGroup";
import AccordionItem from "../../atoms/AccordionItem";
import Table from "../table/Table";
import {BASIC_STUDENT_TABLE_HEADERS} from "../../../utils/constants";
import DashWidget from "../DashWidget";

const ClassroomWidget = ({classrooms, students}) => {

    return (
        <DashWidget flexSize={2} header={"Classrooms"}>
            <TableAccordionGroup>
                {
                    Object.values(classrooms).map((classroom, index) => {
                        return (
                            <AccordionItem header={classroom.className} key={`dashmainClassroom-${classroom.className}`}>
                                <Table
                                    tableData={classroom.studentIds.map(id => students[id])}
                                    headers={BASIC_STUDENT_TABLE_HEADERS}
                                    dataKeys={["name", "age", "grade"]}
                                />
                            </AccordionItem>
                        )
                    })
                }
            </TableAccordionGroup>
        </DashWidget>
    );
};

export default ClassroomWidget;
