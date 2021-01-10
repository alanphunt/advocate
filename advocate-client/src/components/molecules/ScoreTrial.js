import React, {useState, useEffect} from "react";
import NumberPicker from "components/atoms/NumberPicker";
import {FaPlus as PlusIcon, FaMinus as MinusIcon} from "react-icons/fa";
import Table from "./Table";
import Section from "components/atoms/Section";
import Button from "components/atoms/Button";
import TextArea from "./TextArea";
import { convertToRaw, EditorState, convertFromRaw } from 'draft-js';
import FormElement from "components/atoms/FormElement";
import {FaCheck as CheckIcon} from "react-icons/fa";
import CardAndUploadColumn from "./CardAndUploadColumn";
import { mapFileMetaDataToDocument } from "utils/functions/functions";

/*
    goback: function- for creating a new trial and going back a page to select a new template
    benchmark: Benchmark- to display some data for the user of which trial this belongs to
    student: Student- to display some data for which student the benchmark/trial belongs to
    mutableTrial: Trial: optional- when we wish to edit the trial
    updateTeacher: function- for when we're done creating/editing and we need to refresh the teacher
 */
const ScoreTrial = ({goBack, benchmark, studentName, goalName, mutableTrial, updateMutableTrial, cleanupCrudOp, trialFiles, setTrialFiles}) => {
    const track =  {label: "", correct: 0};

    const mutableTrackings = mutableTrial?.trackings;

    const [trackingArray, setTracking] = useState([]);
    
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    //for storing the uploads, metadata will be stored in trial.documents

    const handleFiles = (fileArray, method) => {
        // let metaArray = [...mapFileMetaDataToDocument(fileArray, mutableTrial.documents, mutableTrial.id)];
        // updateMutableTrial({...mutableTrial, documents: metaArray});
        method === "file"
        ? 
        setTrialFiles(fileArray) 
        : 
        updateMutableTrial(prev => ({...prev, documents: fileArray}));
    };

    useEffect(() => {
        if(mutableTrial){
            try{
                const fromRaw = EditorState.createWithContent(convertFromRaw(JSON.parse(mutableTrial?.comments)));
                setEditorState(fromRaw);
                updateMutableTrial({...mutableTrial, comments: fromRaw.getCurrentContent()})
            }catch(e){
                console.log(e);
            }
        }
        return () => setTrialFiles([]);
    }, []);

    useEffect(() => {
        //if a file is added we need to add meta, if a file is deleted it needs to be removed from meta
        if(trialFiles.length){
            let updatedMetaArray = [...mapFileMetaDataToDocument(trialFiles, mutableTrial.documents, mutableTrial.id)];
            updateMutableTrial({...mutableTrial, documents: updatedMetaArray});
        }else{
            updateMutableTrial({...mutableTrial, documents: mutableTrial.documents.filter(doc => doc.id)})
        }
    }, [trialFiles])

    const updateTrack = (key, index, value) => {
        let newSt = JSON.parse(JSON.stringify(trackingArray));
        newSt = newSt.map((track, tIndex) => {
            if (index === tIndex)
                track[key] = (key === "correct" ? (track[key] === 0 ? 1 : 0) : value);
            return track;
        });

        setTracking(newSt);
    };

    const createTrial = () => {
        let formData = new FormData();
        formData.append("comments", JSON.stringify(convertToRaw(editorState.getCurrentContent())));
        formData.append("trialNumber", benchmark.trials.length + 1);
        formData.append("tracking", JSON.stringify(trackingArray));
        formData.append("benchmarkId", benchmark.id);
        const fileStrings = [];
        trialFiles.forEach(file => fileStrings.push(JSON.stringify(file)));
        formData.append("documents", JSON.stringify(fileStrings));

        fetch("/api/createTrial", {method: "POST", body: formData})
            .then(r => r.json())
            .then(data => {
                cleanupCrudOp(data, <><CheckIcon className="i-right"/>Successfully created score trial #{benchmark.trials.length + 1}!</>);
                setTrialFiles([]);
            });
    };

    const updateTrackLogic = (key, index, value) => {
        if(key === "correct")
            value = mutableTrackings[index].correct === 1 ? 0 : 1;
        else if(key == "trackings") {
            let track = {...mutableTrackings[index], [key]: value};
            let trackings = [...mutableTrial.trackings];
            trackings.splice(index, 1, track);
            updateMutableTrial({...mutableTrial, trackings: [...trackings]});
        }else if(key === "comments"){
            updateMutableTrial({...mutableTrial, comments: value.getCurrentContent()})
            setEditorState(value);
        }
    };

    const addRemoveTracks = (tracking) => {
        updateMutableTrial({...mutableTrial, trackings: [...tracking]});
    };

    const tableInputs = (track, index) => {
       return { 
           label:                                                 
                <FormElement
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
        <div className="display">
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
                    <Table                         
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
                                <Button onClick={createTrial} text="Submit Trial"/>
                              </div>
                            : <></>
                    }
                </div>
            <CardAndUploadColumn
                header={`Trial for ${studentName.substring(0,1).toUpperCase() + studentName.substring(1)}`}
                object={{
                    Goal: goalName, 
                    Benchmark: benchmark.label, 
                    Description: benchmark.description
                }}
                files={trialFiles}
                fileMetaData={mutableTrial.documents || []}
                setFiles={handleFiles}
                apiPath="/api/retrievedocument"
            />
        </div>
    );
};

export default ScoreTrial;
