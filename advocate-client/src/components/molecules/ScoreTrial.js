import React, {useState, useEffect} from "react";
import NumberPicker from "components/atoms/NumberPicker";
import StudentInfoCard from "components/atoms/StudentInfoCard";
import {FaPlus as PlusIcon, FaMinus as MinusIcon} from "react-icons/fa";
import NewTable from "./NewTable";
import Section from "components/atoms/Section";
import Button from "components/atoms/Button";
import TextArea from "./TextArea";
import { convertToRaw, EditorState, convertFromRaw } from 'draft-js';

/*
    goback: function- for creating a new trial and going back a page to select a new template
    benchmark: Benchmark- to display some data for the user of which trial this belongs to
    student: Student- to display some data for which student the benchmark/trial belongs to
    mutableTrial: Trial: optional- when we wish to edit the trial
    updateTeacher: function- for when we're done creating/editing and we need to refresh the teacher
 */
const ScoreTrial = ({goBack, benchmark, student, mutableTrial, updateMutableTrial, setTeacher}) => {
    const track =  {label: "", correct: 0};

    const mutableTrackings = mutableTrial?.trackings;

    const [trackingArray, setTracking] = useState([]);
    
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    useEffect(() => {
        if(mutableTrial)
            setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(mutableTrial.comments))));
    }, [])

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
        formData.append("comments", JSON.stringify(convertToRaw(editorState.getCurrentContent())));
        formData.append("trialNumber", benchmark.trials.length + 1);
        formData.append("tracking", JSON.stringify(trackingArray));
        formData.append("benchmarkId", benchmark.id);
        fetch("/api/createTrial", {method: "POST", body: formData})
            .then(r => r.json())
            .then(data => {
                setTeacher(data);
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
            setEditorState(value);
            updateMutableTrial({...mutableTrial, comments: JSON.stringify(convertToRaw(editorState.getCurrentContent()))})
        }
    };

    const addRemoveTracks = (tracking) => {
        updateMutableTrial({...mutableTrial, trackings: [...tracking]});
    };

    const tableInputs = (track, index) => {
       return { 
           label:                                                 
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
                />,
            tracking: 
                <div
                className={"itemsuccess"}
                onClick={() => {
                    mutableTrackings
                    ? updateTrackLogic("correct", index)
                    : updateTrack("correct", index)}}>
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
       } 
    };

    const renderTableInputs = () => {
        return (mutableTrackings || trackingArray).map((track, index) => {
            return tableInputs(track, index);
        });
    }

    return (
        <div className={"display"}>
            <div className={"width-50"}>
                <Section>
                    <h2>Basic Score Trial</h2>
                </Section>
                <Section>
                    <Section>
                        <h3 className={"marg-bot"}>Track Count</h3>
                        <NumberPicker
                            updateState={mutableTrial ? addRemoveTracks : setTracking}
                            object={track}
                            objectArray={mutableTrackings || trackingArray}
                        />
                    </Section>
                    <NewTable                         
                        headers={["Item Label", "Correct/Incorrect"]}
                        subheaders={["(press Tab for next item)", "(press Enter to toggle)"]}
                        data={renderTableInputs()}
                    />
                </Section>
                <Section>
                    <h3 className={"marg-bot"}>Trial Comments</h3>
                    <TextArea
                        editorState={editorState}
                        setEditorState={mutableTrial ? (editorState) => updateTrackLogic("comments", null, editorState) : setEditorState}                     
                    />
                </Section>
                    {
                        !mutableTrial
                            ? <div className={"marg-bot"}>
                                <Button className={"marg-right"} onClick={goBack} text="Back to templates"/>
                                <Button onClick={createTracking} text="Submit Trial"/>
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
