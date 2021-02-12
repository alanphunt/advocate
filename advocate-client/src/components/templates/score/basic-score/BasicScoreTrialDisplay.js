import React from "react";
import {determineScoreTrialAccuracy} from "utils/functions/functions";
import {FaMinus as MinusIcon, FaPlus as PlusIcon} from "react-icons/fa";
import TrialChart from "components/atoms/TrialChart";
import {GraphDataPoint} from "utils/models";

const BasicScoreTrialDisplay = ({trackings}) => {
  const results = (trackings?.length ? determineScoreTrialAccuracy(trackings) : null);
  
  const dataPoints = [
    new GraphDataPoint(results.correct, results.accuracy, results.total, "Correct", "#51bcda", results.correctLabels),
    new GraphDataPoint(results.incorrect, results.inaccuracy, results.total, "Incorrect", "#f44336", results.incorrectLabels)
  ];
  
  const test = [
    {label: "Correct", y: results.correct},
    {label: "Incorrect", y: results.incorrect},
  ]
  
  return (
    results
    ? (
      <>
        <p><strong>Trial Accuracy: </strong>{results.accuracy}%</p>
        <div>
          {
            trackings.map(track => {
              return (
                <p key={`tracklabel${track.label.toUpperCase()}`}>
                  <strong>Label: </strong>
                  {track.label}
                  <span className={"marg-left"}>
                    {track.correct === 1 ? <PlusIcon className={"comp-color"}/> :
                      <MinusIcon className={"incomp-color"}/>}
                  </span>
                </p>
              )
            })
          }
        </div>
        <TrialChart dataPoints={test}/>
      </>
      ) : <></>
  );
};

export default BasicScoreTrialDisplay;
