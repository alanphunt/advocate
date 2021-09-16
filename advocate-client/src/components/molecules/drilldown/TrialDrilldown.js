import React from "react";
import ImmutableTextArea from "components/molecules/ImmutableTextArea";
import {TEMPLATE_TYPES} from "components/templates/TemplateList";
import BasicScoreTrialDisplay from "components/templates/score/basic-score/BasicScoreTrialDisplay";
import BestOutOfTrialDisplay from "components/templates/score/best-out-of/BestOutOfTrialDisplay";
import Strong from "components/atoms/Strong";
import FileChipWrapper from "components/molecules/FileChipWrapper";
import H2 from "../../atoms/H2";

const TrialDrilldown = ({trial, tracking, documents, trackingMeta}) => {
  
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
      <H2 classes={"marg-bot-2"}>{trial ? trial.label : "Trial ..."}</H2>
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
