import React from "react";
import Accordion from "components/molecules/Accordion";
import NewTable from "components/molecules/NewTable";
import {Link} from "react-router-dom";
import {FaPlus as PlusIcon, FaMinus as MinusIcon, FaRegTrashAlt as TrashIcon, FaRegEdit as EditIcon, FaCheck as CheckIcon} from "react-icons/fa";
import TrialChart from "components/atoms/TrialChart";
import Box from "components/atoms/Box";
import Section from "components/atoms/Section";
import Button from "components/atoms/Button";
import ImmutableTextArea from "./ImmutableTextArea";

const GoalDrilldown = (
    {
        handleModal,
        student,
        studentIndex,
        setGoal,
        goalIndex,
        setGoalIndex,
        benchmark,
        benchmarkIndex,
        setBenchmarkIndex,
        trial,
        setTrial,
        trialIndex,
        setTrialIndex,
        classroomIndex
    }) =>
{

    const stuWithGoals = student && student.goals.length !== 0;
    const trials = benchmark?.trials || null;
    const trackings = (trials !== null && trials[trialIndex]?.trackings) || null;
    const createGoalFor = {
        student: student,
        classroomIndex: classroomIndex,
        studentIndex: studentIndex
    };

    const selectedBenchmarkCallback = (obj, benchmarkIndex, goalIndex) => {
        setGoalIndex(goalIndex);
        setBenchmarkIndex(benchmarkIndex);
        setTrialIndex(999);
    };

    const selectedTrialCallback = (obj, trialIndex) => {
        setTrialIndex(trialIndex);
    };

    const determineTrialAccuracy = () => {
        const correct = trackings.filter(t => t.correct === 1);
        const a = Math.floor((correct.length / trackings.length * 100));
        let obj = {};
        obj.accuracy = a;
        obj.inaccuracy = 100-a;
        obj.correct = correct.length;
        obj.incorrect = trackings.length - correct.length;
        obj.total = trackings.length;
        obj.correctLabels = correct.map(trial => trial.label).join(", ");
        obj.incorrectLabels = trackings.filter(track => track.correct !== 1).map(trial => trial.label).join(", ");
        return obj;
    };

    const handleGoalAction = (action, index) => {
        //setGoalIndex(index);
        setGoal(student.goals[index]);
        handleModal(action);
    };

    const trialAccuracyResults = (trackings !== null && determineTrialAccuracy());
    const benchmarkIconSet = <CheckIcon className={"success"}/>;
    const iconSet = {
        'editGoal': <EditIcon className={"i-right hover-color selectable"}/>,
        'deleteGoal': <TrashIcon className={"hover-color selectable"}/>
    };

    const trialIcons = (trial) => {
        return <span>
            {
                Object.keys(iconSet).map((icon, ind) =>
                        <span key={`Trial${trial.id}IconNo${ind}`} onClick={(e) => {
                            e.stopPropagation();
                            setTrial(trial);
                            handleModal(icon === "editGoal" ? "editTrial" : "deleteTrial");
                        }}
                >{iconSet[icon]}</span>
                )
            }
        </span>
    };

    return (
        <div className={"drilldownwrapper"}>
            <div className={"drilldown"}>
                <div className={"drilldown-goals"}>
                    <div className={"marg-bot-2 flex-center-between"}>
                        <h2>Goals for {student ? student.name.charAt(0).toUpperCase() + student.name.substring(1) : "..."}</h2>
                        <Link push="true" className={`button-a ${!student && 'disabled'}`} to={{pathname: "/dashboard/goalcenter/create", state: createGoalFor}}>
                            <Button
                                text="Create Goal"
                                icon={<PlusIcon className={"i-right"}/>}
                                className={student ? "enabled" : "disabled"}
                            />
                        
                        </Link>
                    </div>
                    {
                        stuWithGoals
                            ? <Accordion
                                data={student.goals.map(goal => goal.goalName)}
                                icons={iconSet}
                                sendIndexUp={handleGoalAction}
                            >
                                {
                                    student.goals.map((goal, goalind) => {
                                        return (
                                            <div key={`goaldrilldowntable${goalind}`}>
                                                <p><strong>Goal: </strong>{goal.goal}</p>
                                                <p><strong>Description: </strong>{goal.process}</p>
                                                <p><strong>Start date: </strong>{goal.startDate}</p>
                                                <p><strong>Projected mastery date: </strong>{goal.masteryDate}</p>
                                                <p><strong>Mastery date: </strong>{goal.complete ? goal.completionDate : "N/A"}</p>
                                                <p className={"marg-bot"}><strong>Monitor after mastery: </strong>{goal.monitor === 0 ? "No" : "Yes"}</p>
                                                    <NewTable
                                                        headers={[`Benchmarks (${goal.benchmarks.length})`]}
                                                        data={goal.benchmarks.length === 0 ? [{text: "Edit goal to add benchmarks"}] : null}
                                                    >
                                                        {
                                                            goal.benchmarks.map((bm, ind) => {
                                                                return (
                                                                    <div 
                                                                        key={`benchmarkRow${ind}`}
                                                                        className={`tr selectable ${goalIndex === goalind && goal.benchmarks.length && benchmarkIndex === ind ? "selected-bg" : ""}`}
                                                                        onClick={() => {selectedBenchmarkCallback(null, ind, goalind);}}
                                                                        >
                                                                        <div className="td">
                                                                            { bm.label }
                                                                            { bm.complete ? benchmarkIconSet : <></>}
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </NewTable>
{/*                                                  <Table
                                                        headers={[`Benchmarks (${goal.benchmarks.length})`]}
                                                        selectedCallback={(obj, ind) => {selectedBenchmarkCallback(obj, ind, goalind);}}
                                                        selectedRowIndexes={goalIndex === goalind && goal.benchmarks.length !== 0 ? benchmarkIndex : null}
                                                        data={
                                                            goal.benchmarks.length === 0
                                                                ? [{text: "Edit goal to add benchmarks"}]
                                                                : goal.benchmarks.map(bm => {
                                                                    return {label: bm.label, icon: bm.complete ? benchmarkIconSet: ""};
                                                                })
                                                        }/> */}
                                            </div>
                                        )
                                    })
                                }
                              </Accordion>
                            : <></>
                    }
                </div>
                <div className={"drilldown-trials"}>
                    <div className={"marg-bot-2 flex-center-between"}>
                        <h2>{benchmark ? benchmark.label : "Benchmark"}</h2>
                            <Button
                                icon={<PlusIcon className={"i-right"}/>}
                                text={"Create Trial"}
                                className={benchmark ? "enabled" : "disabled"}
                                onClick={() => handleModal("createTrial")}
                            />
                    </div>
                    {
                        stuWithGoals && benchmark &&
                            <>
                                <Section>
                                    <p><strong>Projected mastery date: </strong>{benchmark?.masteryDate}</p>
                                    <p><strong>Mastery date: </strong>{benchmark?.complete === 1 ? benchmark?.metDate : "N/A"}</p>
                                    <p><strong>Tracking type: </strong>{benchmark?.tracking}</p>
                                    <p><strong>Description: </strong>{benchmark?.description}</p>
                                </Section>
                                <Section>
                                    {                                    
                                        trials.length !== 0
                                            ? <NewTable
                                                headers={[`Trials (${benchmark.trials.length})`]}>
                                                    {
                                                        trials.map((trial, index) => {
                                                            return (
                                                                <div
                                                                    className={`tr selectable ${trialIndex === index ? 'selected-bg' : ''}`}
                                                                    onClick={() => {selectedTrialCallback(null, index)}}
                                                                    key={`trial-${trial.id}`}
                                                                >
                                                                    <div className="td">
                                                                        {`Trial #${trial.trialNumber} - ${trial.dateStarted}`}
                                                                        {trialIcons(trial)}
                                                                    </div>
                                                                </div>
                                                            );
                                                        })
                                                    }
                                              </NewTable>
                                            : <Box text="No trials"/>
                                    }
                                </Section>
                                <div className={"flex-column"}>
                                    <Button
                                         className={"marg-bot"}
                                         onClick={() => handleModal("completeBenchmark")}
                                         icon={<CheckIcon className={"i-right"}/>}
                                         text={`${benchmark.complete === 0 ? "Master" : "Unmaster"} benchmark`}
                                    />
                                </div>
                            </>
                    }
                </div>
                <div className={"drilldown-trialmeta"}>
                    <h2 className={"marg-bot-2"}>Tracking for trial {trialIndex !== null ? trial?.trialNumber : ".."}</h2>
                    {
                        trackings !== null
                            ? <div>
                                <p className={"marg-bot"}><strong>Trial Accuracy: </strong>{trialAccuracyResults.accuracy}%</p>
                                {
                                    trackings.map(track => {
                                        return (
                                            <p key={`tracklabel${track.label.toUpperCase()}`}>
                                                <strong>Label: </strong>
                                                {track.label}
                                                <span className={"marg-left"}>{track.correct === 1 ? <PlusIcon className={"comp-color"}/> : <MinusIcon className={"incomp-color"}/>}</span>
                                            </p>
                                        )
                                    })
                                }
                                <TrialChart trialResults={trialAccuracyResults}/>
                                <p className={"marg-top"}><strong>Comments: </strong></p>

                                <ImmutableTextArea rawData={trial.comments} />
                                {/* <p>{trial.comments}</p> */}
                              </div>
                            : <></>
                    }
                </div>
            </div>
        </div>
    )
};

export default GoalDrilldown;