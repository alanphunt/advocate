import React, {useEffect, useState} from "react";
import Accordion from "components/molecules/Accordion";
import Table from "components/molecules/Table";
import {FaRegCopy as CopyIcon, FaPlus as PlusIcon, FaMinus as MinusIcon, FaRegTrashAlt as TrashIcon, FaRegEdit as EditIcon, FaCheck as CheckIcon} from "react-icons/fa";
import TrialChart from "components/atoms/TrialChart";
import Box from "components/atoms/Box";
import Section from "components/atoms/Section";
import Button from "components/atoms/Button";
import ImmutableTextArea from "./ImmutableTextArea";
import {determineTrialAverage, determineTrialAccuracy} from "utils/functions/functions";
import TableAccordionGroup from "./TableAccordionGroup";
import { useAuth } from "utils/auth/AuthHooks";
import ModalBody from "components/molecules/ModalBody";
import {crudFetch, fetchPost, formifyObject} from "utils/functions/functions";
import ScoreTrial from "components/molecules/ScoreTrial";
import CreateTrial from "components/molecules/CreateTrial.js"
import CompleteBenchmark from "components/molecules/CompleteBenchmark";
import CreateGoal from "components/pages/creategoal/CreateGoal";
import EditGoal from "components/molecules/EditGoal";
import { useUi } from 'utils/ui/UiHooks';

