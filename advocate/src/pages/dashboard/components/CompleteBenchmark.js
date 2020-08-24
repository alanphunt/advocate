import React from "react";
import {FaCheck as CheckIcon, FaTimes as XIcon} from "react-icons/fa";

const CompleteBenchmark = (props) => {
    //if the BM isn't complete then we're updating it as complete and vice versa
    const currentStatus = props.benchmark.complete;
    const updatedStatus = currentStatus ? 0 : 1;
    const goal = props.benchmarkParentGoal;
    const isLastIncompleteBenchmark = goal.benchmarks.filter(bm => bm.complete === 0).length === 1;
    const allBenchmarksComplete = goal.benchmarks.filter(bm => !bm.complete).length === 0;

    const markBenchmarkAsComplete = (benchmarkId, updatedStatus, goalId, updateTeacherCallback, miscCallback) => {
        let formData = new FormData();
        formData.append("benchmarkId", benchmarkId);
        formData.append("complete", updatedStatus);
        formData.append("goalId", goalId || "");

        fetch("/api/completeBenchmark", {method: "POST", body: formData, headers: {"Authorization": `Bearer ${sessionStorage.authorization}`}})
            .then(response => response.json())
            .then(data => {
                updateTeacherCallback(data);
            });
    };

    return (
        <div className={"completebenchmarkwrapper"}>
            <div className={"marg-bot-2"}>
                <h2 className={"marg-bot"}>Mark {props.benchmark.label} as {currentStatus ? "incomplete" : "complete"}?</h2>
                {
                    currentStatus
                        ? <span>This will clear the benchmark's met date{allBenchmarksComplete ? " and mark the goal incomplete" : ""}.</span>
                        : <>
                            <p><strong>Projected mastery date:</strong> {props.benchmark.masteryDate}</p>
                            <p className={"marg-bot"}><strong>Today's date:</strong> {new Date().toLocaleDateString()}</p>
                            {isLastIncompleteBenchmark ? <p>Completing this benchmark will complete the goal.</p> : <></>}
                          </>
                }
            </div>
            <div>
                <button
                    className={"marg-right"}
                    onClick={() => {
                        markBenchmarkAsComplete(
                            props.benchmark.id,
                            updatedStatus,
                            ((isLastIncompleteBenchmark || allBenchmarksComplete) ? goal.id : ""),
                            props.updateTeacher
                        );
                    }}>
                    <CheckIcon className={"i-right"}/>
                    <span>Confirm</span>
                </button>
                <button className={"cancelButton"} onClick={(evt) => {props.closeModal(evt);}}>
                    <XIcon className={"i-right"}/>
                    <span>Cancel</span>
                </button>
            </div>
        </div>
    );
};

export default CompleteBenchmark;