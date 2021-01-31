import React, {useEffect, useState} from "react";
import Button from "components/atoms/Button";
import {
    FaCheck as CheckIcon,
    FaPlus as PlusIcon,
    FaRegEdit as EditIcon,
    FaRegTrashAlt as TrashIcon
} from "react-icons/fa";
import Section from "components/atoms/Section";
import ImmutableTextArea from "components/molecules/ImmutableTextArea";
import {determineTrialAverage} from "utils/functions/functions";
import Table from "components/molecules/table/Table";
import Box from "components/atoms/Box";

const BenchmarkDrilldown = ({trials, allDocuments, allTrackings, benchmark, setTrialId, setMutableTrial, setModalAction}) => {
    const [trialIndex, setTrialIndex] = useState(-1);


    useEffect(() => {
        setTrialIndex(-1);
    }, [benchmark])

    const renderTableData = () => {
        return trials.map(trial => {
            return (
                {
                    "id": trial.id,
                     "":
                         <span className={"flex-center-between width-100"}>
                            {trial.label}
                            <span>
                                <EditIcon className={"i-right hover-color selectable"}
                                          onClick={(e) => handleTrialIconAction(e, "editTrial", trial)}/>
                                <TrashIcon className={"hover-color selectable"}
                                           onClick={(e) => handleTrialIconAction(e, "deleteTrial", trial)}/>
                            </span>
                        </span>
                }
            )
        })
    };

    const handleTrialIconAction = (e, iconKey, trial) => {
        e.stopPropagation();
        setMutableTrial({...trial, documents: trial.documentIds.map(id => allDocuments[id]), trackings: trial.trackingIds.map(id => allTrackings[id])});
        setModalAction(iconKey);
    };

    const handleTrialSelect = (trialId, trialIndex) => {
        setTrialIndex(trialIndex);
        setTrialId(trialId);
    };

    return (
        <div className={"drilldown-trials"}>
            <div className={"marg-bot-2 flex-center-between"}>
                <h2>{benchmark ? benchmark.label : "Benchmark ..."}</h2>
                <Button
                    icon={<PlusIcon className={"i-right"}/>}
                    text={"Create Trial"}
                    className={benchmark ? "enabled" : "disabled"}
                    onClick={() => setModalAction("createTrial")}
                />
            </div>
            {
                benchmark ? (
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
                                benchmark && trials.length
                                    ? <Table
                                        headers={[`Trials (${trials.length})`]}
                                        tableData={renderTableData()}
                                        selectedCallback={(trial, trialIndex) => handleTrialSelect(trial.id, trialIndex)}
                                        selectedRowIndex={trialIndex}
                                    />
                                    : <Box text="No trials"/>
                            }
                        </Section>
                        <div className={"flex-column"}>
                            <Button
                                onClick={() => setModalAction("masterBenchmark")}
                                icon={<CheckIcon className={"i-right"}/>}
                                text={`${benchmark.complete ? "Unmaster" : "Master"} benchmark`}
                            />
                        </div>
                    </>
                ) : (
                    <></>
                )
            }
        </div>
    );
};

export default BenchmarkDrilldown;