const GoalDrilldown = ({setStudentIndex, classroomIndex, studentIndex}) =>
{ 
  const {setLargeModal, setToasterText, setModalBody, closeModal, modalAction, setModalAction} = useUi();
  const {teacher, setTeacher} = useAuth();
  const [template, setTemplate] = useState("");
    const student = teacher.classrooms[classroomIndex].students[studentIndex];

  const [goalIndex, setGoalIndex] = useState(-1);
  const [benchmarkIndex, setBenchmarkIndex] = useState(-1);
  const [trialIndex, setTrialIndex] = useState(-1);
  
  let goal = student?.goals[goalIndex];
  let benchmark = goal?.benchmarks[benchmarkIndex];
  let trial = benchmark?.trials[trialIndex];

  const stuWithGoals = student && student.goals?.length;
  const trials = benchmark?.trials || null;
  const trackings = trial?.trackings || null;

  const handleGoalMutation = (updatedGoal) => {

      setTeacher(prev => {
          return {
              ...prev, 
              classrooms: [...prev.classrooms, {...prev.classrooms[classroomIndex],
                    students: [...prev.classrooms[classroomIndex].students, {...prev.classroomss[classroomIndex].students[studentIndex], 
                        goals: [...prev.classrooms[classroomIndex].students[studentIndex].goals, {...prev.classrooms[classroomIndex].students[studentIndex].goals, ...updatedGoal }]}]}
                ]}
      });
  };

   useEffect(() => {
      if(mutableGoal){
          setGoalIndex(-1);
          setBenchmarkIndex(-1);
          setTrialIndex(-1);
      }
  }, [student])

  useEffect(() => {

      setMutableGoal(student.goals[goalIndex])
    }, [goalIndex]);
  useEffect(() => setMutableTrial(student.goals[goalIndex].benchmarks[benchmarkIndex].trials[trialIndex]), [trialIndex]);

  useEffect(() => {
      if(modalAction)
        setModalBody(determineModalChild(modalAction));
  }, [modalAction]);

  const selectedBenchmarkCallback = (benchmark, benchmarkIndex, goalIndex) => {
      setGoalIndex(goalIndex);
      setBenchmarkIndex(benchmarkIndex);
      setTrialIndex(-1);
  };

  const determineModalChild = () => {
      switch(modalAction){
        case "createGoal":
            setLargeModal(true);
            return (
                <CreateGoal
                    initialStudentName={student?.name}
                    studentId={student?.id}
                    completeCrudOp={completeCrudOp}
                    teacher={teacher}
                    setStudentIndex={setStudentIndex}
                />
            );
        case "editGoal":
            setLargeModal(true);
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
            setLargeModal(true);
            return (
                <ModalBody header={`Copy goal ${mutableGoal?.goalName} to which students?`}>
                    <p>Copy goal to selected students, option to copy benchmarks as well.</p>
                </ModalBody>
            );
        case "createBaseline":
            setLargeModal(true);
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
                    benchmark={benchmark}
                    completeCrudOp={completeCrudOp}
                    closeModal={closeModal}
                    benchmarkParentGoal={mutableGoal}
                />
            );
        case "createTrial":
            setLargeModal(true);
            return (
                <ModalBody
                    header={`Create a trial for ${benchmark?.label} from these ${benchmark?.tracking}-based templates`}
                    hideButtons
                >
                    <CreateTrial
                        benchmark={benchmark}
                        template={template}
                        setTemplate={setTemplate}
                        studentName={student?.name}
                        completeCrudOp={completeCrudOp}
                    />
                </ModalBody>
            );
        case "editTrial":
            setLargeModal(true);
            return (
                <ModalBody
                header={`Edit trial ${mutableTrial?.trialNumber}`}
                hideButtons
              >
                <ScoreTrial
                    setTeacher={setTeacher}
                    benchmark={benchmark}
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
                    header={`Delete trial ${trial?.trialNumber}`}
                    cancelCallback={closeModal}
                    confirmCallback={deleteTrial}
                >
                    <p>Note that this action cannot be undone. This will also delete all associated tracking data. Proceed?</p>
                </ModalBody>
            );
        default: return null;
      }
  };

  const handleGoalIconAction = (action, index) => {
      setGoalIndex(index);
      setModalBody(determineModalChild(action));
  };

  const handleTrialIconAction = (e, iconKey, index) => {
    e.stopPropagation();
    setTrialIndex(index);
    setModalAction(iconKey);
  };

  const fetchDeleteGoal = () => crudFetch({
              path: `deletegoal?goalId=${mutableGoal.id}`, 
              method: "DELETE", 
              success: (data) => completeCrudOp(data, <><CheckIcon className="i-right"/>Successfully deleted goal {mutableGoal.goalName}</>), 
              error: () => {},
              serverError: () => {}
  });

  const trialAccuracyResults = (trackings !== null && determineTrialAccuracy(trackings));
  
  const goalIconSet = { 
    'editGoal': <EditIcon className={"i-right hover-color selectable"}/>,
    'copyGoal': <CopyIcon className={"i-right hover-color selectable"}/>,
    'deleteGoal': <TrashIcon className={"hover-color selectable"}/>
  };

  const trialIconSet = {
      'editTrial': <EditIcon className={"i-right hover-color selectable"}/>,
      'deleteTrial': <TrashIcon className={"hover-color selectable"}/>
  };

  const deleteTrial = () => {
      let updatedTrials = benchmark.trials.filter(t => t.id !== mutableTrial.id);
      // let updatedTrials = selectedBenchmark.trials.filter(t => t.id !== trial.id);
      updatedTrials = updatedTrials.map((t, i) => {return {...t, trialNumber: i+1}});
      const bm = {...benchmark, trials: [...updatedTrials]};
      fetchPost(
          "editBenchmark", 
          bm, 
          (data) => completeCrudOp(data, <><CheckIcon className="i-right"/>Successfully deleted ${mutableTrial.label}!</>)
      );
  };

  const completeCrudOp = (data, message, preventClose) => {
    setToasterText(<p>{message}</p>);
    setTeacher(data);
    if(!preventClose){
        closeModal();
    }
        
};

  return (
      <div className={"drilldownwrapper"}>
          <div className={"drilldown"}>
              <div className={"drilldown-goals"}>
                  <div className={"marg-bot-2 flex-center-between"}>
                      <h2>Goals for {student ? student.name.charAt(0).toUpperCase() + student.name.substring(1) : "..."}</h2>
                          <div>
                              <Button
                                  text="Create Baseline"
                                  className="marg-right"
                                  icon={<PlusIcon className={"i-right"}/>}
                                  className={`marg-right${student ? " enabled" : " disabled"}`}
                                  onClick={() => setModalAction("createBaseline")}
                              />
                              <Button
                                  text="Create Goal"
                                  icon={<PlusIcon className={"i-right"}/>}
                                  className={student ? "enabled" : "disabled"}
                                  onClick={() =>  setModalAction("createGoal")}
                              />
                          </div>
                  </div>
                  {
                      stuWithGoals
                          ? <TableAccordionGroup
                              openIndex={0}
                              accordionHeaders={student.goals.map(goal => goal.goalName)}
                              accordionIcons={goalIconSet}
                              accordionIconCallback={handleGoalIconAction}
                              tableHeaders={["Benchmarks"]}
                              tableData={student.goals.map(goal => goal.benchmarks.map(bm => ({label: bm.label})))}
                              selectedRowCallback = {(benchmark, goalIndex, bmIndex) => selectedBenchmarkCallback(benchmark, bmIndex, goalIndex)}
                              conditionalIcons={{"label" : student.goals.map(goal => goal.benchmarks.map(bm => bm.correct ? <CheckIcon className={"success"}/> : null))}}
                              includeCountInTableHeader
                          >
                              {
                                  student.goals.map((goal, goalind) => {
                                      return (
                                          <div key={`goaldrilldowntable-${goal.id}`}>
                                              <p><strong>Goal: </strong></p>
                                              <ImmutableTextArea rawData={goal.goal} />
                                              <p><strong>Description: </strong>{goal.process || 'N/A'}</p>
                                              <p><strong>Start date: </strong>{goal.startDate}</p>
                                              <p><strong>Projected mastery date: </strong>{goal.masteryDate}</p>
                                              <p><strong>Actual mastery date: </strong>{goal.complete ? goal.completionDate : "N/A"}</p>
                                              <p className={"marg-bot"}><strong>Monitor after mastery: </strong>{goal.monitor === 0 ? "No" : "Yes"}</p>
                                          </div>
                                      )
                                  })
                              }
                            </TableAccordionGroup>
                          : <></>
                  }
              </div>
              <div className={"drilldown-trials"}>
                  <div className={"marg-bot-2 flex-center-between"}>
                      <h2>{benchmark ? benchmark.label : "Benchmark ..."}</h2>
                          <Button
                              icon={<PlusIcon className={"i-right"}/>}
                              text={"Create Trial"}
                              className={benchmark ? "enabled" : "disabled"}
                              onClick={() => setModalBody(determineModalChild("createTrial"))}
                          />
                  </div>
                  {
                      stuWithGoals && benchmark &&
                          <>
                              <Section>
                                  <p><strong>Description: </strong></p>
                                  <ImmutableTextArea rawData={benchmark.description}/>
                                  <p><strong>Projected mastery date: </strong>{benchmark.masteryDate}</p>
                                  <p><strong>Actual mastery date: </strong>{benchmark.complete === 1 ? benchmark.metDate : "N/A"}</p>
                                  <p><strong>Tracking type: </strong>{benchmark.tracking}</p>
                                  <p><strong>Trial Average: </strong>{benchmark ? `${determineTrialAverage(benchmark)}%` : "..."}</p>
                              </Section>
                              <Section>
                                  {                                    
                                      trials.length
                                          ? <Table
                                              headers={[`Trials (${trials.length})`]}
                                              data={trials.map(trial => trial.label)}
                                              selectedCallback={(trial, trialIndex) => setTrialIndex(trialIndex)}
                                              conditionalIcons={{"label": trials.map(trial => {
                                                  return (
                                                      <span>
                                                          {
                                                              Object.keys(trialIconSet).map((iconKey, ind) => {
                                                                      return (
                                                                          <span 
                                                                              key={`Trial${trial.id}IconNo${ind}`}
                                                                              onClick={(e) => handleTrialIconAction(e, iconKey, ind)}>
                                                                              {trialIconSet[iconKey]}
                                                                          </span>
                                                                      )
                                                              })
                                                          }
                                                      </span>
                                                  )
                                              })}}
                                          />
                                          : <Box text="No trials"/>
                                  }
                              </Section>
                              <div className={"flex-column"}>
                                  <Button
                                        onClick={() => setModalBody(determineModalChild("completeBenchmark"))}
                                        icon={<CheckIcon className={"i-right"}/>}
                                        text={`${benchmark.complete === 0 ? "Master" : "Unmaster"} benchmark`}
                                  />
                              </div>
                          </>
                  }
              </div>
              <div className={"drilldown-trialmeta"}>
                  <h2 className={"marg-bot-2"}>Tracking for {trial ? trial.label : "..."}</h2>
                  {
                      trackings
                          ? <div>
                                  {
                                      trackings.length
                                      ? (
                                          <>
                                              <p className={"marg-bot"}><strong>Trial Accuracy: </strong>{trialAccuracyResults.accuracy}%</p>
                                                  {trackings.map(track => {
                                                      return (
                                                          <p key={`tracklabel${track.label.toUpperCase()}`}>
                                                              <strong>Label: </strong>
                                                              {track.label}
                                                              <span className={"marg-left"}>
                                                                  {track.correct === 1 ? <PlusIcon className={"comp-color"}/> : <MinusIcon className={"incomp-color"}/>}
                                                              </span>
                                                          </p>
                                                      )
                                                  })}
                                              <TrialChart trialResults={trialAccuracyResults}/>
                                          </>
                                      ) : (
                                          <></>
                                      )
                                  }
                              <p className={"marg-top"}><strong>Comments: </strong></p>
                              <ImmutableTextArea rawData={trial.comments} />
                            </div>
                          : <></>
                  }

              </div>
          </div>
      </div>
  )
};

