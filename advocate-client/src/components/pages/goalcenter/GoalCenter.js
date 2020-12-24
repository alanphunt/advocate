import React, {useState, useEffect, useContext} from "react";
import Accordion from "components/molecules/Accordion";
import GoalDrilldown from "components/molecules/GoalDrilldown";
import Modal from "components/molecules/Modal";
import CreateTrial from "components/molecules/CreateTrial.js"
import CompleteBenchmark from "components/molecules/CompleteBenchmark";
import Toaster from "components/atoms/Toaster";
import ModalBody from "components/molecules/ModalBody";
import {crudFetch, fetchPost} from "utils/functions/functions";
import GoalForm from "components/molecules/GoalForm";
import ScoreTrial from "components/molecules/ScoreTrial";
import DashCard from "components/molecules/DashCard";
import DashWidget from "components/molecules/DashWidget";
import {studentGoalMeta} from "utils/functions/functions";
import {useToaster} from "utils/hooks/hooks";
import {STORAGE} from "utils/constants";
import NewTable from "components/molecules/NewTable";
import {TeacherContext} from "utils/hooks/hooks";

/*
Props:
    logout: function- if something were to go wrong with authenticating a request user should be logged out
    hasClassroomsWithStudents- boolean- whether or not the user has created a classroom w/ students yet
 */
const GoalCenter = ({hasClassroomsWithStudents, logout}) =>{
    const {teacher, setTeacher} = useContext(TeacherContext);
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

        crudFetch("deleteGoal", "DELETE", formData, setTeacher, () => {}, logout);
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
                return (
                    <ModalBody
                        header={`Create a trial for ${selectedBenchmark.label}`}
                        hideButtons
                    >
                        <CreateTrial
                            benchmark={selectedBenchmark}
                            template={template}
                            setTemplate={setTemplate}
                            student={student}
                            setTeacher={setTeacher}
                        />
                    </ModalBody>
                )
            case "completeBenchmark":
                return <CompleteBenchmark
                            benchmark={selectedBenchmark}
                            setTeacher={setTeacher}
                            closeModal={closeModal}
                            benchmarkParentGoal={selectedgoal}
                      />;
            case "editGoal":
                return (
                    <ModalBody
                        header={`Edit goal '${goal.goalName}'`}
                        cancelCallback={closeModal}
                        confirmCallback={editGoal}
                    >
                        <GoalForm goal={goal} updateGoal={setGoal}/>
                    </ModalBody>
                    );
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
                        setTeacher={setTeacher}
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
        if(STORAGE.length) {
            clearStorage();
            setDisplayToaster(true);
        }
    }, [teacher]);

    const cleanupCrudOp = (data) => {
        setTeacher(data);
    };

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
        <DashCard noCanvas className={"height-100"} closeModal={modalChild !== "" ? closeModal : null}>
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
                                <NewTable
                                    headers={["Name", "Goal Focus", "Goal Count", "Goal Completion %"]}
                                    selectedCallback={(stu, ind) => {
                                        handleSelectedStudent(stu, ind, crind);
                                    }}
                                    selectedRowIndex={parseInt(classroomIndex) === crind ? studentIndex : 999}
                                    key={"studentgoaltable"+crind}
                                    data={studentGoalMeta(cr.students)}
                                />
                                )}
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