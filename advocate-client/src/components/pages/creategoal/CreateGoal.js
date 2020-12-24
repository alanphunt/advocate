import React, {useState, useEffect, useContext} from "react";
import Accordion from "components/molecules/Accordion";
import {FaCheck as CheckIcon, FaRegHandPointRight as RedirectIcon, FaCopy as CopyIcon, FaUndo as NewGoalIcon} from "react-icons/fa";
import GoalForm from "components/molecules/GoalForm";
import GetStarted from "components/atoms/GetStarted";
import DashWidget from "components/molecules/DashWidget";
import DashCard from "components/molecules/DashCard";
import {Redirect, useLocation} from "react-router";
import {BAD_REQUEST_STATUS} from "utils/constants";
import CompletionModal from "components/molecules/CompletionModal";
import Button from "components/atoms/Button";
import {checkLocalForCreated} from "utils/functions/functions";
import StudentTable from "components/molecules/StudentTable";
import Section from "components/atoms/Section";
import {TeacherContext} from "utils/hooks/hooks"

const CreateGoal = ({ hasClassroomsWithStudents, logout }) => {
    const {teacher, setTeacher} = useContext(TeacherContext);
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

    useEffect(() => {
        if(createGoalFor){
            setSelectedStudentIndex(createGoalFor.studentIndex);
            setSelectedClassroomIndex(createGoalFor.classroomIndex);
        }
        return (() => {
            checkLocalForCreated("goalCreated");
        });
    }, []);

    const [goal, setGoal] = useState(goalObj);
    const goalCreated = !!localStorage.getItem("goalCreated") || false;
    const [selectedClassroomIndex, setSelectedClassroomIndex] = useState(999);
    const [selectedStudentIndex, setSelectedStudentIndex] = useState(999);
    const [displayModal, setDisplayModal] = useState(false);
    const [formErrors, setFormErrors] = useState({ formInputs });
    const [newTeacherData, setNewTeacherData] = useState(null);

    const handleSelected = (stu, stuIndex, crInd) => {
        if(goal.studentId !== stu.id) {
            setGoal({...goal, studentId: stu.id});
            setSelectedStudentIndex(stuIndex);
            setSelectedClassroomIndex(crInd);
        }
        else {
            setGoal({...goal, studentId: ""});
            setSelectedStudentIndex(stuIndex);
            setSelectedClassroomIndex(crInd);
        }

    };

    const confirmGoalCreation = () => {
        localStorage.setItem("goalCreated", "true");
        setTeacher(newTeacherData);
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
                }
                else if(status === BAD_REQUEST_STATUS)
                    setFormErrors(JSON.parse(data));
                else
                    logout();
                
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
                    <Section>
                        <h3 className={"i-bottom"}>Apply to which student</h3>
                        <Accordion
                            array={teacher.classrooms}
                            data={teacher.classrooms.map(cr => cr.className)}
                            openIndex={selectedClassroomIndex !== 999 ? selectedClassroomIndex : null}
                        >
                            {
                                teacher.classrooms.map((cr, crInd) =>
                                <StudentTable
                                    selectedCallback={(stu, ind) => {
                                        handleSelected(stu, ind, crInd);
                                    }}
                                    selectedRowIndex={ selectedClassroomIndex === crInd ? selectedStudentIndex : 999 }
                                    key={`attachgoaltostudent${crInd}`}
                                    data={cr.students}
                                />
/*                                     <Table
                                        selectedCallback={(stu, ind) => {
                                            handleSelected(stu, ind, crInd);
                                        }}
                                        selectedRowIndexes={ selectedClassroomIndex === crInd ? selectedStudentIndex : 999 }
                                        studentTable={true}
                                        key={`attachgoaltostudent${crInd}`}
                                        data={cr.students}
                                    /> */
                                )
                            }
                        </Accordion>
                    </Section>
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
