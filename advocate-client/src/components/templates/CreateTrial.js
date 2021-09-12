import React, {useEffect, useState, Suspense} from "react";
import TrialTemplateCards from "components/molecules/TrialTemplateCards";
import {TEMPLATE_TYPES} from "components/templates/TemplateList";
import TemplateLoadingPlaceholder from "components/atoms/TemplateLoadingPlaceholder";
import TemplateFrame from "./TemplateFrame";
import {Tracking, Trial} from "utils/classes/ContextModels";
import {EditorState} from "draft-js";
import {trialErrorsModel} from "utils/models";
import {
  blobifyJson,
  crudFetch,
  mapFileMetaDataToDocument,
  prepareEditorStateForRequest
} from "utils/functions/functions";
import {FaCheck as CheckIcon, FaTimes as XIcon} from "react-icons/fa";
import {SERVER_ERROR} from "utils/constants";
import Button from "components/atoms/Button";
import BestOutOfTrialForm from "./score/best-out-of/BestOutOfTrialForm";
import ModalBody from "components/molecules/ModalBody";
const BasicScoreTrialForm = React.lazy(() => import("./score/basic-score/BasicScoreTrialForm"));

const CreateTrial = ({benchmark, studentName, completeCrudOp, goalName, isLoading, setIsLoading}) => {
  const [trialTemplate, setTrialTemplate] = useState("");
  
  const [newTrial, setNewTrial] = useState(new Trial());
  const [tracking, setTracking] = useState(new Tracking());
  const [trackingMeta, setTrackingMeta] = useState([]);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [requestErrors, setRequestErrors] = useState(trialErrorsModel);
  const [trialFiles, setTrialFiles] = useState([]);
  
  let fileMetaData = mapFileMetaDataToDocument(trialFiles, []);
  
  const goBack = () => {
    setTrialTemplate("");
    setNewTrial(new Trial());
    setTracking(new Tracking());
    setTrackingMeta([]);
    setEditorState(EditorState.createEmpty());
    setRequestErrors(trialErrorsModel);
    setTrialFiles([]);
  };
  
  useEffect(() => {
    return () => goBack();
  }, [])
  
/*  useEffect(() => {
    if(trialTemplate) {
      if (trialTemplate === TEMPLATE_TYPES.SCORE_BASIC)
        setTracking([]);
    }
  }, [trialTemplate]);*/
  
  const createTrial = () => {
    setIsLoading({"createTrial": true});
    const trialNumber = benchmark.trialIds.length + 1;
/*    let formData = formifyObject({
      "trialTemplate": trialTemplate,
      "dateStarted": newTrial.dateStarted || "",
      "comments": prepareEditorStateForRequest(editorState.getCurrentContent()),
      "trialNumber": trialNumber,
      "tracking": JSON.stringify(tracking),
      "benchmarkId": benchmark.id,
      "documentMeta": JSON.stringify(fileMetaData)
    });*/
    const formData = new FormData();
    for(let i = 0; i < trialFiles.length; i++){
      formData.append("documents", trialFiles[i]);
    }
    const blob = blobifyJson({
      ...newTrial,
      trialTemplate: trialTemplate,
      trialNumber: trialNumber,
      comments: prepareEditorStateForRequest(editorState.getCurrentContent()),
      tracking: {...tracking, trackingMeta: trackingMeta},
      benchmarkId: benchmark.id,
      documents: fileMetaData
    });
    formData.append("trial", blob);
    
    crudFetch({
      path: "createtrial",
      method: "POST",
      body: formData,
      success: (data) => completeCrudOp(data, <><CheckIcon className="i-right"/>Successfully created Score Trial #{trialNumber}!</>),
      error: (res) => {setIsLoading({"":false}); setRequestErrors(res);},
      serverError: () => {setIsLoading({"": false}); alert(SERVER_ERROR);}
    });
  };
  
  const renderTemplate = (cardHeader, modalHeader, child) => {
    return (
      <ModalBody
        header={modalHeader}
        hideButtons
      >
        <TemplateFrame
          trialFiles={trialFiles}
          setTrialFiles={setTrialFiles}
          cardHeader={cardHeader}
          goalName={goalName}
          benchmark={benchmark}
          fileMetaData={fileMetaData}
          comments={editorState}
          handleComments={setEditorState}
          dateStarted={newTrial.dateStarted}
          dateStartedError={requestErrors.dateStarted}
          setTrial={setNewTrial}
        >
          {child}
        </TemplateFrame>
        <div className={"marg-bot"}>
          <Button icon={<CheckIcon/>} className={"marg-right"} onClick={createTrial} text="Submit Trial" isLoading={isLoading}/>
          <Button icon={<XIcon/>} className={"cancelButton"} onClick={goBack} text="Back to templates"/>
        </div>
      </ModalBody>
    )
  };
  
  const trialOptions = () => {
    switch(trialTemplate){
      case TEMPLATE_TYPES.SCORE_BASIC:
        return (
          tracking === null ? (
            <></>
            ) : (
              //todo - will probably need to update this labelError
              renderTemplate(
              `Create Basic Score Trial for ${studentName}`,
              `Create a Basic Score Trial`,
              <BasicScoreTrialForm
                trackingMeta={trackingMeta}
                labelError={requestErrors.tracking}
                updateTracks={setTrackingMeta}
              />
            )
          )
        )
      case TEMPLATE_TYPES.SCORE_BEST_OUT_OF:
        return renderTemplate(
          `Create Best Out Of Score Trial for ${studentName}`,
          `Create a Best Out Of Score Trial`,
          <BestOutOfTrialForm
            track={tracking}
            setTrack={(val) => setTracking(prev => ({...prev, ...val}))}
            error={requestErrors.tracking}
          />
        )
      default: return (
        <ModalBody
          header={`Create a trial for ${benchmark?.label} from these ${benchmark?.tracking} templates`}
          hideButtons
        >
          <TrialTemplateCards trackingType={benchmark.tracking} setTrialTemplate={setTrialTemplate}/>
        </ModalBody>
      )
    }
  };
  
  return (
    <Suspense fallback={<TemplateLoadingPlaceholder/>}>
      {trialOptions()}
    </Suspense>
  )
};


export default CreateTrial;