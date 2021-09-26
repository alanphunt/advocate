import React, {Suspense, useState, useEffect} from "react";
import H2 from "components/atoms/H2";
import GoalDrilldown from "../drilldown/GoalDrilldown";
import BenchmarkDrilldown from "../drilldown/BenchmarkDrilldown";
import TrialDrilldown from "../drilldown/TrialDrilldown";
import Col from "components/atoms/Col";
import {Baseline, Goal, Trial} from "utils/classes/ContextModels";
import {crudFetch} from "utils/functions/functions";
import {FaCheck as CheckIcon} from "react-icons/fa";
import {
  DELETE_BASELINE_LOADING,
  DELETE_TRIAL_LOADING,
  EDIT_BASELINE_LOADING,
  NOT_LOADING,
  SERVER_ERROR
} from "utils/constants";
import CreateGoal from "../CreateGoal";
import EditGoal from "../EditGoal";
import ModalBody from "../ModalBody";
import CopyGoal from "../CopyGoal";
import CreateBaseline from "../CreateBaseline";
import CompleteBenchmark from "../CompleteBenchmark";
import CreateTrial from "components/templates/CreateTrial";
import {TEMPLATE_TYPES} from "components/templates/TemplateList";
import TemplateLoadingPlaceholder from "components/atoms/TemplateLoadingPlaceholder";

const EditBestOutOf = React.lazy(() => import("components/templates/score/best-out-of/EditBestOutOfTrial"));
const EditBasicScore = React.lazy(() => import("components/templates/score/basic-score/EditScoreTrial"));

