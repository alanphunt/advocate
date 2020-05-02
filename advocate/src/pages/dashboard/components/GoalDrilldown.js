import React, {useState} from "react";
import Accordion from "./accordion/Accordion";
import Table from "./Table";
import {Link} from "react-router-dom";


const GoalDrilldown = (props) => {
    let stu = props.student ?? null;
    const [selectedBenchmark, setSelectedBenchmark] = useState();
    const [trials, setTrials] = useState([]);
    const [selectedTrial, setSelectedTrial] = useState();
    const [benchmarkRow, setBenchmarkRow] = useState();
    const [trialRow, setTrialRow] = useState();
    const [selectedGoalIndex, setSelectedGoalIndex] = useState();

    const selectedBenchmarkCallback = (obj, ind, goalindex) => {
        console.log(ind, goalindex);
        let bm = stu.goalData[goalindex].benchmarks[ind];
        setSelectedGoalIndex(goalindex);
        setBenchmarkRow(ind);
        setSelectedBenchmark(bm);
        setTrials(stu.trials.filter(trial => trial.benchmarkId === bm.id));
        setSelectedTrial(null);
        setTrialRow(999);
    };

    const selectedTrialCallback = (obj, ind) => {
        setTrialRow(ind);
        setSelectedTrial(trials[ind]);
    };

    const stuWithGoals = stu && stu.goalData.length !==0;


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
                            ? <Accordion open={true} array={stu.goalData} name={stu.goalData.map(goal => goal.goal[0].goalName)}>
                                {
                                    stu.goalData.map((goal, goalind) => {
                                        return (
                                            <div key={`goaldrilldowntable${goalind}`}>
                                                <p className={"marg-bot"}><strong>Description: </strong>{goal.goal[0].process}</p>
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
                        <button onClick={() => {props.handleModal(selectedBenchmark)}} className={selectedBenchmark ? "enabled" : "disabled"}>Create Trial</button>
                    </div>
                    {
                        stuWithGoals && selectedBenchmark &&
                            <div>
                                <div className={"marg-bot-2"}>
                                    <p><strong>Description: </strong>{selectedBenchmark?.description}</p>
                                    <p><strong>Mastery Date: </strong>{selectedBenchmark?.masteryDate}</p>
                                    <p><strong>Completed: </strong>{selectedBenchmark?.complete === 0 ? "No" : "Yes"}</p>
                                    <p><strong>Tracking type: </strong>{selectedBenchmark?.tracking}</p>
                                </div>
                                <div>
                                    <Table key={`benchmarktablefor${benchmarkRow}`}
                                           headers={["Trials"]}
                                           selectable={trials.length !== 0}
                                           selectedRowIndexes={trialRow}
                                           selectedCallback={
                                               (obj, ind) => {
                                                   selectedTrialCallback(obj, ind);
                                               }
                                           }
                                           data={
                                               trials.length !== 0
                                                   ? trials.map((t, i) =>{
                                                       return {text: `Trial ${i+1} - ${t.dateStarted}`}
                                                    })
                                                   : [{text: "No trials"}]}
                                    />
                                </div>
                            </div>
                    }
                </div>
                <div className={"drilldown-trialmeta"}>
                    <h2 className={"marg-bot-2"}>Trial Tracking</h2>
                    <p>{selectedTrial ? selectedTrial.id : ""}</p>
                </div>
            </div>
        </div>
    )
};

export default GoalDrilldown;