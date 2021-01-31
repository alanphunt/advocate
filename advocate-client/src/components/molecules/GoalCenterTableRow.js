import React, {useState} from "react";
import TableAccordionGroup from "./table/TableAccordionGroup";
import AccordionItem from "components/atoms/AccordionItem";
import Table from "./table/Table";
import {mapStudentGoalMeta} from "utils/functions/functions";
import Box from "components/atoms/Box";

const GoalCenterTableRow = ({teacher, setStudentId}) => {

    const hasClassroomsWithStudents = !!Object.keys(teacher.students);
    const tableHeaders = ["Name", "Goal Count", "Goal Completion %"];
    const [studentIndex, setStudentIndex] = useState(-1);
    const [selectedClassroomIndex, setSelectedClassroomIndex] = useState(-1);

    const handleSelectedStudent = (student, studentIndex, classroomIndex) => {
        setSelectedClassroomIndex(classroomIndex);
        setStudentIndex(studentIndex);
        setStudentId(student.id);
    };

    return (
        <div className={"goalcenterrow goalcenterrowmarg"}>
            {
                hasClassroomsWithStudents
                    ? (
                        <TableAccordionGroup>
                            {
                                Object.values(teacher.classrooms).map((classroom, classroomIndex) => {
                                    return (
                                        <AccordionItem header={classroom.className} preOpened key={`accItem-${classroom.className}`}>
                                            <Table
                                                headers={tableHeaders}
                                                tableData={
                                                    classroom.studentIds.map(id => mapStudentGoalMeta(teacher.students[id],
                                                        teacher.students[id].goalIds.map(goalId => teacher.goals[goalId])
                                                            .map(goal => ({...goal, benchmarks: goal.benchmarkIds.map(bmId => teacher.benchmarks[bmId])}
                                                            ))))
                                                }
                                                selectedCallback={(student, studentIndex) => handleSelectedStudent(student, studentIndex, classroomIndex)}
                                                selectedRowIndex={classroomIndex === selectedClassroomIndex ? studentIndex : -1}
                                            />
                                        </AccordionItem>
                                    )
                                })
                            }
                        </TableAccordionGroup>
                    ) : <Box text={"No classrooms. Visit the classroom page to create a classroom."}/>
            }
        </div>
    );
};

export default GoalCenterTableRow;
