import React, {useState} from "react";
import Table from "./components/Table";
import Accordion from "./components/accordion/Accordion";
import {FaCheck as CheckIcon} from "react-icons/fa";
import GoalForm from "./components/GoalForm";
import GetStarted from "./components/GetStarted";

const CreateGoal = (props) => {

    const [goal, setGoal] = useState({
        goalName: "",
        startDate: "",
        masteryDate: "",
        process: "",
        monitor: "",
        benchmarks: [],
        studentId: ""
    });

    const [selectedStuObj, setSelectedStuObj] = useState({crInd: 999, stuInd: 999});

    const handleSelected = (stu, stuIndex, crInd) => {
        let selected = {crInd: crInd, stuInd: stuIndex};

        if(goal.studentId !== stu.id) {
            setGoal({...goal, studentId: stu.id});
            setSelectedStuObj(selected);
        }
        else {
            selected.crInd = 999;
            selected.stuInd = 999;
            setGoal({...goal, studentId: ""});
            setSelectedStuObj(selected);
        }

    };

    const createGoal = () => {
        const fd = new FormData();
        let updatedGoals = JSON.parse(JSON.stringify(goal));

        Object.keys(updatedGoals).forEach(key => {
            fd.append(key, (key === "benchmarks" ? JSON.stringify(updatedGoals[key]) : updatedGoals[key]));
        });
        fetch("/api/creategoal", {method: "POST", body: fd, headers: {"Authorization": `Bearer ${sessionStorage.authorization}`}})
            .then(r => r.text())
            .then(d => {
                alert("Successfully created a new goal! You'll be redirected to the goal center.")
                window.location = "/dashboard/goalcenter";
        });
    };

    return (
        props.teacher.classrooms.length === 0 || props.teacher.classrooms[0]?.students.length === 0
            ? <div className={"card height-50"}>
                <GetStarted to={"/dashboard/classroom/create"}>
                    <h2>Create a classroom with students to get started.</h2>
                </GetStarted>
              </div>
            : <div className={"dash-main-inner"}>
                <div className={"card width-100"}>
                    <div className={"cardheader"}><h2>Create a Goal</h2></div>
                    <div className={"cardmain"}>
                        <GoalForm goal={goal} updateGoal={setGoal}/>
                        <h3 className={"i-bottom"}>Apply to which student</h3>
                        <Accordion
                            array={props.teacher.classrooms}
                            data={props.teacher.classrooms.map(cr => cr.className)}
                        >
                            {
                                props.teacher.classrooms.map((cr, crInd) =>
                                    <Table
                                        selectable={true}
                                        selectedCallback={(stu, ind) => {
                                            handleSelected(stu, ind, crInd);
                                        }}
                                        selectedRowIndexes={ selectedStuObj.crInd === crInd ? selectedStuObj.stuInd : 999 }
                                        studentTable={true}
                                        key={"attachgoaltostudent"}
                                        data={cr.students}
                                    />
                                )
                            }
                        </Accordion>
                    </div>
                    <div className={"cardfooter"}>
                        <button
                            className={
                                Object.values(goal).some(v => v === "" || v.length === 0)
                                ? "disabled" : ""}
                            onClick={createGoal}
                        >
                            <CheckIcon className={"i-right"}/>
                            <span>Create Goal</span>
                        </button>
                    </div>
                </div>
            </div>
    )
};

export default CreateGoal;