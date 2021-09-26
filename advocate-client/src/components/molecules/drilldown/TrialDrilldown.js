import React from "react";
import ImmutableTextArea from "components/molecules/ImmutableTextArea";
import {TEMPLATE_TYPES} from "components/templates/TemplateList";
import BasicScoreTrialDisplay from "components/templates/score/basic-score/BasicScoreTrialDisplay";
import BestOutOfTrialDisplay from "components/templates/score/best-out-of/BestOutOfTrialDisplay";
import Strong from "components/atoms/Strong";
import FileChipWrapper from "components/molecules/FileChipWrapper";
import H2 from "../../atoms/H2";
import HRDiv from "../../atoms/HRDiv";

const TrialDrilldown = ({trial, tracking, trackingMeta, documents}) => {
  
  const determineTrialTemplate = () => {
    switch(trial.trialTemplate){
      case TEMPLATE_TYPES.SCORE_BASIC:
        return (
          <BasicScoreTrialDisplay trackingMeta={trackingMeta}/>
        );
      case TEMPLATE_TYPES.SCORE_BEST_OUT_OF:
        return (
          <BestOutOfTrialDisplay tracking={tracking}/>
        );
      default: return <></>
    }
  };
  
  return (
    <div className={"drilldown-trialmeta"}>
      <HRDiv classes={"marg-bot"}>
        <H2>{trial ? trial.label : "Trial ..."}</H2>
      </HRDiv>
      {
        trial ?
          <div>
            <p><strong>Start Date: </strong> {trial.dateStarted}</p>
            {determineTrialTemplate()}
            <Strong className={"marg-top"} text={"Comments: "}/>
            <ImmutableTextArea rawData={trial.comments} />
            <div className={"marg-top"}>
              <Strong text={"Documents:"}/>
              <FileChipWrapper fileMeta={documents}/>
            </div>
          </div>
          : <></>
      }
    </div>
  );
};

export default TrialDrilldown;
