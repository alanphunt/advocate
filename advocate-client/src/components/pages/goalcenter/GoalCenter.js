import React, {useState} from "react";
import Accordion from "components/molecules/Accordion";
import GoalDrilldown from "components/molecules/GoalDrilldown";
import Modal from "components/molecules/Modal";
import CreateTrial from "components/molecules/CreateTrial.js"
import CompleteBenchmark from "components/molecules/CompleteBenchmark";
import ModalBody from "components/molecules/ModalBody";
import {crudFetch, fetchPost} from "utils/functions/functions";
import ScoreTrial from "components/molecules/ScoreTrial";
import DashCard from "components/molecules/DashCard";
import {studentGoalMeta} from "utils/functions/functions";
import {STORAGE} from "utils/constants";
import Table from "components/molecules/Table";
import { useAuth } from "utils/auth/AuthHooks";
import {FaCheck as CheckIcon} from "react-icons/fa";
import CreateGoal from "../creategoal/CreateGoal";
import EditGoal from "components/molecules/EditGoal";
import { convertToRaw } from 'draft-js';


/*
Props:
    logout: function- if something were to go wrong with authenticating a request user should be logged out
    hasClassroomsWithStudents- boolean- whether or not the user has created a classroom w/ students yet
 */
const GoalCenter = ({handleToaster}) =>{
    const {teacher, setTeacher} = useAuth();
    const hasClassroomsWithStudents = teacher.classrooms?.length > 0 && teacher.classrooms[0].students.length > 0;
    const [studentIndex, setStudentIndex] = useState(+STORAGE.studentIndex);
    const [classroomIndex, setClassroomIndex] = useState(+STORAGE.classroomIndex);
    const student = teacher?.classrooms[classroomIndex]?.students[studentIndex];

    //since the trial modal child will be reused it has to be reset
    const [template, setTemplate] = useState("");
    //the content of the modal depending on what event triggered it
    const [modalChild, setModalChild] = useState("");
    const modalSize = modalChild === "createTrial"
        || modalChild === "editGoal"
        || modalChild === "editBenchmark"
        || modalChild === "editTrial"
        || modalChild === "createGoal";

    const [goalIndex, setGoalIndex] = useState(+STORAGE.goalIndex);
    const selectedGoal = student?.goals[goalIndex];
    const [goal, setGoal] = useState();

    const [benchmarkIndex, setBenchmarkIndex] = useState(+STORAGE.benchmarkIndex);
    const selectedBenchmark = selectedGoal?.benchmarks[benchmarkIndex];
    //const [benchmark, setBenchmark] = useState();

    const [trialIndex, setTrialIndex] = useState(STORAGE.trialIndex);
    //const selectedTrial = selectedBenchmark?.trials[parseInt(trialIndex)];
    const [trial, setTrial] = useState();
    const [trialFiles, setTrialFiles] = useState([]);

    const editGoal = (setEditingErrors) => {
        fetchPost(
            "editGoal", 
            {...goal, goal: JSON.stringify(convertToRaw(goal.goal))}, 
            (data) => cleanupCrudOp(data, <><CheckIcon className="i-right"/>Successfully updated goal {goal.goalName}</>),
            (data, headers, status) => setEditingErrors(data)
            );
    };

    const deleteGoal = () => crudFetch({
                path: `deletegoal?goalId=${goal.id}`, 
                method: "DELETE", 
                success: (data) => cleanupCrudOp(data, <><CheckIcon className="i-right"/>Successfully deleted goal {goal.goalName}</>), 
                error: () => {}
    });

    const prepareEditorStateForRequest = (text) => {
        try{ 
            return JSON.stringify(convertToRaw(text))
        }catch(e){
            return text
        }
    };

    const editTrial = () => {
        let fd = new FormData();
        fd.append("body", 
            JSON.stringify(
                {
                    ...trial, 
                    comments: prepareEditorStateForRequest(trial.comments)
                }
            )
        );
        for(let i = 0; i < trialFiles.length; i++){
            fd.append("documents", trialFiles[i]);
        }
        crudFetch({
            path: "edittrial",
            method: "POST",
            body: fd,
            success: (data) => 
                cleanupCrudOp(data, <><CheckIcon className="i-right"/>Successfully updated Trial #{trial.trialNumber} - {trial.dateStarted}</>),
            error: (data) => {}
        });
    };

    const deleteTrial = () => {
        let updatedTrials = selectedBenchmark.trials.filter(t => t.id !== trial.id);
        updatedTrials = updatedTrials.map((t, i) => {return {...t, trialNumber: i+1}});
        const bm = {...selectedBenchmark, trials: [...updatedTrials]};
        fetchPost(
            "editBenchmark", 
            bm, 
            (data) => cleanupCrudOp(data, <><CheckIcon className="i-right"/>Successfully deleted Trial #{trial.trialNumber} - {trial.dateStarted}!</>)
        );
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
                            cleanupCrudOp={cleanupCrudOp}
                        />
                    </ModalBody>;
            case "completeBenchmark":
                return <CompleteBenchmark
                            benchmark={selectedBenchmark}
                            cleanupCrudOp={cleanupCrudOp}
                            closeModal={closeModal}
                            benchmarkParentGoal={selectedGoal}
                        />
            case "editGoal":
                return <EditGoal goal={goal} updateGoal={setGoal} editGoal={editGoal} closeModal={closeModal}/>
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
                        studentName={student.name}
                        goalName={selectedGoal.goalName}
                        mutableTrial={trial}
                        updateMutableTrial={setTrial}
                        trialFiles={trialFiles}
                        setTrialFiles={setTrialFiles}
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
            case "createGoal":
                return <CreateGoal
                            studentName={student.name}
                            studentId={student.id}
                            cleanupCrudOp={cleanupCrudOp}
                        />
            case "copyGoal":
                return <ModalBody header={`Copy goal ${goal.goalName} to which students?`}>
                        <p>Copy goal to selected students, option to copy benchmarks as well.</p>
                </ModalBody>
            default: return <></>;
        }
    };

    const cleanupCrudOp = (data, message) => {
        handleToaster(<p>{message}</p>);
        setTeacher({...data});
        closeModal();
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
/*         STORAGE.setItem("studentIndex", studentIndex);
        STORAGE.setItem("classroomIndex", classroomIndex);
        STORAGE.setItem("goalIndex", goalIndex);
        STORAGE.setItem("benchmarkIndex", benchmarkIndex);
        STORAGE.setItem("trialIndex", trialIndex); */
    };

    return (
        <DashCard fitOnPage /* closeModal={modalChild !== "" ? closeModal : null} */>
            <Modal displayed={modalChild !== ""} closeModal={closeModal} large={modalSize}>
                {determineModalChild(modalChild)}
            </Modal>
            <div className={"goalcenterrow goalcenterrowmarg"}>
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
            </div>
            <div className={"goalcenterrow goalcenterrowmarg"}>
                <GoalDrilldown
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
                    handleToaster={handleToaster}
                />
            </div>
        </DashCard>
    )
};

export default GoalCenter;