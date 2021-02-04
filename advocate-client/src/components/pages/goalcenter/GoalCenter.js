import React, {useEffect, useState} from "react";
import GoalDrilldown from "components/molecules/drilldown/GoalDrilldown";
import BenchmarkDrilldown from "components/molecules/drilldown/BenchmarkDrilldown";
import TrialDrilldown from "components/molecules/drilldown/TrialDrilldown";
import DashCard from "components/molecules/DashCard";
import {crudFetch} from "utils/functions/functions";
import { useAuth } from "utils/auth/AuthHooks";
import Modal from "components/molecules/Modal";
import Toaster from "components/atoms/Toaster";
import GoalCenterTableRow from "components/molecules/GoalCenterTableRow";
import CreateGoal from "components/pages/creategoal/CreateGoal";
import EditGoal from "components/molecules/EditGoal";
import ModalBody from "components/molecules/ModalBody";
import CompleteBenchmark from "components/molecules/CompleteBenchmark";
import CreateTrial from "components/molecules/CreateTrial";
import {FaCheck as CheckIcon} from "react-icons/fa";
import {SERVER_ERROR} from "utils/constants";
import {Goal, Trial} from "utils/classes/ContextModels";
import EditScoreTrial from "components/molecules/EditScoreTrial";
import CopyGoal from "components/molecules/CopyGoal";

