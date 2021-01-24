import React, {useState, useEffect} from "react";
import NumberPicker from "components/atoms/NumberPicker";
import {FaPlus as PlusIcon, FaMinus as MinusIcon} from "react-icons/fa";
import Table from "./table/Table";
import Section from "components/atoms/Section";
import Button from "components/atoms/Button";
import TextArea from "./TextArea";
import { EditorState, convertFromRaw } from 'draft-js';
import FormElement from "components/atoms/FormElement";
import {FaCheck as CheckIcon} from "react-icons/fa";
import CardAndUploadColumn from "./CardAndUploadColumn";
import { crudFetch, formifyObject, mapFileMetaDataToDocument, prepareEditorStateForRequest } from "utils/functions/functions";
import { SERVER_ERROR } from "utils/constants";
import ConfirmOrCancelButtons from "./ConfirmOrCancelButtons";
import ErrorLabel from "components/atoms/ErrorLabel";

/*
    goback: function- for creating a new trial and going back a page to select a new template
    benchmark: Benchmark- to display some data for the user of which trial this belongs to
    student: Student- to display some data for which student the benchmark/trial belongs to
    mutableTrial: Trial: optional- when we wish to edit the trial
    updateTeacher: function- for when we're done creating/editing and we need to refresh the teacher
 */
