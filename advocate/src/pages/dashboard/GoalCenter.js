import React from "react";
import Accordion from "./components/accordion/Accordion";

const GoalCenter = (props) =>{
    const students = props.teacher.classrooms[0].students;

    return (
        <div className={"dash-main-inner"}>
            <div className={"card width-100"}>
                <div className={"cardheader"}><h2>Goal Center</h2></div>

                <div className={"cardmain"}>
                    <Accordion array={props.teacher.classrooms}/>
                </div>
            </div>
        </div>
    )
};

export const calculateGoalCompletion = (student) => {
    const goals = student.goals;
    const goalCount = goals.length || 0;
    const completedGoals = goals.filter(goal => goal.benchmarks.filter(bm => bm.complete === 1).length === goal.benchmarks.length).length;
    let percent = Math.round((completedGoals / goalCount) * 100);
    return isNaN(percent) ? 0 : percent;
};

export default GoalCenter;