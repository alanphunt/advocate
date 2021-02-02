import React, {useState} from "react";
import {crudFetch} from "utils/functions/functions";
import TableAccordionGroup from "./table/TableAccordionGroup";
import {BASIC_STUDENT_TABLE_HEADERS, BASIC_STUDENT_TABLE_KEYS} from "utils/constants";
import ConfirmOrCancelButtons from "./ConfirmOrCancelButtons";
import Section from "../atoms/Section";

const CopyGoal = ({goal, students, classrooms, completeCrudOp, closeModal, signout}) => {
    const [student, setStudent] = useState(null);

    const fetchCopyGoal = () => {
        crudFetch({
            path: `/copygoal?goalId=${goal.id}&studentId=${student.id}`,
            method: "GET",
            success: (data) => completeCrudOp(data,`Successfully copied ${goal.goalName} to ${student.name}!`),
            error: () => {},
            serverError: signout
        });
    };

    return (
        <div>
            <Section>
                <TableAccordionGroup
                    allOpen
                    accordionHeaders={classrooms.map(cr => cr.className)}
                    tableHeaders={BASIC_STUDENT_TABLE_HEADERS}
                    tableData={classrooms.map(cr => cr.studentIds.map(id => students[id]))}
                    dataKeys={BASIC_STUDENT_TABLE_KEYS}
                    selectedCallback={(student, crInd, stuInd) => setStudent(student)}
                />
            </Section>
            <ConfirmOrCancelButtons
                confirmCallback={fetchCopyGoal}
                cancelCallback={closeModal}
            />
        </div>
    );
};

export default CopyGoal;
