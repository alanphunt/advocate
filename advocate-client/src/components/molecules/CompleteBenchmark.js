import React from "react";
import ConfirmOrCancelButtons from "components/molecules/ConfirmOrCancelButtons";
import Section from "components/atoms/Section";

const CompleteBenchmark = ({benchmark, setTeacher, closeModal, benchmarkParentGoal: goal}) => {
    //if the BM isn't complete then we're updating it as complete and vice versa
    const currentStatus = benchmark.complete;
    const updatedStatus = currentStatus ? 0 : 1;
    const isLastIncompleteBenchmark = goal.benchmarks.filter(bm => bm.complete === 0).length === 1;
    const allBenchmarksComplete = goal.benchmarks.filter(bm => !bm.complete).length === 0;

    const markBenchmarkAsComplete = (benchmarkId, updatedStatus, goalId) => {
        let formData = new FormData();
        formData.append("benchmarkId", benchmarkId);
        formData.append("complete", updatedStatus);
        formData.append("goalId", goalId || "");

        fetch("/api/completeBenchmark",
            {
                method: "POST",
                body: formData
            })
            .then(response => Promise.all([response.ok, (response.ok ? response.json() : response.text()), response.status]))
            .then(([ok, data, status]) => {
                if (ok)
                    setTeacher(data);
            });
    };

    return (
        <div className={"completebenchmarkwrapper"}>
            <Section>
                <h2 className={"marg-bot"}>Mark {benchmark.label} as {currentStatus ? "not mastered" : "mastered"}?</h2>
                {
                    currentStatus
                        ? <span>This will clear the benchmark's mastery date{allBenchmarksComplete ? " and mark the goal as not mastered" : ""}.</span>
                        : <>
                            <p><strong>Projected mastery date:</strong> {benchmark.masteryDate}</p>
                            <p className={"marg-bot"}><strong>Today's date:</strong> {new Date().toLocaleDateString()}</p>
                            {isLastIncompleteBenchmark ? <p>Mastering this benchmark will master the goal.</p> : <></>}
                          </>
                }
            </Section>
            <ConfirmOrCancelButtons
                confirmCallback={() => {
                    markBenchmarkAsComplete(
                        benchmark.id,
                        updatedStatus,
                        ((isLastIncompleteBenchmark || allBenchmarksComplete) ? goal.id : "")
                    );
                }}
                cancelCallback={closeModal}/>
        </div>
    );
};

export default CompleteBenchmark;