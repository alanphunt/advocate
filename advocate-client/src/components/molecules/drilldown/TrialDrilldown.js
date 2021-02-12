import React, {useState} from "react";
import ImmutableTextArea from "components/molecules/ImmutableTextArea";
import {convertFileSize, fileFetch} from "utils/functions/functions";
import FileChip from "components/atoms/FileChip";
import Box from "components/atoms/Box";
import {TEMPLATE_TYPES} from "components/templates/TemplateList";
import BasicScoreTrialDisplay from "components/templates/score/basic-score/BasicScoreTrialDisplay";
import BestOutOfTrialDisplay from "components/templates/score/best-out-of/BestOutOfTrialDisplay";

const TrialDrilldown = ({trial, trackings, documents}) => {
  const [chipIndex, setChipIndex] = useState(-1);
  
  const [isLoading, setIsLoading] = useState(false);
  
  const completeRetrieval = () => {
    setIsLoading(false);
    setChipIndex(-1);
  };
  
  const handleFileAction = (file, action, index) => {
    setChipIndex(index);
    setIsLoading(true);
    fileFetch("/api/retrievedocument", file, action, () => {}, () => {}, completeRetrieval)
  };
  
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
      <h2 className={"marg-bot-2"}>Tracking for {trial ? trial.label : "..."}</h2>
      {
        trial ?
          <div>
            <p><strong>Start Date: </strong> {trial.dateStarted}</p>
            {determineTrialTemplate()}
            <p className={"marg-top"}><strong>Comments: </strong></p>
            <ImmutableTextArea rawData={trial.comments} />
            <div className={"marg-top"}>
              <p><strong>Documents:</strong></p>
              {
                documents?.length ? (
                  <div className="filechip-wrapper">
                    {
                      documents.map((file, index) => {
                        return <FileChip
                          key={`filechip-${file.name}`}
                          text={`${file.name} - ${convertFileSize(file.size)}`}
                          onPreview={() => handleFileAction(file, "preview", index)}
                          onDownload={() => handleFileAction(file, "download", index)}
                          isLoading={index === chipIndex && isLoading}
                        />
                      })
                    }
                  </div>
                ) : (<Box text={"No documents."}/>)
              }
            </div>
          </div>
          : <></>
      }
    </div>
  );
};

export default TrialDrilldown;
