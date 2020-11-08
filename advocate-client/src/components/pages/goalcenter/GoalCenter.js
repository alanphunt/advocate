<<<<<<< HEAD:advocate-client/src/components/pages/goalcenter/GoalCenter.js
import React, {useState, useRef, useEffect} from "react";
import Accordion from "components/collectives/Accordion";
import Table from "components/collectives/Table";
import GoalDrilldown from "components/collectives/GoalDrilldown";
import Modal from "components/collectives/Modal";
import CreateTrial from "components/collectives/CreateTrial.js"
import CompleteBenchmark from "components/collectives/CompleteBenchmark";
import Toaster from "components/singletons/Toaster";
import ModalBody from "components/collectives/ModalBody";
import {crudFetch, fetchPost} from "components/functions/functions";
import GoalForm from "components/collectives/GoalForm";
import ScoreTrial from "components/collectives/ScoreTrial";
import DashCard from "components/collectives/DashCard";
import DashWidget from "components/collectives/DashWidget";
import {studentGoalMeta} from "components/functions/functions";
import {useToaster} from "components/hooks/hooks";
import {STORAGE} from "utils/constants";

/*
Props:
    updateTeacher- function- to update the teacher object in the parent component
    teacher- object- the teacher object
    hasClassroomsWithStudents- boolean- whether or not the user has created a classroom w/ students yet
 */