export default GoalDrilldown;
/* 


student.goals.map(goal => `Benchmarks (${goal.benchmarks.length})`)
<Table
                                              headers={[`Trials (${trials.length})`]}>
                                                  {
                                                      trials.map((trial, index) => {
                                                          return (
                                                              <div
                                                                  className={`tr selectable ${trialIndex === index ? 'selected-bg' : ''}`}
                                                                  onClick={() => {selectedTrialCallback(null, index)}}
                                                                  key={`trial-${trial.id}`}
                                                              >
                                                                  <div className="td">
                                                                      {trial.label}
                                                                      {trialIcons(trial)}
                                                                  </div>
                                                              </div>
                                                          );
                                                      })
                                                  }
                                            </Table> */
/*
{
                      stuWithGoals
                          ? <Accordion
                              openIndex={0}
                              data={student.goals.map(goal => goal.goalName)}
                              icons={iconSet}
                              sendIndexUp={handleGoalAction}
                          >
                              {
                                  student.goals.map((goal, goalind) => {
                                      return (
                                          <div key={`goaldrilldowntable-${goalind}`}>
                                              <p><strong>Goal: </strong></p>
                                              <ImmutableTextArea rawData={goal.goal} />
                                              <p><strong>Description: </strong>{goal.process || 'N/A'}</p>
                                              <p><strong>Start date: </strong>{goal.startDate}</p>
                                              <p><strong>Projected mastery date: </strong>{goal.masteryDate}</p>
                                              <p><strong>Actual mastery date: </strong>{goal.complete ? goal.completionDate : "N/A"}</p>
                                              <p className={"marg-bot"}><strong>Monitor after mastery: </strong>{goal.monitor === 0 ? "No" : "Yes"}</p>
                                                  <Table
                                                      headers={[`Benchmarks (${goal.benchmarks.length})`]}
                                                      data={goal.benchmarks.length === 0 ? [{text: "Edit goal to add benchmarks"}] : null}
                                                  >
                                                      {
                                                          goal.benchmarks.map((bm, bmInd) => {
                                                              return (
                                                                  <div 
                                                                      key={`benchmarkRow${bmInd}`}
                                                                      className={`tr selectable ${goalIndex === goalind && goal.benchmarks.length && benchmarkIndex === bmInd ? "selected-bg" : ""}`}
                                                                      onClick={() => selectedBenchmarkCallback(null, bmInd, goalind)}
                                                                      >
                                                                      <div className="td">
                                                                          { bm.label }
                                                                          { bm.complete ? benchmarkIconSet : <></>}
                                                                      </div>
                                                                  </div>
                                                              )
                                                          })
                                                      }
                                                  </Table>
                                          </div>
                                      )
                                  })
                              }
                            </Accordion>
                          : <></>
                  }

*/