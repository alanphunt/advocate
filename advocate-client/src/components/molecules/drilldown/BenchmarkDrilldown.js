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
import Table from "components/molecules/table/Table";
import Box from "components/atoms/Box";
import {TEMPLATE_TYPES} from "components/templates/TemplateList";
import Strong from "components/atoms/Strong";

const BenchmarkDrilldown = ({trials, allDocuments, allTrackings, benchmark, trialId, setTrialId, setMutableTrial, setModalAction}) => {

  const renderTableData = () => {
    return trials.map(trial => {
      return (
        {
          "id": trial.id,
           "": (
             <span className={"flex-center-between width-100"}>
                {trial.label}
                <span>
                  <EditIcon className={"i-right hover-color selectable"}
                            onClick={(e) => handleTrialIconAction(e, "editTrial", trial)}/>
                  <TrashIcon className={"hover-color selectable"}
                             onClick={(e) => handleTrialIconAction(e, "deleteTrial", trial)}/>
                </span>
            </span>
           )
        }
      )
    })
  };

  const handleTrialIconAction = (e, iconKey, trial) => {
    e.stopPropagation();
    setMutableTrial({...trial, documents: trial.documentIds.map(id => allDocuments[id]), trackings: (trial.trialTemplate === TEMPLATE_TYPES.SCORE_BASIC ? trial.trackingIds.map(id => allTrackings[id]) : allTrackings[trial.trackingIds[0]])});
    setModalAction(iconKey);
  };

  const handleTrialSelect = (trialId) => {
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
                          <Strong text={"Description: "}/>
                          <ImmutableTextArea rawData={benchmark.description}/>
                          <Strong text={"Projected mastery date: "}>{benchmark.masteryDate}</Strong>
                          <Strong text={"Actual mastery date: "}>{benchmark.complete === 1 ? benchmark.metDate : "N/A"}</Strong>
                          <Strong text={"Tracking type: "}>{benchmark.tracking}</Strong>
                          <Strong text={"Trial Average: "}>{benchmark.trialAverage.toFixed(1)}%</Strong>
                      </Section>
                      <Section>
                          {
                              benchmark && trials.length
                                  ? <Table
                                      headers={[`Trials - (${trials.length})`]}
                                      tableData={renderTableData()}
                                      selectedCallback={(trial) => handleTrialSelect(trial.id)}
                                      selectedRowId={trialId}
                                      hideSearchAndSort
                                  />
                                  : <Box text={`No trials! Click create trial to add trial to ${benchmark.label}`}/>
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
