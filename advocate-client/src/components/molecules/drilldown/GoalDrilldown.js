import React, {useEffect} from "react";
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
import Box from "components/atoms/Box";
import H2 from "components/atoms/H2";
import HRDiv from "components/atoms/HRDiv";
import DataDisplay from "../DataDisplay";
import Secondary from "components/atoms/table/Secondary";
import TableTest from "../table/TableTest";
import Row from "components/atoms/Row";
import Col from "components/atoms/Col";

const GoalDrilldown = ({studentId, goals, allBenchmarks, setGoalId, benchmarkId, setBenchmarkId, setMutableGoal, setModalAction}) => {
  const studentIsPresent = Boolean(studentId);

  const selectedBenchmarkCallback = (benchmark, benchmarkIndex, goal, goalIndex) => {
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

  const columns = (length) => [{
    title: `Benchmarks - (${length})`,
    dataIndex: "label"
  }];

  const tableData = (goal) => {
    if(goal.benchmarkIds.length)
      return goal.benchmarkIds.map(bmId => allBenchmarks[bmId]).map(bm => ({
        id: bm.id,
        label: (
          <span className={"flex-center-between width-100"}>
            {bm.label}
            {bm.complete ? <CheckIcon className={"success"}/> : <></>}
          </span>
        )
      }))
    else
      return [{id: null, label: "Edit goal to add benchmarks."}]
  }

  const renderAccordionGroupBody = () => {
    return goals.map((goal, goalIndex) => {
      const hasBenchmarks = Boolean(goal.benchmarkIds.length);

        return (
          <AccordionItem key={`benchmarkAccItem-${goalIndex}`} header={goal.goalName} iconClickedCallback={(key) => handleGoalIconAction(key, goal)} icons={goalIconSet}>
            <div className={"marg-bot"}>
              <Secondary>Goal</Secondary>
              <ImmutableTextArea rawData={goal.goal} />
            </div>
            <Row width={"100%"}>
              <Col span={12}>
                <div>
                  <DataDisplay
                    classes={"marg-bot"}
                    labels={["Start date", "Projected mastery date", "Actual mastery date", "Monitor after mastery"]}
                    data={[goal.startDate || 'N/A', goal.masteryDate, goal.completionDate || 'N/A', goal.monitor ? "Yes":"No"]}
                  />
                </div>
              </Col>
              <Col span={12}>
                <div>
                  <TableTest
                    columns={columns(goal.benchmarkIds.length)}
                    data={tableData(goal)}
                    selectedCallback = {!hasBenchmarks ? null : (benchmark, bmIndex) => selectedBenchmarkCallback(benchmark, bmIndex, goal, goalIndex)}
                    selectedId={benchmarkId}
                  />
                </div>
              </Col>
            </Row>
          </AccordionItem>
        )
      }
    )
  };

  return (
    <div className={"drilldown-goals"}>
      <HRDiv classes={"marg-bot"}>
        <div className={"flex-center-between"}>
          <H2>Goals</H2>
          <div>
            <Button
              plain
              text="Create Baseline"
              icon={<PlusIcon/>}
              className={studentIsPresent ? "enabled" : "disabled"}
              onClick={() =>  setModalAction("createBaseline")}
            />
            <Button
              plain
              text="Create Goal"
              icon={<PlusIcon/>}
              className={studentIsPresent ? "enabled" : "disabled"}
              onClick={() =>  setModalAction("createGoal")}
            />
          </div>
        </div>
      </HRDiv>
      {
        goals?.length && studentIsPresent
          ? <TableAccordionGroup>
            { renderAccordionGroupBody() }
          </TableAccordionGroup>
          : !goals?.length && studentIsPresent
          ? <Box text={"No goals! Click create goal to add goal to student."}/>
          : <></>
      }
    </div>
  );
};

export default GoalDrilldown;
