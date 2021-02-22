import React from "react";
import ImmutableTextArea from "components/molecules/ImmutableTextArea";
import {TEMPLATE_TYPES} from "components/templates/TemplateList";
import BasicScoreTrialDisplay from "components/templates/score/basic-score/BasicScoreTrialDisplay";
import BestOutOfTrialDisplay from "components/templates/score/best-out-of/BestOutOfTrialDisplay";
import Strong from "components/atoms/Strong";
import FileChipWrapper from "components/molecules/FileChipWrapper";

const TrialDrilldown = ({trial, trackings, documents}) => {
  
  const determineTrialTemplate = () => {
    switch(trial.trialTemplate){
      case TEMPLATE_TYPES.SCORE_BASIC:
        return (
          <BasicScoreTrialDisplay trackings={trackings}/>
        );
      case TEMPLATE_TYPES.SCORE_BEST_OUT_OF:
        return (
          <BestOutOfTrialDisplay tracking={trackings[0]}/>
        );
      default: return <></>
    }
  };
  
  return (
    <div className={"drilldown-trialmeta"}>
      <h2 className={"marg-bot-2"}>{trial ? trial.label : "Trial ..."}</h2>
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
