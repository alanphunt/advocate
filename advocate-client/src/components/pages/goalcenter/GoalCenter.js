import React, {useEffect, useState, Suspense} from "react";
import GoalDrilldown from "components/molecules/drilldown/GoalDrilldown";
import BenchmarkDrilldown from "components/molecules/drilldown/BenchmarkDrilldown";
import TrialDrilldown from "components/molecules/drilldown/TrialDrilldown";
import DashCard from "components/molecules/DashCard";
import {crudFetch} from "utils/functions/functions";
import { useAuth } from "utils/auth/AuthHooks";
import GoalCenterTopRow from "components/molecules/GoalCenterTopRow";
import CreateGoal from "components/molecules/CreateGoal";
import EditGoal from "components/molecules/EditGoal";
import ModalBody from "components/molecules/ModalBody";
import CompleteBenchmark from "components/molecules/CompleteBenchmark";
import CreateTrial from "components/templates/CreateTrial";
import {FaCheck as CheckIcon} from "react-icons/fa";
import {SERVER_ERROR} from "utils/constants";
import {Goal, Trial} from "utils/classes/ContextModels";
import CopyGoal from "components/molecules/CopyGoal";
import {TEMPLATE_TYPES} from "components/templates/TemplateList";
import TemplateLoadingPlaceholder from "components/atoms/TemplateLoadingPlaceholder";
import CreateBaseline from "components/molecules/CreateBaseline";

const EditBestOutOf = React.lazy(() => import("components/templates/score/best-out-of/EditBestOutOfTrial"));
const EditBasicScore = React.lazy(() => import("components/templates/score/basic-score/EditScoreTrial"));

