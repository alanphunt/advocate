import React, {useEffect, useState} from "react";
import GoalDrilldown from "components/molecules/drilldown/GoalDrilldown";
import BenchmarkDrilldown from "components/molecules/drilldown/BenchmarkDrilldown";
import TrialDrilldown from "components/molecules/drilldown/TrialDrilldown";
import DashCard from "components/molecules/DashCard";
import {crudFetch, fetchPost} from "utils/functions/functions";
import { useAuth } from "utils/auth/AuthHooks";
import Modal from "components/molecules/Modal";
import Toaster from "components/atoms/Toaster";
import GoalCenterTableRow from "components/molecules/GoalCenterTableRow";
import CreateGoal from "components/pages/creategoal/CreateGoal";
import EditGoal from "components/molecules/EditGoal";
import ModalBody from "components/molecules/ModalBody";
import CompleteBenchmark from "components/molecules/CompleteBenchmark";
import CreateTrial from "components/molecules/CreateTrial";
import ScoreTrial from "components/molecules/ScoreTrial";
import {FaCheck as CheckIcon} from "react-icons/fa";

/*
    notes:
    we have to use indexes because if we store objects that we plan on updating, the teacher object will get updated but
    local state will stay the same
*/
const GoalCenter = () =>{
    const {teacher, setTeacher, signout} = useAuth();

    const [modalBody, setModalBody] = useState(null);
    const [toasterText, setToasterText] = useState("");
    const [trialTemplate, setTrialTemplate] = useState("");
    const [modalAction, setModalAction] = useState("");

    const [selectedStudentId, setSelectedStudentId] = useState("");
    const student = teacher.students[selectedStudentId];
    const [mutableGoal, setMutableGoal] = useState(null);
    const [mutableTrial, setMutableTrial] = useState(null);

    const [selectedBenchmark, setSelectedBenchmark] = useState(null);
    const [selectedTrial, setSelectedTrial] = useState(null);

    const modalLarge = modalAction.includes("edit") || modalAction.includes("create") || modalAction.includes("complete");

    useEffect(() => {
        if(modalAction){
            setModalBody(determineModalChild(modalAction));
        }else{
            setModalBody(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalAction])

    const closeModal = () => {
        setModalAction("");
    };

    const completeCrudOp = (data, message, preventClose) => {
        setToasterText(<p>{message}</p>);
        setTeacher(data);
        if(!preventClose){
            closeModal();
        }
    };

    const deleteTrial = () => {
        let updatedTrials = selectedBenchmark.trials.filter(t => t.id !== mutableTrial.id);
        // let updatedTrials = selectedBenchmark.trials.filter(t => t.id !== trial.id);
        updatedTrials = updatedTrials.map((t, i) => {return {...t, trialNumber: i+1}});
        const bm = {...selectedBenchmark, trials: [...updatedTrials]};
        fetchPost(
            "editBenchmark",
            bm,
            (data) => completeCrudOp(data, <><CheckIcon className="i-right"/>Successfully deleted ${mutableTrial.label}!</>)
        );
    };

    const determineModalChild = (modalAction) => {
        switch(modalAction){
            case "createGoal":
                return (
                    <CreateGoal
                        student={student}
                        setSelectedStudentId={setSelectedStudentId}
                        completeCrudOp={completeCrudOp}
                        classroomIds={teacher.teacher.classroomIds}
                        classrooms={teacher.classrooms}
                        students={teacher.students}
                        signout={signout}
                    />
                );
            case "editGoal":
                return (
                    <EditGoal mutableGoal={mutableGoal} setMutableGoal={setMutableGoal} closeModal={closeModal} completeCrudOp={completeCrudOp}/>
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
                        header={`Copy goal ${mutableGoal?.goalName} to which students?`}
                        cancelCallback={closeModal}
                        confirmCallback={() => {}}
                    >
                        <p>Copy goal to selected students, option to copy benchmarks as well.</p>
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
            case "completeBenchmark":
                return (
                    <CompleteBenchmark
                        benchmark={selectedBenchmark}
                        completeCrudOp={completeCrudOp}
                        closeModal={closeModal}
                        benchmarkParentGoal={mutableGoal}
                    />
                );
            case "createTrial":
                return (
                    <ModalBody
                        header={`Create a trial for ${selectedBenchmark?.label} from these ${selectedBenchmark?.tracking}-based templates`}
                        hideButtons
                    >
                        <CreateTrial
                            benchmark={selectedBenchmark}
                            template={trialTemplate}
                            setTemplate={setTrialTemplate}
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
                        <ScoreTrial
                            setTeacher={setTeacher}
                            benchmark={selectedBenchmark}
                            studentName={student?.name}
                            goalName={mutableGoal?.goalName}
                            mutableTrial={mutableTrial}
                            setMutableTrial={setMutableTrial}
                            closeModal={closeModal}
                            completeCrudOp={completeCrudOp}
                        />
                    </ModalBody>
                );
            case "deleteTrial":
                return (
                    <ModalBody
                        header={`Delete trial ${selectedTrial?.trialNumber}`}
                        cancelCallback={closeModal}
                        confirmCallback={deleteTrial}
                    >
                        <p>Note that this action cannot be undone. This will also delete all associated tracking data. Proceed?</p>
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
            <Modal displayed={modalBody} largeModal={modalLarge} closeModal={closeModal}>
                {modalBody}
            </Modal>
            <GoalCenterTableRow teacher={teacher} setSelectedStudentId={setSelectedStudentId}/>
            <div className={"goalcenterrow goalcenterrowmarg"}>
                <div className={"drilldownwrapper"}>
                    <div className={"drilldown"}>
                        <GoalDrilldown
                            student={student}
                            teacher={teacher}
                            setMutableGoal={setMutableGoal}
                            setModalAction={setModalAction}
                            setSelectedBenchmark={setSelectedBenchmark}
                        />
                        <BenchmarkDrilldown
                            student={student}
                            teacher={teacher}
                            benchmark={selectedBenchmark}
                            setSelectedTrial={setSelectedTrial}
                            setModalAction={setModalAction}
                        />
                        <TrialDrilldown
                            teacher={teacher}
                            trial={selectedTrial}
                        />
                    </div>
                </div>
            </div>
            <Toaster displayed={toasterText} closeToaster={() => setToasterText("")}>{toasterText}</Toaster>
        </DashCard>
    )
};

export default GoalCenter;