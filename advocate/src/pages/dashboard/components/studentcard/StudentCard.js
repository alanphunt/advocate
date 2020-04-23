import React from "react";
import {calculateGoalCompletion} from "../../GoalCenter";
import StudentCardExtended from "./StudentCardExtended";

const StudentCard = (props) => {
    const stu = props.student;
    const display = props.displayed;
    return (
        <div className={"card studentcard"} onClick={() => {!display && props.updateDisplayed(props.index)}}>
            <div className={"stucard-upper marg-bot-2"}>
                <h2 className={"i-bottom"}>{stu.name}</h2>
                <p>Goal focus: {stu.goalFocus}</p>
            </div>
            <div className={"stucard-lower"}>
                <p>Goal count: <strong>{stu.goals.length}</strong></p>
                <p>Goal Completion Rate: <strong>{calculateGoalCompletion(stu)}%</strong></p>
            </div>

            <StudentCardExtended display={display} student={stu} updateDisplayed={props.updateDisplayed}/>
        </div>
    )
};

export default StudentCard;