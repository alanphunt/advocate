import React from "react";
import {FaMinus as MinusIcon, FaPlus as PlusIcon} from "react-icons/fa";
import TrialChart from "components/atoms/TrialChart";
import ImmutableTextArea from "components/molecules/ImmutableTextArea";
import {determineTrialAccuracy} from "utils/functions/functions";

const TrialDrilldown = ({trial, teacher}) => {
    const trackings = trial?.trackingIds.map(id => teacher.trackings[id]);

    const trialAccuracyResults = (trackings ? determineTrialAccuracy(trackings) : null);

    return (
        <div className={"drilldown-trialmeta"}>
            <h2 className={"marg-bot-2"}>Tracking for {trial ? trial.label : "..."}</h2>
            {
                trackings ? (
                    <div>
                        <p className={"marg-bot"}><strong>Trial Accuracy: </strong>{trialAccuracyResults.accuracy}%</p>
                        {
                            trackings.map(track => {
                                return (
                                    <p key={`tracklabel${track.label.toUpperCase()}`}>
                                        <strong>Label: </strong>
                                        {track.label}
                                        <span className={"marg-left"}>
                                            {track.correct === 1 ? <PlusIcon className={"comp-color"}/> : <MinusIcon className={"incomp-color"}/>}
                                        </span>
                                    </p>
                                )})
                        }
                        {trialAccuracyResults ? <TrialChart trialResults={trialAccuracyResults}/> : <></>}
                        <p className={"marg-top"}><strong>Comments: </strong></p>
                        <ImmutableTextArea rawData={trial.comments} />
                    </div>
                ) : <></>
            }
        </div>
    );
};

export default TrialDrilldown;
