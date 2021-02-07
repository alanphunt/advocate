import React from "react";
import ConfirmOrCancelButtons from "components/molecules/ConfirmOrCancelButtons";
import Section from "components/atoms/Section";
import {FaCheck as CheckIcon} from "react-icons/fa";
import ModalBody from "components/molecules/ModalBody";

const CompleteBenchmark = ({benchmark, goalBenchmarks, completeCrudOp, closeModal, goalId, isLoading, setIsLoading}) => {
    //if the BM isn't complete then we're updating it as complete and vice versa
    const currentStatus = benchmark.complete;
    const updatedStatus = currentStatus ? 0 : 1;
    const isLastIncompleteBenchmark = goalBenchmarks.filter(bm => bm.complete === 0).length === 1;
    const allBenchmarksComplete = goalBenchmarks.filter(bm => !bm.complete).length === 0;

    const markBenchmarkAsComplete = (benchmarkId, updatedStatus, goalId) => {
        setIsLoading({"masterBenchmark": true});
        let formData = new FormData();
        formData.append("benchmarkId", benchmarkId);
        formData.append("complete", updatedStatus);
        formData.append("goalId", goalId);

        fetch("/api/completebenchmark",
            {
                method: "POST",
                body: formData
            })
            .then(response => Promise.all([response.ok, (response.ok ? response.json() : response.text()), response.status]))
            .then(([ok, data, status]) => {
                setIsLoading({"":false})
                if(ok)
                    completeCrudOp(data, <><CheckIcon className="i-right"/>Successfully {updatedStatus ? "" : "un"}mastered {benchmark.label}!</>);
            });
    };

    return (
        <ModalBody header={`Mark ${benchmark.label} as ${currentStatus ? "not mastered" : "mastered"}?`} hideButtons>
            <Section>
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
                confirmCallback={() => markBenchmarkAsComplete(
                        benchmark.id,
                        updatedStatus,
                        ((isLastIncompleteBenchmark || allBenchmarksComplete) ? goalId : "")
                    )}
                cancelCallback={closeModal}
                isLoading={isLoading}
            />
        </ModalBody>
    );
};

export default CompleteBenchmark;