const GoalCenterDrilldown = ({studentId, teacher, modalAction, setModalAction, setTeacher, setToasterText, closeModal, signout, setStudentId, setModalBody}) => {
  const [isLoading, setIsLoading] = useState(NOT_LOADING);
  const {students, classrooms, goals, benchmarks, trials, trackings, trackingMeta, documents} = teacher;
  const selectedStudent = students[studentId];
  const selectedStudentGoals = selectedStudent?.goalIds.map(goalId => goals[goalId]);

  const [goalId, setGoalId] = useState("");
  const goal = goals[goalId];
  const selectedBenchmarkGoals = goal?.benchmarkIds.map(id => benchmarks[id]);

  const [benchmarkId, setBenchmarkId] = useState("");
  const benchmark = benchmarks[benchmarkId];
  const selectedBenchmarkTrials = benchmark?.trialIds.map(id => trials[id]);

  const [trialId, setTrialId] = useState("");
  const trial = trials[trialId];
  const tracking = trackings[trial?.trackingId];
  const selectedTrackingMeta = tracking?.trackingMetaIds.map(id => trackingMeta[id]);

  const trialDocuments = trial?.documentIds.map(id => documents[id]);

  const [mutableGoal, setMutableGoal] = useState(new Goal());
  const [mutableTrial, setMutableTrial] = useState(new Trial());

  const [baseline, setBaseline] = useState(null);
  const [mutableBaseline, setMutableBaseline] = useState(null);

  const completeCrudOp = (data, message, preventClose) => {
    setToasterText(<p>{message}</p>);
    setTeacher(data);
    if(!preventClose)
      closeModal();
    setIsLoading(NOT_LOADING)
  };

  const goalCreationSuccessful = (data, message, preventClose) => {
    setToasterText(<p>{message}</p>);
    setTeacher(prev => ({
      ...prev,
      students: {...prev.students, [studentId]: {...selectedStudent, goalIds: [...selectedStudent.goalIds, Object.keys(data.goal)[0]]}},
      goals: {...prev.goals, ...data.goal},
      benchmarks: {...prev.benchmarks, ...data.benchmarks}
    }))
    if(!preventClose)
      closeModal();
    setIsLoading(NOT_LOADING)
  };

  const completeCrudOpAndSetNewTrial = (data, message, preventClose) => {
    const newTrialId = Object.keys(data.trials).filter(id => !Object.keys(trials).includes(id))[0];
    console.log("new trial id: ", newTrialId)
    // const newTrialId = Object.values(data.trials).filter(trial => !Object.keys(teacher.trials).includes(trial.id))[0].id
    completeCrudOp(data, message, preventClose);
    setTrialId(newTrialId);
  };

  const deleteTrial = () => {
    setIsLoading(DELETE_TRIAL_LOADING)
    crudFetch({
      path: `deletetrial?trialId=${mutableTrial.id}&benchmarkId=${mutableTrial.benchmarkId}`,
      method: "DELETE",
      success: (data) => completeCrudOp(data, <><CheckIcon className="i-right"/>Successfully deleted {mutableTrial.label}!</>),
      error: () => {setIsLoading(NOT_LOADING); alert(SERVER_ERROR)},
      serverError: signout
    });
  };

  const executeBaselineDeletion = () => {
    setIsLoading(DELETE_BASELINE_LOADING);
    crudFetch({
      path: `deletebaseline?baselineId=${baseline.id}`,
      method: "DELETE",
      success: (data) => {setBaseline(null); completeCrudOp(data, <><CheckIcon className="i-right"/>Successfully deleted {baseline.label}!</>);},
      error: () => {setIsLoading(NOT_LOADING); alert(SERVER_ERROR)},
      serverError: () => {}
    })
  };

  const executeBaselineEdit = () => {
    setIsLoading(EDIT_BASELINE_LOADING);
  };

  const determineModalChild = () => {
    switch(modalAction){
      case "createGoal":
        return (
          <CreateGoal
            student={selectedStudent}
            setStudentId={setStudentId}
            completeCrudOp={goalCreationSuccessful}
            classrooms={classrooms}
            students={students}
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
              classrooms={Object.values(classrooms)}
              students={students}
              completeCrudOp={goalCreationSuccessful}
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
            header={`Create a Baseline for ${selectedStudent?.name}`}
            hideButtons
          >
            <CreateBaseline
              student={selectedStudent}
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
            goalBenchmarks={selectedBenchmarkGoals}
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
            studentName={selectedStudent?.name}
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
          studentName={selectedStudent?.name}
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
      error: () => setIsLoading(NOT_LOADING),
      serverError: signout
    });
  }

  const resetState = () => {
    console.log("resetting goalcenterdrilldown state..")
    setGoalId("");
    setTrialId("");
    setBenchmarkId("");
    setBaseline(new Baseline());

    setMutableGoal(new Goal());
    setMutableTrial(new Trial());
    setMutableBaseline(new Baseline());
    setIsLoading(NOT_LOADING);
  };

  const handleTrialIconAction = (e, iconAction, trial) => {
    e.stopPropagation();
    const track = {...trackings[trial.trackingId]};
    if (trial.trialTemplate === TEMPLATE_TYPES.SCORE_BASIC)
      Object.assign(track, {trackingMeta: track.trackingMetaIds.map(id => trackingMeta[id])});

    setMutableTrial({...trial, documents: trial.documentIds.map(id => documents[id]), tracking: track});
    setModalAction(iconAction);
  };

  const prepareMutableGoal = () => {

  };

  useEffect(resetState, [studentId]);

  useEffect(() => {
    setModalBody(determineModalChild());
  }, [modalAction, trialId, mutableTrial, mutableGoal, isLoading])

  useEffect(() => {
    setTrialId("");
  }, [benchmarkId]);

  useEffect(() => {
    if(!modalAction){
      // setIsLoading({"":false});
      if(mutableTrial?.id)
        setMutableTrial(new Trial());
      if(mutableGoal?.id)
        setMutableGoal(new Goal());
    }
  }, [modalAction]);

  useEffect(prepareMutableGoal, [mutableGoal]);

  return (
    <Col span={16} classes={"col-padding"}>
      <H2 margin>{ studentId ? `${selectedStudent.name}'s ` : "" }Goal Summary</H2>
      <GoalDrilldown
        studentId={studentId}
        goals={selectedStudentGoals}
        allBenchmarks={benchmarks}
        setGoalId={setGoalId}
        benchmarkId={benchmarkId}
        setBenchmarkId={setBenchmarkId}
        setMutableGoal={setMutableGoal}
        setModalAction={setModalAction}
      />
      <BenchmarkDrilldown
        trials={selectedBenchmarkTrials}
        benchmark={benchmark}
        setTrialId={setTrialId}
        trialId={trialId}
        setModalAction={setModalAction}
        handleTrialIconAction={handleTrialIconAction}
      />
      <TrialDrilldown
        trial={trial}
        tracking={tracking}
        trackingMeta={selectedTrackingMeta}
        documents={trialDocuments}
      />
    </Col>
  );
};

export default GoalCenterDrilldown;