import React from "react";
import Table from "components/molecules/table/Table";

const GoalsToMonitor = ({teacher}) => {
    const classrooms = Object.values(teacher.classrooms);
    const students = Object.values(teacher.students);
    const goals = Object.values(teacher.goals);

    const dataObjects = goals.filter(goal => goal.completionDate && goal.monitor).map(goal => {
        let student = students.find(stu => stu.id === goal.studentId);

        return (
            {
                goalName: goal.goalName,
                studentName: student.name,
                classroom: classrooms.find(cr => cr.id === student.classroomId).className,
                masteryDate: goal.completionDate
            }
        )
    })

    return (
            <Table
                headers={["Student", "Classroom", "Goal", "Mastery Date"]}
                tableData={dataObjects}
            />
    );
};

export default GoalsToMonitor;