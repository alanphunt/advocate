import React, {useState, useEffect} from "react";
import Table from "components/collectives/Table";
import Accordion from "components/collectives/Accordion";
import {FaCheck as CheckIcon, FaRegHandPointRight as RedirectIcon, FaCopy as CopyIcon, FaUndo as NewGoalIcon} from "react-icons/fa";
import GoalForm from "components/collectives/GoalForm";
import GetStarted from "components/singletons/GetStarted";
import DashWidget from "components/collectives/DashWidget";
import DashCard from "components/collectives/DashCard";
import {Redirect, useLocation} from "react-router";
import {ERROR_STATUS, STORAGE} from "utils/constants";
import CompletionModal from "components/collectives/CompletionModal";
import Button from "components/singletons/Button";
import {checkLocalForCreated} from "components/functions/functions";

const CreateGoal = ({ teacher, updateTeacher, hasClassroomsWithStudents, logout}) => {
    let createGoalFor = useLocation().state;
    const goalObj = {
        goalName: "",
        startDate: "",
        masteryDate: "",
        process: "",
        monitor: 0,
        benchmarks: [],
        studentId: createGoalFor?.student?.id || ""
    };
    const formInputs = {
        goalName: "",
        goal: "",
        masteryDate: "",
        startDate: "",
        process: "",
        benchmarks: ""
    };
/*    let stuObj = {
        classroomIndex: 999,
        studentIndex: 999
    };*/


    useEffect(() => {
        if(createGoalFor){
/*            if(isNaN(createGoalFor.classroomIndex)){
                setSelectedStudentIndex(parseInt(createGoalFor.studentIndex));
                setSelectedClassroomIndex(parseInt(createGoalFor.classroomIndex));
            }*/

/*                stuObj = {
                    studentIndex: parseInt(createGoalFor.studentIndex),
                    classroomIndex: parseInt(createGoalFor.classroomIndex)
                };*/
            //else{
                setSelectedStudentIndex(createGoalFor.studentIndex);
                setSelectedClassroomIndex(createGoalFor.classroomIndex);
            //}
/*                stuObj = {
                    studentIndex: createGoalFor.studentIndex,
                    classroomIndex: createGoalFor.classroomIndex
                }*/
        }
        return (() => {
            checkLocalForCreated("goalCreated");
        });
    }, []);

    const [goal, setGoal] = useState(goalObj);
    const goalCreated = !!localStorage.getItem("goalCreated") || false;
    // const [goalCreated, setGoalCreated] = useState(localStorage.getItem("goalCreated") || false);
    //const [selectedStuObj, setSelectedStuObj] = useState(stuObj);
    const [selectedClassroomIndex, setSelectedClassroomIndex] = useState(999);
    const [selectedStudentIndex, setSelectedStudentIndex] = useState(999);
    const [displayModal, setDisplayModal] = useState(false);
    const [formErrors, setFormErrors] = useState({ formInputs });
    const [newTeacherData, setNewTeacherData] = useState(null);

    const handleSelected = (stu, stuIndex, crInd) => {
        // let selected = {classroomIndex: crInd, studentIndex: stuIndex};

        if(goal.studentId !== stu.id) {
            setGoal({...goal, studentId: stu.id});
            setSelectedStudentIndex(stuIndex);
            setSelectedClassroomIndex(crInd);
            // setSelectedStuObj(selected);
        }
        else {
            // selected.classroomIndex = 999;
            // selected.studentIndex = 999;
            setGoal({...goal, studentId: ""});
            setSelectedStudentIndex(stuIndex);
            setSelectedClassroomIndex(crInd);
            // setSelectedStuObj(selected);
        }

    };

    const confirmGoalCreation = () => {
        localStorage.setItem("goalCreated", "true");
        updateTeacher(newTeacherData);
    };

    const createGoal = () => {
        const fd = new FormData();
        let updatedGoals = JSON.parse(JSON.stringify(goal));

        Object.keys(updatedGoals).forEach(key => {
            fd.append(key, (key === "benchmarks" ? JSON.stringify(updatedGoals[key]) : updatedGoals[key]));
        });
        fetch("/api/creategoal", {method: "POST", body: fd})
            .then(response => Promise.all([response.ok, response.ok ? response.json() : response.text(), response.status]))
            .then(([ok, data, status]) => {
                if(ok){
                    setNewTeacherData(data);
                    setDisplayModal(true);
                }else if(status !== ERROR_STATUS){
                    setFormErrors(JSON.parse(data));
                }else{
                    logout();
                }
        });
    };

    const closeModal = () => {
        localStorage.removeItem("goalCreated");
        setDisplayModal(prevState => !prevState);
    };

    const resetState = () => {
        setGoal(goalObj);
        setSelectedClassroomIndex(999);
        setSelectedStudentIndex(999);
        displayModal(false);
        formErrors({formInputs});
        setNewTeacherData(null);
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
                    <CompletionModal
                        displayed={displayModal}
                        closeModal={closeModal}
                    >
                        <>
                            <Button className={"marg-right"} text={"Go to Goal Center"} icon={<RedirectIcon className={"i-right"}/>} onClick={confirmGoalCreation}/>
                            <Button className={"marg-right"} text={"Apply Goal to New Student"} icon={<CopyIcon className={"i-right"}/>} onClick={closeModal}/>
                            <Button text={"Create New Goal"} icon={<NewGoalIcon className={"i-right"}/>} onClick={resetState}/>
                        </>
                    </CompletionModal>
                    <GoalForm goal={goal} updateGoal={setGoal} formErrors={formErrors}/>
                    <div className={"marg-bot-2"}>
                        <h3 className={"i-bottom"}>Apply to which student</h3>
                        <Accordion
                            array={teacher.classrooms}
                            data={teacher.classrooms.map(cr => cr.className)}
                            openIndex={selectedClassroomIndex !== 999 ? selectedClassroomIndex : null}
                        >
                            {
                                teacher.classrooms.map((cr, crInd) =>
                                    <Table
                                        selectable={true}
                                        selectedCallback={(stu, ind) => {
                                            handleSelected(stu, ind, crInd);
                                        }}
                                        selectedRowIndexes={ selectedClassroomIndex === crInd ? selectedStudentIndex : 999 }
                                        studentTable={true}
                                        key={`attachgoaltostudent${crInd}`}
                                        data={cr.students}
                                    />
                                )
                            }
                        </Accordion>
                    </div>
                    <Button
                        className={
                            Object.values(goal).some(v => v === "" || v.length === 0)
                                ? "disabled" : ""}
                        onClick={createGoal}
                        icon={<CheckIcon className={"i-right"}/>}
                        text={"Create Goal"}
                    />
                  </DashCard>
    )
};

export default CreateGoal;
