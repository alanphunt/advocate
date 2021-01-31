import React, {useState} from "react";
import {FaMinus as MinusIcon, FaPlus as PlusIcon} from "react-icons/fa";
import TrialChart from "components/atoms/TrialChart";
import ImmutableTextArea from "components/molecules/ImmutableTextArea";
import {convertFileSize, determineTrialAccuracy, fileFetch} from "utils/functions/functions";
import FileChip from "components/atoms/FileChip";

const TrialDrilldown = ({trial, trackings, documents, isLoading, setIsLoading}) => {
    const trialAccuracyResults = (trackings?.length ? determineTrialAccuracy(trackings) : null);
    const [chipIndex, setChipIndex] = useState(-1);

    const completeRetrieval = () => {
        setIsLoading(false);
        setChipIndex(-1);
    };

    const handleFileAction = (file, action, index) => {
        setChipIndex(index);
        setIsLoading(true);
        fileFetch("/api/retrievedocument", file, action, () => {}, () => {}, completeRetrieval)
    };

    return (
        <div className={"drilldown-trialmeta"}>
            <h2 className={"marg-bot-2"}>Tracking for {trial ? trial.label : "..."}</h2>
            <div>
                {
                    trialAccuracyResults
                        ? <>
                            <p className={"marg-bot"}><strong>Trial Accuracy: </strong>{trialAccuracyResults.accuracy}%</p>
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
                            <TrialChart trialResults={trialAccuracyResults}/>
                            </>
                        : <></>
                }
                {
                    trial ? (
                        <>
                            <p className={"marg-top"}><strong>Comments: </strong></p>
                            <ImmutableTextArea rawData={trial.comments} />
                        </>
                    ) : <></>
                }
                {
                    documents?.length ? (
                        <div>
                            <p><strong>Documents:</strong></p>
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
                        </div>
                    ) : (<></>)
                }
            </div>
        </div>
    );
};

export default TrialDrilldown;
