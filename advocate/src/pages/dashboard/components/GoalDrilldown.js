import React, {useState} from "react";
import Accordion from "./accordion/Accordion";
import Table from "./Table";
import {Link} from "react-router-dom";
import {FaPlus as PlusIcon, FaMinus as MinusIcon} from "react-icons/fa";

const GoalDrilldown = (props) => {
    let stu = props.student ?? null;

    const [selectedGoalIndex, setSelectedGoalIndex] = useState();
    const [benchmarkRow, setBenchmarkRow] = useState();
    const [trialRow, setTrialRow] = useState();

    const [selectedBenchmark, setSelectedBenchmark] = useState();
    const [selectedTrial, setSelectedTrial] = useState();
    const [trials, setTrials] = useState([]);

    const trackings = selectedTrial?.trackings || null;

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

    const stuWithGoals = stu && stu.goals.length !== 0;

    return (
        <div className={"drilldownwrapper"}>
            <div className={"drilldown"}>
                <div className={"drilldown-goals"}>
                    <div className={"marg-bot-2 flex-center-between"}>
                        <h2>Goals for {stu ? stu.name.charAt(0).toUpperCase() + stu.name.substring(1) : "..."}</h2>
                        <Link push="true" className={`button-a ${!stu && 'disabled'}`} to={"/dashboard/goalcenter/create"}>
                            <button className={stu ? "enabled" : "disabled"}>Create Goal</button>
                        </Link>
                    </div>
                    {
                        stuWithGoals
                            ? <Accordion open={true} array={stu.goals} name={stu.goals.map(goal => goal.goalName)}>
                                {
                                    stu.goals.map((goal, goalind) => {
                                        return (
                                            <div key={`goaldrilldowntable${goalind}`}>
                                                <p className={"marg-bot"}><strong>Description: </strong>{goal.process}</p>
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
                                props.handleModal(selectedBenchmark);
                            }}
                            className={selectedBenchmark ? "enabled" : "disabled"}>Create Trial</button>
                    </div>
                    {
                        stuWithGoals && selectedBenchmark &&
                            <>
                                <div className={"marg-bot-2"}>
                                    <p><strong>Description: </strong>{selectedBenchmark?.description}</p>
                                    <p><strong>Mastery Date: </strong>{selectedBenchmark?.masteryDate}</p>
                                    <p><strong>Completed: </strong>{selectedBenchmark?.complete === 1 ? "Yes" : "No"}</p>
                                    <p><strong>Tracking type: </strong>{selectedBenchmark?.tracking}</p>
                                </div>
                                <div>
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
                            </>
                    }
                </div>
                <div className={"drilldown-trialmeta"}>
                    <h2 className={"marg-bot-2"}>Trial Tracking</h2>
                    {
                        selectedTrial
                            ? <div>
                                <p className={"marg-bot"}><strong>Trial Accuracy: </strong>{(trackings.filter(t => t.correct === 1).length / trackings.length * 100 )+ "%"}</p>
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