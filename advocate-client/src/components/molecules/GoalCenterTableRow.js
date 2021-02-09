import React, {useEffect, useState} from "react";
import TableAccordionGroup from "./table/TableAccordionGroup";
import AccordionItem from "components/atoms/AccordionItem";
import Table from "./table/Table";
import {mapStudentGoalMeta} from "utils/functions/functions";
import Box from "components/atoms/Box";

const GoalCenterTableRow = ({teacher, student, setStudentId}) => {

    const hasClassroomsWithStudents = !!Object.keys(teacher.students).length;
    const tableHeaders = ["Name", "Goal Count", "Goal Completion %"];
    // const [selectedClassroomIndex, setSelectedClassroomIndex] = useState(-1);

    useEffect(() => {
        //this is for creating a new goal and selecting a new student in the modal
        if(student) {
            let crIndex = -1;
            let stuIndex = -1;
            Object.values(teacher.classrooms).forEach((cr, crInd) => {
                if(cr.id === student.classroomId){
                    crIndex = crInd;
                    stuIndex = cr.studentIds.indexOf(student.id);
                }
            });
/*            if (crIndex !== -1 || stuIndex !== -1) {
                updateIndexesFromGoalCreation(stuIndex, crIndex);
            }*/
        }
    }, [student]);

    // const updateIndexesFromGoalCreation = (studentIndex, classroomIndex) => {
    //     setSelectedClassroomIndex(classroomIndex);
    // };

    const handleSelectedStudent = (student, studentIndex, classroomIndex) => {
        // setSelectedClassroomIndex(classroomIndex);
        setStudentId(student.id);
    };

    return (
        <div className={"goalcenter-row goalcenter-row-top"}>
            <h2 className={"marg-bot"}>Select a student to begin</h2>
            {
                hasClassroomsWithStudents
                    ? (
                        <TableAccordionGroup>
                            {
                                Object.values(teacher.classrooms).map((classroom, classroomIndex) => {
                                    return (
                                        <AccordionItem header={`${classroom.className} - (${classroom.studentIds.length})`} preOpened key={`accItem-${classroom.className}`}>
                                            <Table
                                                headers={tableHeaders}
                                                tableData={
                                                    classroom.studentIds.map(id => mapStudentGoalMeta(teacher.students[id],
                                                        teacher.students[id].goalIds.map(goalId => teacher.goals[goalId])
                                                            .map(goal => ({...goal, benchmarks: goal.benchmarkIds.map(bmId => teacher.benchmarks[bmId])}
                                                            ))))
                                                }
                                                selectedCallback={(student, studentIndex) => handleSelectedStudent(student, studentIndex, classroomIndex)}
                                                selectedRowId={student?.id}
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
