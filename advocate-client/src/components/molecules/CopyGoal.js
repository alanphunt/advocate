import React, {useState} from "react";
import {crudFetch} from "utils/functions/functions";
import TableAccordionGroup from "./table/TableAccordionGroup";
import {BASIC_STUDENT_TABLE_HEADERS, BASIC_STUDENT_TABLE_KEYS, JSON_HEADER} from "utils/constants";
import ConfirmOrCancelButtons from "./ConfirmOrCancelButtons";
import Section from "components/atoms/Section";
import Checkbox from "./Checkbox";

const CopyGoal = ({goal, students, classrooms, completeCrudOp, closeModal, signout}) => {
    const [student, setStudent] = useState(null);
    const [includeBenchmarks, setIncludeBenchmarks] = useState(false);

    const fetchCopyGoal = () => {
        let goalDTO = {
            id: "",
            complete: 0,
            enabled: 1,
            goal: goal.goal,
            goalName: goal.goalName,
            monitor: goal.monitor,
            startDate: goal.startDate,
            masteryDate: goal.masteryDate,
            studentId: student.id,
            benchmarks: includeBenchmarks ? goal.benchmarks : []
        };

        crudFetch({
            path: `/copygoal`,
            method: "POST",
            body: JSON.stringify(goalDTO),
            headers: JSON_HEADER,
            success: (data) => completeCrudOp(data,`Successfully copied ${goal.goalName} to ${student.name}!`),
            error: () => {},
            serverError: () => {}
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
            <Section>
                <Checkbox
                    text={"Include benchmarks?"}
                    condition={includeBenchmarks}
                    updateCondition={setIncludeBenchmarks}
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
