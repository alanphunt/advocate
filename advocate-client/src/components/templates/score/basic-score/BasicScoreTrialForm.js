import React from "react";
import NumberPicker from "components/atoms/NumberPicker";
import {FaPlus as PlusIcon, FaMinus as MinusIcon, FaRegTrashAlt as TrashIcon} from "react-icons/fa";
import Table from "components/molecules/table/Table";
import Section from "components/atoms/Section";
import FormElement from "components/atoms/FormElement";
import ErrorLabel from "components/atoms/ErrorLabel";
import RequiredField from "components/atoms/RequiredField";
import {Tracking, TrackingMeta} from "utils/classes/ContextModels";
import H3 from "../../../atoms/H3";

const BasicScoreTrialForm = ({labelError, updateTracks, trackingMeta}) => {

/*  const handleTrackingsUpdate = (key, index, value) => {
    let newTrackings = [...trackings];
    let track = {...newTrackings[index]};
    
    Object.assign(track, (key === "correct" ? {correct: track.correct ? 0 : 1} : {[key]: value}))
    newTrackings.splice(index, 1, track);
    updateTracks(newTrackings);
  };*/
  
  const handleTrackingsUpdate = (key, index, value) => {
    let newTrackings = [...trackingMeta];
    let track = {...trackingMeta[index]};
    
    Object.assign(track, (key === "correct" ? {correct: track.correct ? 0 : 1} : {[key]: value}))
    newTrackings.splice(index, 1, track);
    updateTracks(newTrackings);
  };
  
  const handleTrackDeletion = (index) => {
    const newTracks = [...trackingMeta];
    // const newTracks = [...trackings];
    newTracks.splice(index, 1);
    updateTracks(newTracks);
  };
  
  const tableInputs = (track, index) => {
    return {
      action:
        <span><TrashIcon className={"i-hover"} onClick={() => handleTrackDeletion(index)}/></span>,
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
      <div className={"width-100 flex-center-between"}>
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
      </div>
    }
  };
  
  const renderTableInputs = () => {
    return trackingMeta.map((track, index) => {
      return tableInputs(track, index);
    });
  }
  
  return (
    <>
      <Section>
        <Section>
          <H3 classes={"i-bottom"}>Track Count</H3>
          <NumberPicker
            updateState={updateTracks}
            object={new TrackingMeta()}
            objectArray={trackingMeta}
          />
        </Section>
        {labelError ? <ErrorLabel text={labelError}/> : <></>}
        {
         trackingMeta?.length >= 0 ? (
           <Table
             columnSize={{0: "flex-quarter"}}
             headers={[<>Action</>, <>Item Label<RequiredField/><p>(press Tab for next item)</p></>, <>Correct/Incorrect<p>(press Enter to toggle)</p></>]}
             tableData={renderTableInputs()}
             hideSearchAndSort
           />
         ) : <></>
        }
      </Section>
    </>
  );
};

export default BasicScoreTrialForm;