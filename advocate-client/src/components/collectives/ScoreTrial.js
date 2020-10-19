import React, {useState} from "react";
import NumberPicker from "components/singletons/NumberPicker";
import Table from "components/collectives/Table";
import StudentInfoCard from "components/singletons/StudentInfoCard";
import {FaPlus as PlusIcon, FaMinus as MinusIcon} from "react-icons/fa";

/*
    goback- for creating a new trial and going back a page to select a new template
    benchmark- to display some data for the user of which trial this belongs to
    student- to display some data for which student the benchmark/trial belongs to
    mutableTrial- when we wish to edit the trial
    updateTeacher- for when we're done creating/editing and we need to refresh the teacher
 */
const ScoreTrial = ({goBack, benchmark, student, mutableTrial, updateMutableTrial, updateTeacher}) => {
    const track =  {label: "", correct: 0};

    const mutableTrackings = mutableTrial?.trackings;

    const [trialComments, setComments] = useState("");

    const [trackingArray, setTracking] = useState([]);

    const updateTrack = (key, index, value) => {
        let newSt = JSON.parse(JSON.stringify(trackingArray));
        newSt = newSt.map((track, tIndex) => {
            if (index === tIndex)
                track[key] = (key === "correct" ? (track[key] === 0 ? 1 : 0) : value);
            return track;
        });

        setTracking(newSt);
    };

    const createTracking = () => {
        let formData = new FormData();
        formData.append("comments", trialComments);
        formData.append("trialNumber", benchmark.trials.length + 1);
        formData.append("tracking", JSON.stringify(trackingArray));
        formData.append("benchmarkId", benchmark.id);
        fetch("/api/createTrial", {method: "POST", body: formData, headers: {"Authorization": `Bearer ${sessionStorage.authorization}`}})
            .then(r => r.json())
            .then(data => {
                updateTeacher(data);
            });
    };

    const updateTrackLogic = (key, index, value) => {
        if(key === "correct")
            value = mutableTrackings[index].correct === 1 ? 0 : 1;

        if(key !== "comments") {
            let track = {...mutableTrackings[index], [key]: value};
            let trackings = [...mutableTrial.trackings];
            trackings.splice(index, 1, track);
            updateMutableTrial({...mutableTrial, trackings: [...trackings]});
        }else{
            updateMutableTrial({...mutableTrial, [key]: value});
        }

    };

    const addRemoveTracks = (tracking) => {
        updateMutableTrial({...mutableTrial, trackings: [...tracking]});
    };

    return (
        <div className={"display"}>
            <div className={"width-50"}>
                <div className={"marg-bot-2"}>
                    <h2>Basic Score Trial</h2>
                </div>
                <div className={"marg-bot-2"}>
                    <div className={"marg-bot-2"}>
                        <h3 className={"marg-bot"}>Track Count</h3>
                        <NumberPicker
                            updateState={mutableTrial ? addRemoveTracks : setTracking}
                            object={track}
                            objectArray={mutableTrackings || trackingArray}
                        />
                    </div>
                    <Table
                        headers={["Item Label", "Correct/Incorrect"]}
                        subheaders={["(press Tab for next item)", "(press Enter to toggle)"]}>
                        <div>
                            {
                                (mutableTrackings || trackingArray).map((track, index) => {
                                    return (
                                        <div key={`trackingitem${index}`} className={"tr"}>
                                            <div className="td">
                                                <input
                                                    onChange={(e) => {
                                                        mutableTrackings
                                                        ? updateTrackLogic("label", index, e.currentTarget.value)
                                                        : updateTrack("label", index, e.currentTarget.value)
                                                    }}
                                                    value={track.label || ""}
                                                    onKeyPress={(e) => {
                                                        if(e.key === "Enter"){
                                                            mutableTrackings
                                                                ? updateTrackLogic("correct", index)
                                                                : updateTrack("correct", index)
                                                        }
                                                    }}
                                                    placeholder='Item label'
                                                />
                                            </div>
                                            <div className="td">
                                                <div
                                                    className={"itemsuccess"}
                                                    onClick={() => {
                                                        mutableTrackings
                                                        ? updateTrackLogic("correct", index)
                                                        : updateTrack("correct", index)
                                                    }}
                                                >
                                                    <span>
                                                        <PlusIcon
                                                            className={`marg-right comp-color ${track.correct === 1 ? "" : "grayscale"}`}
                                                        />
                                                    </span>
                                                    <span>
                                                        <MinusIcon
                                                            className={`incomp-color ${track.correct === 1 ? "grayscale" : ""}`}
                                                        />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </Table>
                </div>
                <div className={"marg-bot-2"}>
                    <h3 className={"marg-bot"}>Trial Comments</h3>
                    <textarea
                        value={mutableTrial?.comments || trialComments}
                        placeholder={"Additional comments"}
                        onChange={(e) => {
                            mutableTrial
                                ? updateTrackLogic("comments", null, e.currentTarget.value)
                                : setComments(e.currentTarget.value)
                        }}
                    />
                </div>
                    {
                        !mutableTrial
                            ? <div className={"marg-bot"}>
                                <button className={"marg-right"} onClick={goBack}>Back to templates</button>
                                <button onClick={createTracking}>Submit Trial</button>
                              </div>
                            : <></>
                    }
                </div>
            <div className={"width-50"}>
                <StudentInfoCard student={student} benchmark={benchmark}/>
            </div>
        </div>
    );
};

export default ScoreTrial;