/*
    notes:
    we have to use IDs in state because if we store objects that we plan on updating the teacher object will get updated but
    local state will stay the same.
*/
const GoalCenter = ({modalAction, closeModal, setModalAction, setModalBody, setToasterText}) =>{
  const {teacher, setTeacher, signout} = useAuth();
  
  const [isLoading, setIsLoading] = useState({"": false});
  
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
  
  const [baseline, setBaseline] = useState(null);
  const [mutableBaseline, setMutableBaseline] = useState(null);
  
  useEffect(() => {
    if(!modalAction){
      setIsLoading({"":false});
      if(mutableTrial?.id || mutableGoal?.id ) {
        setMutableTrial(null);
        setMutableGoal(null);
      }
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
  }, [benchmarkId]);
  
  useEffect(() => {}, [])
  
  useEffect(() => {
    setModalBody(determineModalChild());
  }, [modalAction, trialId, mutableTrial, mutableGoal, isLoading])
  
  const completeCrudOp = (data, message, preventClose) => {
    setToasterText(<p>{message}</p>);
    setTeacher(data);
    if(!preventClose)
      closeModal();
    if(Object.values(isLoading)[0])
      setIsLoading({"":false})
  };
  
  const completeCrudOpAndSetNewTrial = (data, message, preventClose) => {
    console.log(data);
    console.log(teacher);
    const newTrialId = Object.keys(data.trials).filter(id => !Object.keys(teacher.trials).includes(id))[0];
    console.log(newTrialId);
    // const newTrialId = Object.values(data.trials).filter(trial => !Object.keys(teacher.trials).includes(trial.id))[0].id
    completeCrudOp(data, message, preventClose);
    setTrialId(newTrialId);
  };
  
  const deleteTrial = () => {
    setIsLoading({"deleteTrial": true})
    crudFetch({
      path: `deletetrial?trialId=${mutableTrial.id}&benchmarkId=${mutableTrial.benchmarkId}`,
      method: "DELETE",
      success: (data) => completeCrudOp(data, <><CheckIcon className="i-right"/>Successfully deleted {mutableTrial.label}!</>),
      error: () => {setIsLoading({"":false}); alert(SERVER_ERROR)},
      serverError: signout
    });
  };
  
  const executeBaselineDeletion = () => {
    setIsLoading({"deleteBaseline": true});
    crudFetch({
      path: `deletebaseline?baselineId=${baseline.id}`,
      method: "DELETE",
      success: (data) => {setBaseline(null); completeCrudOp(data, <><CheckIcon className="i-right"/>Successfully deleted {baseline.label}!</>);},
      error: () => {setIsLoading({"":false}); alert(SERVER_ERROR)},
      serverError: () => {}
    })
  };
  
  const executeBaselineEdit = () => {
      setIsLoading({"editBaseline": true});
  };
  
  const determineModalChild = () => {
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
            isLoading={isLoading.deleteGoal}
          >
            <p className="marg-bot-2">Note that this action cannot be undone. This will also delete all associated
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
              isLoading={isLoading.copyGoal}
              setIsLoading={setIsLoading}
            />
          </ModalBody>
        );
      case "createBaseline":
        return (
          <ModalBody
            header={`Create a Baseline for ${student?.name}`}
            hideButtons
          >
            <CreateBaseline
              student={student}
              goal={goal}
              closeModal={closeModal}
              completeCrudOp={completeCrudOp}
              isLoading={isLoading.createBaseline}
              setIsLoading={setIsLoading}
              signout={signout}
            />
          </ModalBody>
        );
      case "deleteBaseline":
        return (
          <ModalBody
            header={`Delete baseline '${baseline.label}'?`}
            cancelCallback={closeModal}
            confirmCallback={executeBaselineDeletion}
            isLoading={isLoading.deleteBaseline}
          >
            <p className="marg-bot-2">
              Note that this action cannot be undone. This will also delete all associated
              documents. Proceed?
            </p>
          </ModalBody>
        );
      case "editBaseline":
        return (
          <ModalBody
            header={`Edit baseline '${mutableBaseline.label}'?`}
            hideButtons
          >
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
            isLoading={isLoading.masterBenchmark}
            setIsLoading={setIsLoading}
          />
        );
      case "createTrial":
        return (
          <CreateTrial
            goalName={goal?.goalName}
            benchmark={benchmark}
            studentName={student?.name}
            completeCrudOp={completeCrudOpAndSetNewTrial}
            isLoading={isLoading.createTrial}
            setIsLoading={setIsLoading}
          />
        );
      case "editTrial":
        return (
          <ModalBody
            header={`Edit ${mutableTrial?.label}`}
            hideButtons
          >
            {determineTrialEdit()}
          </ModalBody>
        );
      case "deleteTrial":
        return (
          <ModalBody
            header={`Delete ${mutableTrial?.label}?`}
            cancelCallback={closeModal}
            confirmCallback={deleteTrial}
            isLoading={isLoading.deleteTrial}
          >
            <p className={"marg-bot-2"}>Note that this action cannot be undone. This will also delete all associated tracking data and documents. Proceed?</p>
          </ModalBody>
        );
      default: return null;
    }
  };
  
  const determineTrialEdit = () => {
    let EditingComponent = null;
      switch(mutableTrial.trialTemplate){
        case TEMPLATE_TYPES.SCORE_BEST_OUT_OF:
          EditingComponent = EditBestOutOf;
          break;
        case TEMPLATE_TYPES.SCORE_BASIC:
          EditingComponent = EditBasicScore;
          break;
        case TEMPLATE_TYPES.SCORE_CUE:
          break;
        case TEMPLATE_TYPES.SCORE_WPM:
          break;
        default: break;
      }
      return (
        <Suspense fallback={<TemplateLoadingPlaceholder/>}>
          <EditingComponent
            closeModal={closeModal}
            studentName={student?.name}
            goalName={goal?.goalName}
            benchmark={benchmark}
            mutableTrial={mutableTrial}
            setMutableTrial={setMutableTrial}
            completeCrudOp={completeCrudOp}
            isLoading={isLoading.editTrial}
            setIsLoading={setIsLoading}
          />
        </Suspense>
      )
  };
  
  const fetchDeleteGoal = () => {
    setIsLoading({"deleteGoal": true});
    crudFetch({
      path: `deletegoal?goalId=${mutableGoal.id}`,
      method: "DELETE",
      success: (data) => completeCrudOp(data, <><CheckIcon className="i-right"/>Successfully deleted
        goal {mutableGoal.goalName}</>),
      error: () => setIsLoading({"": false}),
      serverError: signout
    });
  }
  
  return (
    <DashCard fitOnPage>
      <GoalCenterTopRow baseline={baseline} setBaseline={setBaseline} setMutableBaseline={setMutableBaseline} teacher={teacher} student={student} setStudentId={setStudentId} setModalAction={setModalAction}/>
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
              trialId={trialId}
              setTrialId={setTrialId}
              setMutableTrial={setMutableTrial}
              setModalAction={setModalAction}
            />
            <TrialDrilldown
              trial={trial}
              trackings={trackings}
              documents={documents}
            />
          </div>
        </div>
      </div>
    </DashCard>
  )
};

export default GoalCenter;