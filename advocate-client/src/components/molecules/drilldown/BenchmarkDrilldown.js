import React from "react";
import Button from "components/atoms/Button";
import {
  FaCheck as CheckIcon,
  FaPlus as PlusIcon,
  FaRegEdit as EditIcon,
  FaRegTrashAlt as TrashIcon
} from "react-icons/fa";
import Section from "components/atoms/Section";
import ImmutableTextArea from "components/molecules/ImmutableTextArea";
import H2 from "components/atoms/H2";
import HRDiv from "components/atoms/HRDiv";
import Row from "components/atoms/Row";
import Col from "components/atoms/Col";
import DataDisplay from "../DataDisplay";
import Secondary from "components/atoms/table/Secondary";
import TableTest from "../table/TableTest";

const BenchmarkDrilldown = ({
  trials,
  benchmark,
  setTrialId,
  trialId,
  setModalAction,
  handleTrialIconAction
}) => {

  const renderTableData = () => {
    if(trials.length)
      return trials.map(trial => {
        return (
          {
            "id": trial.id,
            "label": (
              <span className={"flex-center-between width-100"}>
                  {trial.label}
                <span>
                  <EditIcon
                    className={"i-right hover-color selectable"}
                    onClick={(e) => handleTrialIconAction(e, "editTrial", trial)}/>
                  <TrashIcon
                    className={"hover-color selectable"}
                    onClick={(e) => handleTrialIconAction(e, "deleteTrial", trial)}/>
                </span>
              </span>
            )
          }
        )
      })
    else {
      return [{id: null, label: `No trials! Click create trial to add trial to ${benchmark.label}`}]
    }
  };

  const handleTrialSelect = (trialId) => {
    setTrialId(trialId);
  };

  return (
    <div className={"drilldown-trials"}>
      <HRDiv classes={"marg-bot"}>
        <div className={"flex-center-between"}>
          <H2>{benchmark ? benchmark.label : "Benchmark ..."}</H2>
          <div>
            <Button
              plain
              icon={<PlusIcon/>}
              text={"Create Trial"}
              disabled={!Boolean(benchmark)}
              onClick={() => setModalAction("createTrial")}
            />
            <Button
              className={"border-left-none"}
              plain
              onClick={() => setModalAction("masterBenchmark")}
              disabled={!Boolean(benchmark)}
              icon={<CheckIcon/>}
              text={`${benchmark?.complete ? "Unmaster" : "Master"} benchmark`}
            />
          </div>
        </div>
      </HRDiv>
      {
        benchmark ? (
          <>
            <Section>
              <div className={"marg-bot"}>
                <Secondary>Description: </Secondary>
                <ImmutableTextArea rawData={benchmark.description}/>
              </div>
              <Row width={"100%"}>
                <Col span={12}>
                  <DataDisplay
                    classes={"marg-bot"}
                    labels={["Projected mastery date: ", "Actual mastery date: ", "Tracking type: ", "Trial Average: "]}
                    data={[benchmark.masteryDate, benchmark.complete === 1 ? benchmark.metDate : "N/A", benchmark.tracking, `${benchmark.trialAverage.toFixed(1)}%`]}
                  />
                </Col>
                <Col span={12}>
                  <TableTest
                    columns={[{title: `Trials - (${trials.length})`, dataIndex: "label"}]}
                    data={renderTableData()}
                    selectedCallback={trials.length ? (trial) => handleTrialSelect(trial.id) : null}
                    selectedId={trialId}
                  />
                </Col>
              </Row>
            </Section>
          </>
        ) : (
          <></>
        )
      }
    </div>
  );
};

export default BenchmarkDrilldown;