const GoalCenter = ({updateTeacher, teacher, hasClassroomsWithStudents, logout}) =>{
=======
import React, {useEffect, useState} from "react";
import Accordion from "./components/accordion/Accordion";
import Table from "./components/Table";
import GoalDrilldown from "./components/GoalDrilldown";
import Modal from "../SharedComponents/Modal";
import CreateTrial from "./components/CreateTrial.js"
import CompleteBenchmark from "./components/CompleteBenchmark";
import Toaster from "../SharedComponents/Toaster";
import ModalBody from "./components/ModalBody";
import {fetchPost} from "./Dashboard.js";
import GoalForm from "./components/GoalForm";
import ScoreTrial from "./components/Trials/ScoreTrial";
import DashCard from "./components/DashCard";
import DashWidget from "./components/DashWidget";

/*
Props:
    updateTeacher- to update the teacher object in the parent component
    teacher- the teacher object
    hasClassroomsWithStudents- whether or not the user has created a classroom w/ students yet
 */
const GoalCenter = ({updateTeacher, teacher, hasClassroomsWithStudents}) =>{
    //const updateTeacher = props.updateTeacher;
    const ws = window.sessionStorage;
    //const teacher = props.teacher;
    //const hasClassroomsWithStudents = props.hasClassroomsWithStudents;
>>>>>>> a95f801ec3a4c1b1baef8efb874e845b688000e5:advocate/src/pages/dashboard/GoalCenter.js

    const [studentIndex, setStudentIndex] = useState(+STORAGE.studentIndex);
    const [classroomIndex, setClassroomIndex] = useState(+STORAGE.classroomIndex);
    const [displayToaster, setDisplayToaster] = useToaster(false);
    const student = teacher?.classrooms[classroomIndex]?.students[studentIndex];

    //since the trial modal child will be reused it has to be reset
    const [template, setTemplate] = useState("");
    //the content of the modal depending on what event triggered it
    const [modalChild, setModalChild] = useState("");
    const modalSize = modalChild === "createTrial" || modalChild === "editGoal" || modalChild === "editBenchmark" || modalChild === "editTrial";

    const [goalIndex, setGoalIndex] = useState(+STORAGE.goalIndex);
    const selectedgoal = student?.goals[goalIndex];
    const [goal, setGoal] = useState();

    const [benchmarkIndex, setBenchmarkIndex] = useState(+STORAGE.benchmarkIndex);
    const selectedBenchmark = selectedgoal?.benchmarks[benchmarkIndex];
    //const [benchmark, setBenchmark] = useState();

    const [trialIndex, setTrialIndex] = useState(STORAGE.trialIndex);
    //const selectedTrial = selectedBenchmark?.trials[parseInt(trialIndex)];
    const [trial, setTrial] = useState();

    const editGoal = () => {
        fetchPost("editGoal", goal, cleanupCrudOp);
    };

    const deleteGoal = () => {
        const formData = new FormData();
/*      for soft deletion
        formData.append("goalId", goal.id);
        formData.append("benchmarkIds", goal.benchmarks.map(bm => bm.id).toString());
        formData.append("trialIds", goal.benchmarks.map(bm => bm.trials.map(trial => trial.id)).toString());
*/
        formData.append("goal", JSON.stringify(goal));

        crudFetch("deleteGoal", formData, updateTeacher, () => {}, logout);
/*        fetch("/api/deleteGoal",
            {
                    method: "POST",
                    body: formData,
            })
            .then(response => response.json())
            .then(data => {
                cleanupCrudOp(data);
            });*/
    };

    const editTrial = () => {
        fetchPost("editTrial", trial, (data) => {
            cleanupCrudOp(data);
        });
    };

    const deleteTrial = () => {
        let updatedTrials = selectedBenchmark.trials.filter(t => t.id !== trial.id);
        updatedTrials = updatedTrials.map((t, i) => {return {...t, trialNumber: i+1}});
        const bm = {...selectedBenchmark, trials: [...updatedTrials]};
        fetchPost("editBenchmark", bm, (data) => {
            cleanupCrudOp(data);
        });
    };

    const determineModalChild = (modalChildType) => {
        if(modalChildType !== "")
            storeStateInSession();
        switch(modalChildType){
            case "createTrial":
                return <ModalBody
                    header={`Create a trial for ${selectedBenchmark.label}`}
                    hideButtons
                    >
                    <CreateTrial
                        benchmark={selectedBenchmark}
                        template={template}
                        setTemplate={setTemplate}
                        student={student}
                        updateTeacher={updateTeacher}
                    />
                </ModalBody>;
            case "completeBenchmark":
                return <CompleteBenchmark
                        benchmark={selectedBenchmark}
                        updateTeacher={updateTeacher}
                        closeModal={closeModal}
                        clearStorage={clearStorage}
                        benchmarkParentGoal={selectedgoal}
                        setModalChild={setModalChild}
                    />;
            case "editGoal":
                return <ModalBody
                header={`Edit goal '${goal.goalName}'`}
                cancelCallback={closeModal}
                confirmCallback={editGoal}
                >
                    <GoalForm goal={goal} updateGoal={setGoal}/>
                </ModalBody>;
            case "deleteGoal":
                return <ModalBody
                    header={`Delete goal '${goal.goalName}'?`}
                    cancelCallback={closeModal}
                    confirmCallback={deleteGoal}
                >
                    <p>Note that this action cannot be undone. This will also delete all associated
                    benchmarks and trials. Proceed?</p>
                </ModalBody>;
            case "editTrial":
                return <ModalBody
                    header={`Edit trial ${trial?.trialNumber}`}
                    cancelCallback={closeModal}
                    confirmCallback={editTrial}
                >
                    <ScoreTrial
                        updateTeacher={updateTeacher}
                        benchmark={selectedBenchmark}
                        student={student}
                        mutableTrial={trial}
                        updateMutableTrial={setTrial}
                    />
                </ModalBody>
            case "deleteTrial":
                return <ModalBody
                    header={`Delete trial ${trial?.trialNumber}`}
                    cancelCallback={closeModal}
                    confirmCallback={deleteTrial}
                >
                    <p>Note that this action cannot be undone. This will also delete all associated
                        tracking data. Proceed?</p>
                </ModalBody>
            default: return <></>;
        }
    };

    useEffect(() => {
<<<<<<< HEAD:advocate-client/src/components/pages/goalcenter/GoalCenter.js
        if(STORAGE.length) {
=======
        //the timer for the toaster
        if(displayToaster)
            setTimeout(() => {setDisplayToaster(false)}, 3500);
    }, [displayToaster]);

    //needs fixing, will popup on component mount
    useEffect(() => {
        //anytime the teacher is updated, presumably after mutating database values, clear the session storage
        //and set the toaster to display
        if(sessionStorage.length > 1 ) {
>>>>>>> a95f801ec3a4c1b1baef8efb874e845b688000e5:advocate/src/pages/dashboard/GoalCenter.js
            clearStorage();
            setDisplayToaster(true);
        }
    }, [teacher]);
<<<<<<< HEAD:advocate-client/src/components/pages/goalcenter/GoalCenter.js

    const cleanupCrudOp = (data) => {
        updateTeacher(data);
    };
=======
>>>>>>> a95f801ec3a4c1b1baef8efb874e845b688000e5:advocate/src/pages/dashboard/GoalCenter.js

    const handleSelectedStudent = (stu, ind, classInd) => {
        setStudentIndex(ind);
        setClassroomIndex(classInd);
        //reset previous state values in the event of populating goal/bm/trial
        //and then switching students
        selectStudentStateReset();
    };

    const selectStudentStateReset = () => {
        setGoal(null);
        setGoalIndex(999);
        setBenchmarkIndex(999);
        setTrial(null);
        setTrialIndex(999);
    };

    const closeModal = () => {
        setTemplate("");
        setModalChild("");
        clearStorage();
    };

    const clearStorage = () => {
        STORAGE.clear();
    };

    const storeStateInSession = () => {
        STORAGE.setItem("studentIndex", studentIndex);
        STORAGE.setItem("classroomIndex", classroomIndex);
        STORAGE.setItem("goalIndex", goalIndex);
        STORAGE.setItem("benchmarkIndex", benchmarkIndex);
        STORAGE.setItem("trialIndex", trialIndex);
    };

    return (
<<<<<<< HEAD:advocate-client/src/components/pages/goalcenter/GoalCenter.js
        <DashCard noCanvas className={"height-100"} closeModal={modalChild !== "" ? closeModal : null}>
=======
        <DashCard noCanvas className={"height-100"} onClick={closeModal}>
>>>>>>> a95f801ec3a4c1b1baef8efb874e845b688000e5:advocate/src/pages/dashboard/GoalCenter.js
            <Toaster display={displayToaster} setDisplay={setDisplayToaster}/>
            <Modal displayed={modalChild !== ""} closeModal={closeModal} large={modalSize}>
                {determineModalChild(modalChild)}
            </Modal>
            <DashWidget
                className={"goalcenterrow goalcenterrowmarg"}
                header={"Goal Center"}
            >
                {
                    hasClassroomsWithStudents
                        ? <Accordion
                            allOpen
                            array={teacher.classrooms}
                            data={teacher.classrooms.map(cr => cr.className)}
                        >
                            {
                                teacher.classrooms.map((cr, crind) =>
                                    <Table
                                        selectable={true}
                                        selectedCallback={(stu, ind) => {
                                            handleSelectedStudent(stu, ind, crind);
                                        }}
<<<<<<< HEAD:advocate-client/src/components/pages/goalcenter/GoalCenter.js
                                        selectedRowIndexes={parseInt(classroomIndex) === crind ? studentIndex : 999}
=======
                                        selectedRowIndexes={classroomIndex == crind ? studentIndex : 999}
>>>>>>> a95f801ec3a4c1b1baef8efb874e845b688000e5:advocate/src/pages/dashboard/GoalCenter.js
                                        headers={["Name", "Goal Focus", "Goal Count", "Goal Completion %"]}
                                        key={"studentgoaltable"+crind}
                                        data={studentGoalMeta(cr.students)}
                                    />
                                )
                            }
                        </Accordion>
                        : <></>
                }
            </DashWidget>
            <DashWidget
                className={"goalcenterrow"}
                cardMainHeight
            >
                <GoalDrilldown
                    key={"drilldownfor"+student?.name}
                    handleModal={setModalChild}
                    storeStateInSession={storeStateInSession}
                    student={student}
                    studentIndex={studentIndex}
                    setGoal={setGoal}
                    goalIndex={goalIndex}
                    setGoalIndex={setGoalIndex}
                    trial={student?.goals[goalIndex]?.benchmarks[benchmarkIndex]?.trials[trialIndex] || null}
                    setTrial={setTrial}
                    trialIndex={trialIndex}
                    setTrialIndex={setTrialIndex}
                    benchmark={student?.goals[goalIndex]?.benchmarks[benchmarkIndex] || null}
                    benchmarkIndex={benchmarkIndex}
                    setBenchmarkIndex={setBenchmarkIndex}
                    classroomIndex={classroomIndex}
                />
            </DashWidget>
        </DashCard>
    )
};

export default GoalCenter;