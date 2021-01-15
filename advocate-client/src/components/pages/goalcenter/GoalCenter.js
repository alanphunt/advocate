import React, {useState} from "react";
import GoalDrilldown from "components/molecules/GoalDrilldown";
import DashCard from "components/molecules/DashCard";
import {studentGoalMeta} from "utils/functions/functions";
import { useAuth } from "utils/auth/AuthHooks";
import TableAccordionGroup from "components/molecules/TableAccordionGroup";
/*
    notes:
    we have to use indexes because if we store objects that we plan on updating, the teacher object will get updated but
    local state will stay the same
*/
const GoalCenter = () =>{
    const {teacher} = useAuth();
    const hasClassroomsWithStudents = teacher.classrooms?.length > 0 && teacher.classrooms[0].students.length > 0;

    const [studentIndex, setStudentIndex] = useState(-1);
    const [classroomIndex, setClassroomIndex] = useState(-1);

    const handleSelectedStudent = (student, studentIndex, classIndex) => {
        setClassroomIndex(classIndex);
        setStudentIndex(studentIndex);
    };

    const updateStudent

    return (
        <DashCard fitOnPage>
            <div className={"goalcenterrow goalcenterrowmarg"}>
            {
                hasClassroomsWithStudents
                    ? <TableAccordionGroup
                        allOpen
                        tableHeaders={["Name", "Goal Count", "Goal Completion %"]}
                        accordionHeaders={teacher.classrooms.map(cr => cr.className)}
                        tableData={teacher.classrooms.map(cr => studentGoalMeta(cr.students))}
                        selectedRowCallback={(student, classIndex, studentIndex) => handleSelectedStudent(student, studentIndex, classIndex)}
                        includeCountInAccordionHeader
                    />
                    : <></>
                }
            </div>
            <div className={"goalcenterrow goalcenterrowmarg"}>
                <GoalDrilldown
                    setStudentIndex={setStudentIndex}
                    studentIndex={studentIndex}
                    classroomIndex={classroomIndex}
                />
            </div>
        </DashCard>
    )
};

export default GoalCenter;