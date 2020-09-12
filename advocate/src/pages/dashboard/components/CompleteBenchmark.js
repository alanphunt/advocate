import React from "react";
import ConfirmOrCancelButtons from "./ConfirmOrCancelButtons";

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

        fetch("/api/completeBenchmark",
            {
                method: "POST",
                body: formData,
                headers: {"Authorization": `Bearer ${sessionStorage.authorization}`}
            })
            .then(response => response.json())
            .then(data => {
                props.updateTeacher(data);
            });
    };

    return (
        <div className={"completebenchmarkwrapper"}>
            <div className={"marg-bot-2"}>
                <h2 className={"marg-bot"}>Mark {props.benchmark.label} as {currentStatus ? "not mastered" : "mastered"}?</h2>
                {
                    currentStatus
                        ? <span>This will clear the benchmark's mastery date{allBenchmarksComplete ? " and mark the goal as not mastered" : ""}.</span>
                        : <>
                            <p><strong>Projected mastery date:</strong> {props.benchmark.masteryDate}</p>
                            <p className={"marg-bot"}><strong>Today's date:</strong> {new Date().toLocaleDateString()}</p>
                            {isLastIncompleteBenchmark ? <p>Mastering this benchmark will master the goal.</p> : <></>}
                          </>
                }
            </div>
            <ConfirmOrCancelButtons
                confirmCallback={() => {
                    markBenchmarkAsComplete(
                        props.benchmark.id,
                        updatedStatus,
                        ((isLastIncompleteBenchmark || allBenchmarksComplete) ? goal.id : "")
                    );
                }}
                cancelCallback={props.closeModal}/>
        </div>
    );
};

export default CompleteBenchmark;