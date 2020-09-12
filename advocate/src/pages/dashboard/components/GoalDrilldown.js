import React from "react";
import Accordion from "./accordion/Accordion";
import Table from "./Table";
import {Link} from "react-router-dom";
import {FaPlus as PlusIcon, FaMinus as MinusIcon, FaRegTrashAlt as TrashIcon, FaRegEdit as EditIcon, FaCheck as CheckIcon} from "react-icons/fa";
import TrialChart from "./TrialChart";


const GoalDrilldown = (
    {
        handleModal,
        student,
        goal,
        setGoal,
        goalIndex,
        setGoalIndex,
        benchmark,
        setBenchmark,
        benchmarkIndex,
        setBenchmarkIndex,
        trial,
        setTrial,
        trialIndex,
        setTrialIndex
    }) =>
{

    const stuWithGoals = student && student.goals.length !== 0;
    const trials = benchmark?.trials || null;
    const trackings = trials !== null && trials[trialIndex]?.trackings || null;

    const selectedBenchmarkCallback = (obj, benchmarkIndex, goalIndex) => {
        let goal =  student.goals[goalIndex];
        let bm = goal.benchmarks[benchmarkIndex];
        setGoalIndex(goalIndex);
        //setGoal(goal);
        setBenchmarkIndex(benchmarkIndex);
        //setBenchmark(bm);
        //resets the trial switching between benchmarks
        //setTrial(null);
        setTrialIndex(999);
    };

    const selectedTrialCallback = (obj, trialIndex) => {
        setTrialIndex(trialIndex);
        //setTrial(benchmark.trials[trialIndex]);
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
    const benchmarkIconSet = <span className={"success"}><CheckIcon/></span>;
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
                        <Link push="true" className={`button-a ${!student && 'disabled'}`} to={"/dashboard/goalcenter/create"}>
                            <button className={student ? "enabled" : "disabled"}><PlusIcon className={"i-right"}/>Create Goal</button>
                        </Link>
                    </div>
                    {
                        stuWithGoals
                            ? <Accordion
                                allOpen
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
                                                <Table
                                                    headers={[`Benchmarks (${goal.benchmarks.length})`]}
                                                    selectable={goal.benchmarks.length !== 0}
                                                    selectedCallback={(obj, ind) => {selectedBenchmarkCallback(obj, ind, goalind);}}
                                                    selectedRowIndexes={goalIndex == goalind && goal.benchmarks.length !== 0 ? benchmarkIndex : null}
                                                    data={
                                                        goal.benchmarks.length === 0
                                                            ? [{text: "Edit goal to add benchmarks"}]
                                                            : goal.benchmarks.map(bm => {
                                                                return {label: bm.label, icon: bm.complete ? benchmarkIconSet: ""};
                                                              })
                                                    }
                                                />
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
                        <button
                            onClick={() => {
                                handleModal("createTrial");
                            }}
                            className={benchmark ? "enabled" : "disabled"}>
                            <PlusIcon className={"i-right"}/>
                            <span>Create Trial</span>
                        </button>
                    </div>
                    {
                        stuWithGoals && benchmark &&
                            <>
                                <div className={"marg-bot-2"}>
                                    <p><strong>Projected mastery date: </strong>{benchmark?.masteryDate}</p>
                                    <p><strong>Mastery date: </strong>{benchmark?.complete == 1 ? benchmark?.metDate : "N/A"}</p>
                                    <p><strong>Tracking type: </strong>{benchmark?.tracking}</p>
                                    <p><strong>Description: </strong>{benchmark?.description}</p>
                                </div>
                                <div className={"marg-bot-2"}>
                                    <Table key={`benchmarktablefor${benchmarkIndex}`}
                                           headers={[`Trials (${benchmark.trials.length})`]}
                                           selectable={trials && trials.length !== 0}
                                           selectedRowIndexes={benchmark.trials.length !== 0 ? trialIndex : null}
                                           selectedCallback={
                                               (obj, ind) => {
                                                   selectedTrialCallback(obj, ind);
                                               }
                                           }
                                           data={
                                               trials.length !== 0
                                                   ? trials.map(trial => {
                                                       return {
                                                           text: `Trial #${trial.trialNumber} - ${trial.dateStarted}`,
                                                           icon: trialIcons(trial)
                                                       }
                                                    })
                                                   : [{text: "No trials"}]
                                           }
                                    />
                                </div>
                                <div className={"flex-column"}>

                                    <button className={"marg-bot"}
                                            onClick={() => {
                                                handleModal("completeBenchmark");
                                            }}>
                                        <CheckIcon className={"i-right"}/>
                                        <span>{benchmark.complete === 0 ? "Master" : "Unmaster"} benchmark</span>
                                    </button>
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
                                <p>{trial.comments}</p>
                              </div>
                            : <></>
                    }
                </div>
            </div>
        </div>
    )
};

export default GoalDrilldown;