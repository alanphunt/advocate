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
/*
    Index states are used to update the table component to highlite the selected row and send the object
    to the drilldown component.
    Actual state objects are ONLY used for editing/deleting
 */
const GoalCenter = (props) =>{
    const updateTeacher = props.updateTeacher;
    const ws = window.sessionStorage;
    const teacher = props.teacher;

    const [studentIndex, setStudentIndex] = useState(ws.studentIndex || 999);
    const [classroomIndex, setClassroomIndex] = useState(ws.classroomIndex || 999);
    const [displayToaster, setDisplayToaster] = useState(false);
    const student = teacher.classrooms[classroomIndex]?.students[studentIndex];

    //since the trial modal child will be reused it has to be reset
    const [template, setTemplate] = useState("");
    //the content of the modal depending on what event triggered it
    const [modalChild, setModalChild] = useState("");
    const modalSize = modalChild === "createTrial" || modalChild === "editGoal" || modalChild === "editBenchmark" || modalChild === "editTrial";

    const [goalIndex, setGoalIndex] = useState(ws.goalIndex || 999);
    const selectedgoal = student?.goals[parseInt(goalIndex)];
    const [goal, setGoal] = useState();

    const [benchmarkIndex, setBenchmarkIndex] = useState(ws.benchmarkIndex || 999);
    const selectedBenchmark = selectedgoal?.benchmarks[parseInt(benchmarkIndex)];
    const [benchmark, setBenchmark] = useState();

    const [trialIndex, setTrialIndex] = useState(ws.trialIndex || 999);
    const selectedTrial = selectedBenchmark?.trials[parseInt(trialIndex)];
    const [trial, setTrial] = useState();

    const editGoal = () => {
        fetchPost("editGoal", goal, (data) => {
            updateTeacher(data);
        });
    };

    const deleteGoal = () => {
        const formData = new FormData();
/*      for soft deletion
        formData.append("goalId", goal.id);
        formData.append("benchmarkIds", goal.benchmarks.map(bm => bm.id).toString());
        formData.append("trialIds", goal.benchmarks.map(bm => bm.trials.map(trial => trial.id)).toString());
*/
        formData.append("goal", JSON.stringify(goal));
        fetch("/api/deleteGoal",
            {
                    method: "POST",
                    body: formData,
                    headers: {
                    "Authorization": `Bearer ${sessionStorage.authorization}`
                }
            })
            .then(response => response.json())
            .then(data => {
                updateTeacher(data);
            });
    };

    const editTrial = () => {
        fetchPost("editTrial", trial, (data) => {
            updateTeacher(data);
        });
    };

    const deleteTrial = () => {
        let updatedTrials = selectedBenchmark.trials.filter(t => t.id !== trial.id);
        updatedTrials = updatedTrials.map((t, i) => {return {...t, trialNumber: i+1}});
        const bm = {...selectedBenchmark, trials: [...updatedTrials]};
        fetchPost("editBenchmark", bm, (data) => {updateTeacher(data);});
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
        //the timer for the toaster
        if(displayToaster)
            setTimeout(() => {setDisplayToaster(false)}, 3500);
    }, [displayToaster]);

    useEffect(() => {
        //anytime the teacher is updated, presumably after mutating database values, clear the session storage
        //and set the toaster to display
        if(sessionStorage.length > 1 ) {
            clearStorage();
            setDisplayToaster(true);
        }
    }, [props.teacher]);

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
        setBenchmark(null);
        setBenchmarkIndex(999);
        setTrial(null);
        setTrialIndex(999);
    };

    const closeModal = () => {
        if(modalChild !== "") {
            setTemplate("");
            setModalChild("");
            clearStorage();
        }
    };

    const clearStorage = () => {
        console.log("cleared");
        const jwt = sessionStorage.authorization;
        sessionStorage.clear();
        sessionStorage.setItem("authorization", jwt);
    };

    const storeStateInSession = () => {
        ws.setItem("studentIndex", studentIndex);
        ws.setItem("classroomIndex", classroomIndex);
        ws.setItem("goalIndex", goalIndex);
        ws.setItem("benchmarkIndex", benchmarkIndex);
        ws.setItem("trialIndex", trialIndex);
    };

    return (
        <div className={"dash-main-inner width-100 height-100"} onClick={closeModal}>
            <Toaster display={displayToaster} setDisplay={setDisplayToaster}/>
            <Modal displayed={modalChild !== ""} closeModal={closeModal} large={modalSize}>
                {determineModalChild(modalChild)}
            </Modal>
            <div className={"card height-50 marg-bot"}>
                <div className={"cardheader"}><h2>Goal Center</h2></div>
                <div className={"cardmain"}>
                    <Accordion
                        allOpen
                        array={props.teacher.classrooms}
                        data={props.teacher.classrooms.map(cr => cr.className)}
                    >
                        {
                            props.teacher.classrooms.map((cr, crind) =>
                                <Table
                                    selectable={true}
                                    selectedCallback={(stu, ind) => {
                                        handleSelectedStudent(stu, ind, crind);
                                    }}
                                    selectedRowIndexes={classroomIndex == crind ? studentIndex : 999}
                                    headers={["Name", "Goal Focus", "Goal Count", "Goal Completion %"]}
                                    key={"studentgoaltable"+crind}
                                    data={studentGoalMeta(cr.students)}
                                />
                            )
                        }
                    </Accordion>
                </div>
            </div>
            <div className={"card height-50"}>
                <GoalDrilldown
                    key={"drilldownfor"+student?.name}
                    handleModal={setModalChild}
                    storeStateInSession={storeStateInSession}
                    student={student}
                    goal={student?.goals[goalIndex] || null}
                    setGoal={setGoal}
                    goalIndex={goalIndex}
                    setGoalIndex={setGoalIndex}
                    trial={student?.goals[goalIndex]?.benchmarks[benchmarkIndex]?.trials[trialIndex] || null}
                    setTrial={setTrial}
                    trialIndex={trialIndex}
                    setTrialIndex={setTrialIndex}
                    benchmark={student?.goals[goalIndex]?.benchmarks[benchmarkIndex] || null}
                    setBenchmark={setBenchmark}
                    benchmarkIndex={benchmarkIndex}
                    setBenchmarkIndex={setBenchmarkIndex}
                />
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

export const studentGoalMeta = (students) => {
    return students.map(student => {
        return {name: student.name, goalFocus: student.goalFocus, goalCount: student.goals.length, completion: `${calculateGoalCompletion(student)}%`};
    });
};

export const isGoalComplete = (goal) => {
    return checkIncompleteBenchmarks(goal) === 0;
};

export const checkIncompleteBenchmarks = (goal) => {
    return goal.benchmarks.filter(bm => bm.complete === 0).length;
};

export default GoalCenter;