const ScoreTrial = ({goBack, benchmark, studentName, goalName, mutableTrial, setMutableTrial, completeCrudOp, closeModal}) => {
    const track =  {label: "", correct: 0};

    const mutableTrackings = mutableTrial?.trackings;

    const [trackingArray, setTracking] = useState([]);
    
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const [requestErrors, setRequestErrors] = useState("");

    const [trialFiles, setTrialFiles] = useState([]);
    const [docMetaForNewTrial, setDocMetaForNewTrial] = useState([]);

    const handleFiles = (fileArray, method) => {
        // let metaArray = [...mapFileMetaDataToDocument(fileArray, mutableTrial.documents, mutableTrial.id)];
        // updateMutableTrial({...mutableTrial, documents: metaArray});
        method === "file"
        ? 
        setTrialFiles(fileArray) 
        : 
        setMutableTrial(prev => ({...prev, documents: fileArray}));
    };

    useEffect(() => {
        if(mutableTrial){
            try{
                const fromRaw = EditorState.createWithContent(convertFromRaw(JSON.parse(mutableTrial?.comments)));
                setEditorState(fromRaw);
                setMutableTrial({...mutableTrial, comments: fromRaw.getCurrentContent()})
            }catch(e){
                console.log(e);
            }
        }
        return () => setTrialFiles([]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        //if a file is added we need to add meta, if a file is deleted it needs to be removed from meta
        if(mutableTrial){
            if(trialFiles.length){
                let updatedMetaArray = [...mapFileMetaDataToDocument(trialFiles, mutableTrial.documents, mutableTrial.id)];
                setMutableTrial({...mutableTrial, documents: updatedMetaArray});
            }else
                setMutableTrial({...mutableTrial, documents: mutableTrial.documents.filter(doc => doc.id)})
        }else{
            setDocMetaForNewTrial([...mapFileMetaDataToDocument(trialFiles, docMetaForNewTrial)])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trialFiles])

    //todo
    const updateTrackForNewTrial = (key, index, value) => {
        let newSt = JSON.parse(JSON.stringify(trackingArray));
        newSt = newSt.map((track, tIndex) => {
            if (index === tIndex)
                track[key] = (key === "correct" ? (track[key] === 0 ? 1 : 0) : value);
            return track;
        });

        setTracking(newSt);
    };

    const createTrial = () => {
        const trialNumber = benchmark.trials.length + 1;
        let formData = formifyObject({
                "comments": prepareEditorStateForRequest(editorState.getCurrentContent()),
                "trialNumber": trialNumber,
                "trackings": JSON.stringify(trackingArray),
                "benchmarkId": benchmark.id,
                "documents": trialFiles,
                "documentMeta": JSON.stringify(docMetaForNewTrial)
            });

        crudFetch({
            path: "createtrial",
            method: "POST",
            body: formData,
            success: (data) => {
                completeCrudOp(data, <><CheckIcon className="i-right"/>Successfully created Score Trial #{trialNumber}!</>);
                setTrialFiles([]);
            },
            error: (res) => setRequestErrors(res),
            serverError: () => alert(SERVER_ERROR)
        });
    };

    const editTrial = () => {
        let fd = new FormData();
        fd.append("body", 
            JSON.stringify(
                {
                    ...mutableTrial, 
                    comments: prepareEditorStateForRequest(mutableTrial.comments)
                }
            )
        );
        for(let i = 0; i < trialFiles.length; i++){
            fd.append("documents", trialFiles[i]);
        }
        crudFetch({
            path: "edittrial",
            method: "POST",
            body: fd,
            success: (data) => 
                completeCrudOp(data, <><CheckIcon className="i-right"/>Successfully updated {mutableTrial.label}</>),
            error: (res) => setRequestErrors(res),
            serverError: () => alert(SERVER_ERROR)
        });
    };

    const handleTrialUpdate = (key, index, value) => {
        let trackings = [...mutableTrial.trackings];
        let track = {...trackings[index]};

        if(key === "correct" || key ==="label"){
            Object.assign(track, (key === "correct" ? {correct: track.correct === 1 ? 0 : 1} : {[key]: value}))
            trackings.splice(index, 1, track);
            setMutableTrial({...mutableTrial, trackings: [...trackings]});
        }else if(key === "comments"){
            setMutableTrial({...mutableTrial, comments: value.getCurrentContent()})
            setEditorState(value);
        }
    };

    const addRemoveTracks = (tracking) => {
        setMutableTrial({...mutableTrial, trackings: [...tracking]});
    };

    const tableInputs = (track, index) => {
       return { 
           label:                                                 
                <FormElement
                    onChange={(e) => {
                        mutableTrackings
                        ? handleTrialUpdate("label", index, e.currentTarget.value)
                        : updateTrackForNewTrial("label", index, e.currentTarget.value)
                    }}
                    value={track.label || ""}
                    onKeyPress={(e) => {
                        if(e.key === "Enter"){
                            mutableTrackings
                                ? handleTrialUpdate("correct", index)
                                : updateTrackForNewTrial("correct", index)
                        }
                    }}
                    placeholder='Item label'
                />,
            tracking: 
                <div
                className={"itemsuccess"}
                onClick={() => {
                    mutableTrackings
                    ? handleTrialUpdate("correct", index)
                    : updateTrackForNewTrial("correct", index)}}>
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
                    {requestErrors ? <ErrorLabel text={requestErrors.label}/> : <></>}
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
                        setEditorState={mutableTrial ? (editorState) => handleTrialUpdate("comments", null, editorState) : setEditorState}                     
                    />
                </Section>
                    {
                    mutableTrial
                            ? (
                                <ConfirmOrCancelButtons                     
                                    cancelCallback={closeModal}
                                    confirmCallback={editTrial}
                                />
                            ) : ( 
                                <div className={"marg-bot"}>
                                    <Button className={"marg-right"} onClick={createTrial} text="Submit Trial"/>
                                    <Button className={"cancelButton"} onClick={goBack} text="Back to templates"/>
                                </div>
                            )
                    }
                </div>
            <CardAndUploadColumn
                header={`Trial for ${studentName}`}
                object={{
                    Goal: goalName, 
                    Benchmark: benchmark.label, 
                    Description: benchmark.description
                }}
                files={trialFiles}
                fileMetaData={mutableTrial?.documents || []}
                setFiles={handleFiles}
                apiPath="/api/retrievedocument"
            />
        </div>
    );
};

export default ScoreTrial;
