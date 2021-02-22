import React, {useEffect, useState} from "react";
import Button from "components/atoms/Button";
import {
    FaCheck as CheckIcon,
    FaPlus as PlusIcon,
    FaRegCopy as CopyIcon,
    FaRegEdit as EditIcon,
    FaRegTrashAlt as TrashIcon
} from "react-icons/fa";
import TableAccordionGroup from "components/molecules/table/TableAccordionGroup";
import AccordionItem from "components/atoms/AccordionItem";
import ImmutableTextArea from "components/molecules/ImmutableTextArea";
import Table from "components/molecules/table/Table";
import Box from "components/atoms/Box";
import Strong from "components/atoms/Strong";

const GoalDrilldown = ({studentName, goals, allBenchmarks, setGoalId, setBenchmarkId, setMutableGoal, setModalAction}) => {
    const [selectedBenchmarkId, setSelectedBenchmarkId] = useState("");

    useEffect(() => {
        setSelectedBenchmarkId("");
    }, [studentName]);

    const selectedBenchmarkCallback = (benchmark, benchmarkIndex, goal, goalIndex) => {
        setSelectedBenchmarkId(benchmark.id);
        setBenchmarkId(benchmark.id);
        setGoalId(goal.id);
    };

    const handleGoalIconAction = (action, goal) => {
        setMutableGoal({...goal, benchmarks: goal.benchmarkIds.map(id => allBenchmarks[id])});
        setModalAction(action);
    };

    const goalIconSet = {
        'editGoal': <EditIcon className={"i-right hover-color selectable"}/>,
        'copyGoal': <CopyIcon className={"i-right hover-color selectable"}/>,
        'deleteGoal': <TrashIcon className={"hover-color selectable"}/>
    };

    const renderAccordionGroupBody = () => {
        return goals.map((goal, goalIndex) => {
                return (
                    <AccordionItem key={`benchmarkAccItem-${goalIndex}`} header={goal.goalName} iconClickedCallback={(key) => handleGoalIconAction(key, goal)} icons={goalIconSet}>
                        <div key={`goaldrilldowntable-${goal.id}`}>
                            <Strong text={"Goal: "}/>
                            <ImmutableTextArea rawData={goal.goal} />
                            <Strong text={"Start date: "}>{goal.startDate || 'N/A'}</Strong>
                            <Strong text={"Projected mastery date: "}>{goal.masteryDate}</Strong>
                            <Strong text={"Actual mastery date: "}>{goal.complete ? goal.completionDate : "N/A"}</Strong>
                            <Strong className={"marg-bot"} text={"Monitor after mastery: "}>{goal.monitor === 0 ? "No" : "Yes"}</Strong>
                        </div>
                        {
                            //a goal can have no benchmarks if it was copied from another student
                            goal.benchmarkIds.length ? (
                                <Table
                                    tableData={goal.benchmarkIds.map(bmId => allBenchmarks[bmId]).map(bm => {
                                        return {id: bm.id, label: <span className={"flex-center-between width-100"}>{bm.label}{bm.complete ? <CheckIcon className={"success"}/> : <></>}</span>}
                                    })}
                                    headers={[`Benchmarks - (${goal.benchmarkIds.length})`]}
                                    selectedCallback = {(benchmark, bmIndex) => selectedBenchmarkCallback(benchmark, bmIndex, goal, goalIndex)}
                                    selectedRowId={selectedBenchmarkId}
                                    hideSearchAndSort
                                />
                            ) : (
                                <Box text={"Edit goal to add benchmarks."}/>
                            )
                        }

                    </AccordionItem>
                )
            }
        )
    };

    return (
        <div className={"drilldown-goals"}>
            <div className={"marg-bot-2 flex-center-between"}>
                <h2>Goals for {studentName ? studentName.charAt(0).toUpperCase() + studentName.substring(1) : "..."}</h2>
                <div>
                    <Button
                        text="Create Goal"
                        icon={<PlusIcon className={"i-right"}/>}
                        className={studentName ? "enabled" : "disabled"}
                        onClick={() =>  setModalAction("createGoal")}
                    />
                </div>
            </div>
            {
                goals?.length && studentName
                    ? <TableAccordionGroup>
                        { renderAccordionGroupBody() }
                    </TableAccordionGroup>
                    : !goals?.length && studentName
                        ? <Box text={"No goals! Click create goal to add goal to student."}/>
                        : <></>
            }
        </div>

    );
};

export default GoalDrilldown;
