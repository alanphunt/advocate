import React from "react";
import Table from "components/molecules/table/Table";

const GoalsToMonitor = ({teacher}) => {
    const classrooms = Object.values(teacher.classrooms);
    const students = Object.values(teacher.students);
    const goals = Object.values(teacher.goals);
    const dataObjects = [];

    goals.forEach(goal => {
        if(goal.completionDate && goal.monitor){
            let student = students.find(stu => stu.id === goal.studentId);
            dataObjects.push({
                goalName: goal.goalName,
                studentName: student.name,
                classroom: classrooms.find(cr => cr.id === student.classroomId).className,
                masteryDate: goal.completionDate
            })
        }
    })
    
/* 
    const extractMonitorGoals = () => {
        classrooms.forEach((cr, crInd) => {
            students.forEach((stu, stuInd) => {
                stu.goals.forEach((gl, glInd) => {
                    if(gl.completionDate && gl.monitor){
                        dataObjects.push({
                            studentName: stu.name,
                            classroom: cr.className,
                            goalName: gl.goalName,
                            masteryDate: gl.completionDate
                        });
                    }
                });
            });
        });
    };

    extractMonitorGoals(); */

    return (
            <Table
                headers={["Student", "Classroom", "Goal", "Mastery Date"]}
                tableData={dataObjects}
            />
    );
};

export default GoalsToMonitor;