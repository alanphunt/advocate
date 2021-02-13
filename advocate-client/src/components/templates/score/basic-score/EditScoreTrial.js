import React, {useState} from "react";
import BasicScoreTrialForm from "components/templates/score/basic-score/BasicScoreTrialForm";
import {crudFetch, mapFileMetaDataToDocument, prepareEditorStateForRequest} from "utils/functions/functions";
import {FaCheck as CheckIcon} from "react-icons/fa";
import {SERVER_ERROR} from "utils/constants";
import {trialErrorsModel} from "utils/models";
import ConfirmOrCancelButtons from "components/molecules/ConfirmOrCancelButtons";
import TemplateFrame from "components/templates/TemplateFrame";

const EditScoreTrial = ({closeModal, studentName, goalName, benchmark, mutableTrial, setMutableTrial, completeCrudOp, isLoading, setIsLoading}) => {
  const [trialFiles, setTrialFiles] = useState([]);
  const [requestErrors, setRequestErrors] = useState(trialErrorsModel);
  let fileMeta = mapFileMetaDataToDocument(trialFiles, mutableTrial.documents);
  
  const editTrial = () => {
    setIsLoading({"editTrial": true});
    let formData = mapMutableTrialData();
    for(let i = 0; i < trialFiles.length; i++){
      formData.append("documents", trialFiles[i]);
    }
    crudFetch({
      path: "edittrial",
      method: "POST",
      body: formData,
      success: (data) =>
        completeCrudOp(data, <><CheckIcon className="i-right"/>Successfully updated {mutableTrial.label}</>),
      error: (res) => { setRequestErrors(res); setIsLoading({"":false});},
      serverError: () => alert(SERVER_ERROR)
    });
  };
  
  const mapMutableTrialData = () => {
    let fd = new FormData();
    let comments;
    try{
      comments = prepareEditorStateForRequest(mutableTrial.comments.getCurrentContent())
    }catch(e){
      console.log("Editor state was not updated, preparing raw state.");
      comments = prepareEditorStateForRequest(mutableTrial.comments);
    }
    fd.append("trial", JSON.stringify({
      ...mutableTrial,
      trackings: [],
      documents: [],
      trackingIds: [],
      documentIds: [],
      comments: comments
    }));
    fd.append("trackings", JSON.stringify(mutableTrial.trackings));
    fd.append("documentMeta", JSON.stringify(fileMeta));
    return fd;
  };
  
  return (
    <>
      <TemplateFrame
        cardHeader={`Basic Score Trial for ${studentName}`}
        goalName={goalName}
        benchmark={benchmark}
        trialFiles={trialFiles}
        setTrialFiles={setTrialFiles}
        fileMetaData={fileMeta}
        updateFileMetaData={updatedMeta => setMutableTrial(prev => ({...prev, documents: [...updatedMeta]}))}
        dateStarted={mutableTrial.dateStarted}
        dateStartedError={requestErrors.dateStarted}
        setTrial={setMutableTrial}
      >
        <BasicScoreTrialForm
          trackings={mutableTrial.trackings}
          labelError={requestErrors.label}
          updateTracks={(newTracks) => setMutableTrial(prev => ({...prev, trackings: newTracks}))}
        />
      </TemplateFrame>
      <ConfirmOrCancelButtons
        cancelCallback={closeModal}
        confirmCallback={editTrial}
        isLoading={isLoading}
      />
    </>
  );
};

export default EditScoreTrial;
