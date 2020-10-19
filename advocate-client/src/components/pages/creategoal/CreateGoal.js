import React, {useState} from "react";
import Table from "components/collectives/Table";
import Accordion from "components/collectives/Accordion";
import {FaCheck as CheckIcon} from "react-icons/fa";
import GoalForm from "components/collectives/GoalForm";
import GetStarted from "components/singletons/GetStarted";
import DashWidget from "components/collectives/DashWidget";
import DashCard from "components/collectives/DashCard";
import {Redirect} from "react-router";
import Modal from "components/collectives/Modal";

const CreateGoal = ({ teacher, updateTeacher, hasClassroomsWithStudents }) => {

    const [goal, setGoal] = useState({
        goalName: "",
        startDate: "",
        masteryDate: "",
        process: "",
        monitor: 0,
        benchmarks: [],
        studentId: ""
    });
    const [goalCreated, setGoalCreated] = useState(false);
    const [selectedStuObj, setSelectedStuObj] = useState({crInd: 999, stuInd: 999});
    const [displayModal, setDisplayModal] = useState(false);
    const formInputs = {
        goalName: "",
        goal: "",
        masteryDate: "",
        startDate: "",
        process: "",
        benchmarks: ""
    };
    const [formErrors, setFormErrors] = useState({ formInputs });
    const [newTeacherData, setNewTeacherData] = useState(null);
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

    const confirmGoalCreation = () => {
        updateTeacher(newTeacherData);
        setGoalCreated(true);
    };

    const createGoal = () => {
        const fd = new FormData();
        let updatedGoals = JSON.parse(JSON.stringify(goal));

        Object.keys(updatedGoals).forEach(key => {
            fd.append(key, (key === "benchmarks" ? JSON.stringify(updatedGoals[key]) : updatedGoals[key]));
        });
        fetch("/api/creategoal", {method: "POST", body: fd, headers: {"Authorization": `Bearer ${sessionStorage.authorization}`}})
            .then(response => Promise.all([response.ok, response.json(), response.headers]))
            .then(([ok, data, headers]) => {
                if(ok){
                    setDisplayModal(true);
                    setNewTeacherData(data);
                }else{
                    setFormErrors(data);
                }
        });
    };

    const closeModal = () => {
        setDisplayModal(prevState => !prevState);
    };

    return (
        !hasClassroomsWithStudents
            ? <DashWidget flexSize={1} className={"height-100"}>
                <GetStarted to={"/dashboard/classroom/create"}>
                    <h2>Get started by creating a classroom</h2>
                </GetStarted>
            </DashWidget>
            : goalCreated
                ? <Redirect to={"/dashboard/goalcenter"}/>
                : <DashCard header={"Create a Goal"}>
                    <Modal
                        displayed={displayModal}
                        closeModal={closeModal}
                        successModal={
                            {
                                successMessage: "Would you like to redirect to the goal center or create another goal?",
                                confirmCallback: confirmGoalCreation,
                                cancelCallback: closeModal,
                                cancelText: "Create another goal",
                                confirmText: "Go to Goal Center"
                            }}
                    />
                    <GoalForm goal={goal} updateGoal={setGoal} formErrors={formErrors}/>
                    <div className={"marg-bot-2"}>
                        <h3 className={"i-bottom"}>Apply to which student</h3>
                        <Accordion
                            array={teacher.classrooms}
                            data={teacher.classrooms.map(cr => cr.className)}
                        >
                            {
                                teacher.classrooms.map((cr, crInd) =>
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
                    <button
                        className={
                            Object.values(goal).some(v => v === "" || v.length === 0)
                                ? "disabled" : ""}
                        onClick={createGoal}>
                        <CheckIcon className={"i-right"}/>
                        <span>Create Goal</span>
                    </button>
                  </DashCard>
    )
};

export default CreateGoal;
