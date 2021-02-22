import React, {useEffect} from "react";
import Section from "components/atoms/Section";
import Strong from "components/atoms/Strong";
import Select from "components/atoms/Select";
import {
  FaRegListAlt as LabelIcon,
  FaRegEdit as EditIcon,
  FaRegTrashAlt as TrashIcon
} from "react-icons/fa";
import {TEMPLATE_TYPES} from "components/templates/TemplateList";
import BasicScoreTrialDisplay from "components/templates/score/basic-score/BasicScoreTrialDisplay";
import BestOutOfTrialDisplay from "components/templates/score/best-out-of/BestOutOfTrialDisplay";
import ImmutableTextArea from "components/molecules/ImmutableTextArea";
import FileChipWrapper from "components/molecules/FileChipWrapper";
import ConfirmOrCancelButtons from "components/molecules/ConfirmOrCancelButtons";

const BaselineDrilldown = ({student, allBaselines, trackings, documents, setModalAction, baseline, setBaseline, setMutableBaseline}) => {
  console.log(baseline);
  const dropdownOptions = Object.values(allBaselines)?.reduce((reducer, obj) => ({...reducer, [obj.label]: obj.id}), {});
  
  useEffect(() => {
    if(!!baseline)
      setBaseline(null);
  }, [student]);
  
  const determineBaseline = () => {
      switch(baseline?.baselineTemplate){
        case TEMPLATE_TYPES.SCORE_BASIC:
          return (
            <>
              <BasicScoreTrialDisplay
                trackings={baseline?.trackingIds.map(id => trackings[id])}
              />
            </>
          );
        case TEMPLATE_TYPES.SCORE_BEST_OUT_OF:
          return (
            <>
              <BestOutOfTrialDisplay
                tracking={trackings[baseline?.trackingIds[0]]}
              />
            </>
          );
        default: return <></>;
      }
  };
  
  return (
    <div>
      <Section>
        <Strong text={"Age: "}>{student?.age}</Strong>
        <Strong text={"Grade: "}>{student?.grade}</Strong>
      </Section>
      <Section>
        <Select
          icon={<LabelIcon/>}
          value={baseline?.id}
          onChange={(e) => setBaseline(allBaselines[e.currentTarget.value])}
          label={"Baselines"}
          mapping={dropdownOptions}
        />
        {
          baseline ? (
            <ConfirmOrCancelButtons
              confirmIcon={<EditIcon/>}
              confirmText={"Edit Baseline"}
              confirmCallback={() => {setMutableBaseline(baseline); setModalAction("editBaseline");}}
              cancelText={"Delete Baseline"}
              cancelCallback={() => setModalAction("deleteBaseline")}
              cancelIcon={<TrashIcon/>}
            />
          ) : <></>
        }
      </Section>
      {
        baseline ? (
          <div>
            <Strong text={"Label: "}>{baseline.label}</Strong>
            <Strong text={"Date Started: "}>{baseline.dateStarted}</Strong>
            {determineBaseline()}
            <div className={"marg-bot"}>
              <Strong text={"Comments: "}/>
              <ImmutableTextArea rawData={baseline.comments}/>
            </div>
            <div className={"marg-bot"}>
              <Strong text={"Documents: "}/>
              <FileChipWrapper fileMeta={baseline.documentIds.map(id => documents[id])}/>
            </div>
          </div>
        ) : <></>
      }
    
    </div>
  );
};

export default BaselineDrilldown;
