import React from "react";
import NewTable from "./NewTable";

const GoalsToMonitor = (props) => {
    const teacher = props.teacher;
    const dataObjects = [];

    const extractMonitorGoals = () => {
        teacher.classrooms.forEach((cr, crInd) => {
            cr.students.forEach((stu, stuInd) => {
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

    extractMonitorGoals();

    return (
            <NewTable
                headers={["Student", "Classroom", "Goal", "Mastery Date"]}
                data={dataObjects}
            />
    );
};

export default GoalsToMonitor;