/*
    notes:
    we have to use IDs in state because if we store objects that we plan on updating the teacher object will get updated but
    local state will stay the same.
*/
const GoalCenter = () =>{
    const {teacher, setTeacher, signout} = useAuth();

    const [toasterText, setToasterText] = useState("");
    const [modalAction, setModalAction] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [studentId, setStudentId] = useState("");
    const student = teacher.students[studentId];
    const goals = student?.goalIds.map(id => teacher.goals[id]);

    const [goalId, setGoalId] = useState("");
    const goal = teacher.goals[goalId];
    const benchmarks = goal?.benchmarkIds.map(id => teacher.benchmarks[id]);

    const [benchmarkId, setBenchmarkId] = useState("");
    const benchmark = teacher.benchmarks[benchmarkId];
    const trials = benchmark?.trialIds.map(id => teacher.trials[id]);

    const [trialId, setTrialId] = useState("");
    const trial = teacher.trials[trialId];
    const trackings = trial?.trackingIds.map(id => teacher.trackings[id]);
    const documents = trial?.documentIds.map(id => teacher.documents[id]);

    const [mutableGoal, setMutableGoal] = useState(new Goal());
    const [mutableTrial, setMutableTrial] = useState(new Trial());

    const modalLarge = modalAction.includes("copy") || modalAction.includes("edit") || modalAction.includes("create") || modalAction.includes("complete");

    useEffect(() => {
        if(!modalAction && (mutableTrial?.id || mutableGoal?.id)){
            setMutableTrial(null);
            setMutableGoal(null);
        }
    }, [modalAction]);

    useEffect(() => {
        if(studentId) {
            setGoalId("");
            setBenchmarkId("");
            setTrialId("");
            setMutableGoal(null);
            setMutableTrial(null);
        }
    }, [studentId]);

    useEffect(() => {
        if(benchmarkId)
            setTrialId("");
    }, [benchmarkId])

    const closeModal = () => {
        setModalAction("");
    };

    const completeCrudOp = (data, message, preventClose) => {
        setToasterText(<p>{message}</p>);
        setTeacher(data);
        if(!preventClose)
            closeModal();
    };

    const deleteTrial = () => {
        // let updatedTrials = benchmark.trials.filter(t => t.id !== mutableTrial.id);
        // let updatedTrials = benchmark.trials.filter(t => t.id !== trial.id);

        // updatedTrials = updatedTrials.map((t, i) => {return {...t, trialNumber: i+1}});
        // const bm = {...benchmarkId, trials: [...updatedTrials]};
        crudFetch({
            path: `deletetrial?trialId=${mutableTrial.id}&benchmarkId=${mutableTrial.benchmarkId}`,
            method: "DELETE",
            success: (data) => completeCrudOp(data, <><CheckIcon className="i-right"/>Successfully deleted {mutableTrial.label}!</>),
            error: () => alert(SERVER_ERROR),
            serverError: signout
        });
    };

    const determineModalChild = (modalAction) => {
        switch(modalAction){
            case "createGoal":
                return (
                    <CreateGoal
                        student={student}
                        setStudentId={setStudentId}
                        completeCrudOp={completeCrudOp}
                        classrooms={teacher.classrooms}
                        students={teacher.students}
                        signout={signout}
                        closeModal={closeModal}
                    />
                );
            case "editGoal":
                return (
                    <EditGoal mutableGoal={mutableGoal} setMutableGoal={setMutableGoal} closeModal={closeModal} completeCrudOp={completeCrudOp} signout={signout}/>
                );
            case "deleteGoal":
                return (
                    <ModalBody
                        header={`Delete goal '${mutableGoal?.goalName}'?`}
                        cancelCallback={closeModal}
                        confirmCallback={fetchDeleteGoal}
                    >
                        <p className="marg-bot">Note that this action cannot be undone. This will also delete all associated
                            benchmarks and trials. Proceed?</p>
                    </ModalBody>
                );
            case "copyGoal":
                return (
                    <ModalBody
                        header={`Copy goal ${mutableGoal?.goalName} to which student?`}
                        hideButtons
                    >
                        <CopyGoal
                            goal={mutableGoal}
                            classrooms={Object.values(teacher.classrooms)}
                            students={teacher.students}
                            completeCrudOp={completeCrudOp}
                            closeModal={closeModal}
                            signout={signout}
                        />
                    </ModalBody>
                );
            case "createBaseline":
                return (
                    <ModalBody
                        header={`Create baseline for ${student?.name}`}
                        cancelCallback={closeModal}
                        confirmCallback={() => {}}
                    >
                        <p>Baseline</p>
                    </ModalBody>
                );
            case "masterBenchmark":
                return (
                    <CompleteBenchmark
                        goalId={goalId}
                        benchmark={benchmark}
                        goalBenchmarks={benchmarks}
                        completeCrudOp={completeCrudOp}
                        closeModal={closeModal}
                    />
                );
            case "createTrial":
                return (
                    <ModalBody
                        header={`Create a trial for ${benchmark?.label} from these ${benchmark?.tracking}-based templates`}
                        hideButtons
                    >
                        <CreateTrial
                            goalName={goal?.goalName}
                            benchmark={benchmark}
                            studentName={student?.name}
                            completeCrudOp={completeCrudOp}
                        />
                    </ModalBody>
                );
            case "editTrial":
                return (
                    <ModalBody
                        header={`Edit trial ${mutableTrial?.trialNumber}`}
                        hideButtons
                    >
                        <EditScoreTrial
                            closeModal={closeModal}
                            studentName={student?.name}
                            goalName={goal?.goalName}
                            benchmark={benchmark}
                            mutableTrial={mutableTrial}
                            setMutableTrial={setMutableTrial}
                            completeCrudOp={completeCrudOp}
                        />
                    </ModalBody>
                );
            case "deleteTrial":
                return (
                    <ModalBody
                        header={`Delete trial ${mutableTrial?.label}`}
                        cancelCallback={closeModal}
                        confirmCallback={deleteTrial}
                    >
                        <p>Note that this action cannot be undone. This will also delete all associated tracking data and documents. Proceed?</p>
                    </ModalBody>
                );
            default: return null;
        }
    };

    const fetchDeleteGoal = () => crudFetch({
        path: `deletegoal?goalId=${mutableGoal.id}`,
        method: "DELETE",
        success: (data) => completeCrudOp(data, <><CheckIcon className="i-right"/>Successfully deleted goal {mutableGoal.goalName}</>),
        error: () => {},
        serverError: signout
    });

    return (
        <DashCard fitOnPage>
            <Modal displayed={modalAction} largeModal={modalLarge} closeModal={closeModal}>
                {determineModalChild(modalAction)}
            </Modal>
            <GoalCenterTableRow teacher={teacher} student={student} setStudentId={setStudentId}/>
            <div className={"goalcenter-row goalcenter-row-bottom"}>
                <div className={"drilldownwrapper"}>
                    <div className={"drilldown"}>
                        <GoalDrilldown
                            studentName={student?.name}
                            goals={goals}
                            allBenchmarks={teacher.benchmarks}
                            setGoalId={setGoalId}
                            setBenchmarkId={setBenchmarkId}
                            setMutableGoal={setMutableGoal}
                            setModalAction={setModalAction}
                        />
                        <BenchmarkDrilldown
                            trials={trials}
                            allDocuments={teacher.documents}
                            allTrackings={teacher.trackings}
                            benchmark={benchmark}
                            setTrialId={setTrialId}
                            setMutableTrial={setMutableTrial}
                            setModalAction={setModalAction}
                        />
                        <TrialDrilldown
                            trial={trial}
                            trackings={trackings}
                            documents={documents}
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                        />
                    </div>
                </div>
            </div>
            <Toaster displayed={toasterText} closeToaster={() => setToasterText("")}>{toasterText}</Toaster>
        </DashCard>
    )
};

export default GoalCenter;