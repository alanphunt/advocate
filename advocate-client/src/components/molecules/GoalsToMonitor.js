import React from "react";
import Table from "components/molecules/table/Table";

const GoalsToMonitor = ({teacher}) => {
    const classrooms = Object.values(teacher.classrooms);
    const goals = Object.values(teacher.goals);

    const dataObjects = goals.filter(goal => goal.complete && goal.monitor).map(goal => {
        let student = teacher.students[goal.studentId];

        return (
            {
                id: student.id,
                studentName: student.name,
                classroom: classrooms.find(cr => cr.id === student.classroomId).className,
                goalName: goal.goalName,
                masteryDate: goal.completionDate
            }
        )
    })

    return (
            <Table
                headers={["Student", "Classroom", "Goal", "Mastery Date"]}
                tableData={dataObjects}
                hideSearchAndSort
            />
    );
};

export default GoalsToMonitor;