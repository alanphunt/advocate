import React from "react";

const StudentInfoCard = ({student, benchmark}) => {
    const goal = student.goals.filter(goal => goal.id === benchmark.goalId)[0];

    return (
        <div className={"stuinfocardwrapper"}>
            <h3 className={"marg-bot"}>Trial for {student.name.substring(0,1).toUpperCase() + student.name.substring(1)}</h3>
            <p><strong>Goal: </strong>{goal.goalName}</p>
            <p><strong>Benchmark: </strong>{benchmark.label}</p>
            <p><strong>Description:</strong> {benchmark.description}</p>
        </div>
    )
};

export default StudentInfoCard;