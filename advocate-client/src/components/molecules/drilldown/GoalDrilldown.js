import React, {useState} from "react";
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

const GoalDrilldown = ({student, teacher, setMutableGoal, setModalAction, setSelectedBenchmark}) => {
    const goals = student?.goalIds.map(id => teacher.goals[id]);

    const [benchmarkIndex, setBenchmarkIndex] = useState(-1);

    const selectedBenchmarkCallback = (benchmark, benchmarkIndex) => {
        setBenchmarkIndex(benchmarkIndex);
        setSelectedBenchmark(benchmark);
    };

    const handleGoalIconAction = (action, index) => {
        setMutableGoal(goals[index]);
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
                    <AccordionItem key={`benchmarkAccItem-${goalIndex}`} header={goal.goalName} iconClickedCallback={(key) => handleGoalIconAction(key, goalIndex)} icons={goalIconSet}>
                        <div key={`goaldrilldowntable-${goal.id}`}>
                            <p><strong>Goal: </strong></p>
                            <ImmutableTextArea rawData={goal.goal} />
                            <p><strong>Description: </strong>{goal.process || 'N/A'}</p>
                            <p><strong>Start date: </strong>{goal.startDate}</p>
                            <p><strong>Projected mastery date: </strong>{goal.masteryDate}</p>
                            <p><strong>Actual mastery date: </strong>{goal.complete ? goal.completionDate : "N/A"}</p>
                            <p className={"marg-bot"}><strong>Monitor after mastery: </strong>{goal.monitor === 0 ? "No" : "Yes"}</p>
                        </div>
                        <Table
                            tableData={goal.benchmarkIds.map(bmId => teacher.benchmarks[bmId]).map(bm => {
                                return {id: bm.id, label: <span className={"flex-center-between"}>{bm.label}{bm.complete ? <CheckIcon/> : <></>}</span>}
                            })}
                            headers={["Benchmarks"]}
                            selectedCallback = {(benchmark, bmIndex, goalIndex) => selectedBenchmarkCallback(benchmark, bmIndex, goalIndex)}
                            selectedRowIndex={benchmarkIndex}
                        />
                    </AccordionItem>
                )
            }
        )
    };

    return (
        <div className={"drilldown-goals"}>
            <div className={"marg-bot-2 flex-center-between"}>
                <h2>Goals for {student ? student.name.charAt(0).toUpperCase() + student.name.substring(1) : "..."}</h2>
                <div>
                    <Button
                        text="Create Baseline"
                        icon={<PlusIcon className={"i-right"}/>}
                        className={`marg-right${student ? " enabled" : " disabled"}`}
                        onClick={() => setModalAction("createBaseline")}
                    />
                    <Button
                        text="Create Goal"
                        icon={<PlusIcon className={"i-right"}/>}
                        className={student ? "enabled" : "disabled"}
                        onClick={() =>  setModalAction("createGoal")}
                    />
                </div>
            </div>
            {
                goals?.length
                    ? <TableAccordionGroup>
                        { renderAccordionGroupBody() }
                    </TableAccordionGroup>
                    : <></>
            }
        </div>

    );
};

export default GoalDrilldown;
