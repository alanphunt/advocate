import React, {useEffect, useRef, useState} from "react";
import Accordion from "./accordion/Accordion";
import Table from "./Table";
import {Link} from "react-router-dom";
import {FaPlus as PlusIcon, FaMinus as MinusIcon, FaRegTrashAlt as TrashIcon, FaRegEdit as EditIcon, FaCheck as CheckIcon} from "react-icons/fa";
import TrialChart from "./TrialChart";


const GoalDrilldown = (props) => {


/*     function usePrev(value){
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current
    }*/

    let stu = props.student ?? null;
    const selectedGoalIndex = props.selectedGoalIndex;
    const setSelectedGoalIndex = props.setSelectedGoalIndex;
    const [benchmarkRow, setBenchmarkRow] = useState();
    const [trialRow, setTrialRow] = useState();
    const selectedBenchmark = props.benchmark;
    const setSelectedBenchmark = props.setBenchmark;

    const [selectedTrial, setSelectedTrial] = useState();
    const [trials, setTrials] = useState([]);
    const trackings = selectedTrial?.trackings || null;
    const stuWithGoals = stu && stu.goals.length !== 0;

    const selectedBenchmarkCallback = (obj, ind, goalindex) => {
        let bm = stu.goals[goalindex].benchmarks[ind];
        setSelectedGoalIndex(goalindex);
        setBenchmarkRow(ind);
        setSelectedBenchmark(bm);
        setTrials(bm.trials);
        setSelectedTrial(null);
        setTrialRow(999);
    };

    const selectedTrialCallback = (obj, ind) => {
        setTrialRow(ind);
        setSelectedTrial(trials[ind]);
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

    const trialAccuracyResults = (trackings === null ? null : determineTrialAccuracy());

    return (
        <div className={"drilldownwrapper"}>
            <div className={"drilldown"}>
                <div className={"drilldown-goals"}>
                    <div className={"marg-bot-2 flex-center-between"}>
                        <h2>Goals for {stu ? stu.name.charAt(0).toUpperCase() + stu.name.substring(1) : "..."}</h2>
                        <Link push="true" className={`button-a ${!stu && 'disabled'}`} to={"/dashboard/goalcenter/create"}>
                            <button className={stu ? "enabled" : "disabled"}><PlusIcon className={"i-right"}/>Create Goal</button>
                        </Link>
                    </div>
                    {
                        stuWithGoals
                            ? <Accordion open={true} array={stu.goals} name={stu.goals.map(goal => goal.goalName)}>
                                {
                                    stu.goals.map((goal, goalind) => {
                                        return (
                                            <div key={`goaldrilldowntable${goalind}`}>
                                                <p><strong>Description: </strong>{goal.process}</p>
                                                <p><strong>Projected mastery date: </strong>{goal.masteryDate}</p>
                                                <p><strong>Monitor after mastery: </strong>{goal.monitor === 0 ? "No" : "Yes"}</p>
                                                <p className={"marg-bot"}><strong>Completion date: </strong>{goal.complete ? goal.completionDate : "N/A"}</p>
                                                <Table
                                                    selectable={true}
                                                    selectedCallback={(obj, ind) => {selectedBenchmarkCallback(obj, ind, goalind);}}
                                                    selectedRowIndexes={selectedGoalIndex === goalind ? benchmarkRow : null}
                                                    data={goal.benchmarks.map(bm => {
                                                        return {label: bm.label}
                                                    })}
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
                        <h2>{selectedBenchmark ? selectedBenchmark.label : "Benchmark"}</h2>
                        <button
                            onClick={() => {
                                props.setBenchmark(selectedBenchmark);
                                props.handleModal("createTrial");
                            }}
                            className={selectedBenchmark ? "enabled" : "disabled"}><PlusIcon className={"i-right"}/>Create Trial</button>
                    </div>
                    {
                        stuWithGoals && selectedBenchmark &&
                            <>
                                <div className={"marg-bot-2"}>
                                    <p><strong>Projected mastery date: </strong>{selectedBenchmark?.masteryDate}</p>
                                    <p><strong>Met date: </strong>{selectedBenchmark?.complete === 1 ? selectedBenchmark?.metDate : "N/A"}</p>
                                    <p><strong>Tracking type: </strong>{selectedBenchmark?.tracking}</p>
                                    <p><strong>Description: </strong>{selectedBenchmark?.description}</p>
                                </div>
                                <div className={"marg-bot-2"}>
                                    <Table key={`benchmarktablefor${benchmarkRow}`}
                                           headers={["Trials"]}
                                           selectable={trials && trials.length !== 0}
                                           selectedRowIndexes={trialRow}
                                           selectedCallback={
                                               (obj, ind) => {
                                                   selectedTrialCallback(obj, ind);
                                               }
                                           }
                                           data={
                                               trials && trials.length !== 0
                                                   ? trials.map((t, i) =>{
                                                       return {text: `Trial ${i+1} - ${t.dateStarted}`}
                                                    })
                                                   : [{text: "No trials"}]}
                                    />
                                </div>
                                <div className={"flex-column"}>
                                    <button className={"marg-bot"} onClick={() => {props.handleModal("completeBenchmark")}}>
                                        <CheckIcon className={"i-right"}/>
                                        <span>{selectedBenchmark.complete === 0 ? "Mark Complete" : "Mark Incomplete"}</span>
                                    </button>
                                    <button className={"marg-bot"} onClick={() => {props.handleModal("completeBenchmark")}}>
                                        <EditIcon className={"i-right"}/>
                                        <span>Edit Benchmark</span>
                                    </button>
                                    <button onClick={() => {props.handleModal("completeBenchmark")}}>
                                        <TrashIcon className={"i-right"}/>
                                        <span>Delete Benchmark</span>
                                    </button>
                                </div>
                            </>
                    }
                </div>
                <div className={"drilldown-trialmeta"}>
                    <h2 className={"marg-bot-2"}>Trial Tracking</h2>
                    {
                        selectedTrial
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
                                <p>{selectedTrial.comments}</p>
                              </div>
                            : <></>
                    }
                </div>
            </div>
        </div>
    )
};

export default GoalDrilldown;