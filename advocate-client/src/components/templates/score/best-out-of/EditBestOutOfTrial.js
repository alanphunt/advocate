import React, {useState} from "react";
import BestOutOfTrialForm from "./BestOutOfTrialForm";
import TemplateFrame from "components/templates/TemplateFrame";
import {
  blobifyJson,
  crudFetch,
  mapFileMetaDataToDocument,
  prepareEditorStateForRequest
} from "utils/functions/functions";
import {trialErrorsModel} from "utils/models";
import ConfirmOrCancelButtons from "components/molecules/ConfirmOrCancelButtons";
import {FaCheck as CheckIcon} from "react-icons/fa";
import {SERVER_ERROR} from "utils/constants";

const EditBestOutOfTrial = ({closeModal, studentName, goalName, benchmark, mutableTrial, setMutableTrial, completeCrudOp, isLoading, setIsLoading}) => {
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
    fd.append("trial", blobifyJson({
      ...mutableTrial,
      documents: fileMeta,
      comments: comments
    }));
    return fd;
  };
  
  return (
    <>
      <TemplateFrame
        cardHeader={`Best Out Of Trial for ${studentName}`}
        goalName={goalName}
        benchmark={benchmark}
        trialFiles={trialFiles}
        setTrialFiles={setTrialFiles}
        fileMetaData={fileMeta}
        updateFileMetaData={(updatedMeta) => setMutableTrial(prev => ({...prev, documents: [...updatedMeta]}))}
        dateStarted={mutableTrial.dateStarted}
        dateStartedError={requestErrors.dateStarted}
        setTrial={setMutableTrial}
      >
        <BestOutOfTrialForm
          track={mutableTrial.tracking}
          setTrack={(newTrack) => setMutableTrial(prev => ({...prev, tracking: {...prev.tracking, ...newTrack}}))}
          error={requestErrors.tracking}
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

export default EditBestOutOfTrial;
