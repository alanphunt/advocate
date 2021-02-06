import React from "react";
import NumberPicker from "components/atoms/NumberPicker";
import {FaPlus as PlusIcon, FaMinus as MinusIcon, FaCalendarPlus as CalPlusIcon} from "react-icons/fa";
import Table from "./table/Table";
import Section from "components/atoms/Section";
import TextArea from "./TextArea";
import FormElement from "components/atoms/FormElement";
import ErrorLabel from "components/atoms/ErrorLabel";
import { EditorState, convertFromRaw } from 'draft-js';

const BasicScoreTrial = ({trial, setTrial, trackings, errors, comments, updateTracks, handleComments}) => {
    const track =  {label: "", correct: 0};

    const handleTrackingsUpdate = (key, index, value) => {
        let newTrackings = [...trackings];
        let track = {...newTrackings[index]};

        Object.assign(track, (key === "correct" ? {correct: track.correct ? 0 : 1} : {[key]: value}))
        newTrackings.splice(index, 1, track);
        updateTracks(newTrackings);
    };

    const tableInputs = (track, index) => {
        return {
            label:
                <FormElement
                    onChange={(e) => handleTrackingsUpdate("label", index, e.currentTarget.value)}
                    value={track.label || ""}
                    onKeyPress={(e) => {
                        if(e.key === "Enter")
                            handleTrackingsUpdate("correct", index)
                    }}
                    placeholder='Item label'
                />,
            tracking:
                <div
                    className={"itemsuccess"}
                    onClick={() => handleTrackingsUpdate("correct", index)}>
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
        return trackings.map((track, index) => {
            return tableInputs(track, index);
        });
    }

    return (
        <>
            <Section>
                <Section>
                    <FormElement
                        label={"Start Date"}
                        icon={<CalPlusIcon/>}
                        placeholder={"MM/DD/YY"}
                        value={trial?.dateStarted}
                        onChange={(e) => setTrial(prev => ({...prev, dateStarted: e.currentTarget.value}))}
                        errorMessage={errors.dateStarted}
                        required
                    />
                </Section>

                <Section>
                    <h3 className={"marg-bot"}>Track Count</h3>
                    <NumberPicker
                        updateState={updateTracks}
                        object={track}
                        objectArray={trackings}
                    />
                </Section>
                {errors.label ? <ErrorLabel text={errors.label}/> : <></>}
                <Table
                    headers={[<>Item Label<p>(press Tab for next item)</p></>, <>Correct/Incorrect<p>(press Enter to toggle)</p></>]}
                    tableData={renderTableInputs()}
                    hideSearchAndSort
                />
            </Section>
            <Section>
                <h3 className={"marg-bot"}>Trial Comments</h3>
                <TextArea
                    editorState={typeof comments === "string" ? EditorState.createWithContent(convertFromRaw(JSON.parse(comments))) : comments}
                    setEditorState={handleComments}
                />
            </Section>
        </>
    );
};

export default BasicScoreTrial;