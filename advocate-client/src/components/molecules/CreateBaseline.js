import React, {useEffect, useState} from "react";
import Select from "components/atoms/Select";
import {templateOptionsModel, trialErrorsModel} from "utils/models";
import Section from "components/atoms/Section";
import TrialTemplateCards from "components/molecules/TrialTemplateCards";
import ConfirmOrCancelButtons from "components/molecules/ConfirmOrCancelButtons";
import {
  blobifyJson,
  crudFetch,
  mapFileMetaDataToDocument,
} from "utils/functions/functions";
import {FaRegHandPointRight as HandIcon} from "react-icons/fa";
import TemplateFrame from "components/templates/TemplateFrame";
import {Baseline, Tracking} from "utils/classes/ContextModels";
import {EditorState} from "draft-js";
import {legibleTemplate, TEMPLATE_TYPES} from "components/templates/TemplateList";
import BasicScoreTrialForm from "components/templates/score/basic-score/BasicScoreTrialForm";
import BestOutOfTrialForm from "components/templates/score/best-out-of/BestOutOfTrialForm";
import FormElement from "components/atoms/FormElement";
import {FaRegListAlt as LabelIcon} from "react-icons/fa"
import H3 from "../atoms/H3";


const CreateBaseline = ({closeModal, student, goal, completeCrudOp, isLoading, setIsLoading, signout}) => {
  const [trackingType, setTrackingType] = useState("");
  const [pageKey, setPageKey] = useState("start");
  
  const [baseline, setBaseline] = useState(new Baseline());
  const [tracking, setTracking] = useState(new Tracking());
  const [trackingMeta, setTrackingMeta] = useState([]);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [requestErrors, setRequestErrors] = useState(trialErrorsModel);
  const [trialFiles, setTrialFiles] = useState([]);
  
  let fileMetaData = mapFileMetaDataToDocument(trialFiles, []);
  
  const determineBaseline = () => {
    switch(baseline.baselineTemplate){
      case TEMPLATE_TYPES.SCORE_BASIC:
        return (
          <>
            <BasicScoreTrialForm
              labelError={requestErrors.tracking}
              updateTracks={setTrackingMeta}
              trackingMeta={trackingMeta}
            />
          </>
        );
      case TEMPLATE_TYPES.SCORE_BEST_OUT_OF:
        return (
          <>
            <BestOutOfTrialForm
              track={tracking}
              setTrack={(val) => setTracking(prev => ({...prev, ...val}))}
              error={requestErrors.tracking}
            />
          </>
        );
      default: return <></>
    }
  };
  
  const executeBaselineCreation = () => {
    setIsLoading({createBaseline: true});
    let fd = new FormData();
    for(let i = 0; i < trialFiles.length; i++){
      fd.append("documents", trialFiles[i]);
    }
    fd.append("baseline", blobifyJson({...baseline, tracking: {...tracking, trackingMeta: trackingMeta}}))
    crudFetch({
      path: "createbaseline",
      method: "POST",
      body: fd,
      success: (data) => completeCrudOp(data,`Successfully created baseline for ${student.name}!`),
      error: (errs) => {setIsLoading({"":false}); setRequestErrors(errs)},
      serverError: () => setIsLoading({"":false})
    })
  };
  
  const goBack = () => {
    setTrackingType("");
    setBaseline(new Baseline());
    setTracking(new Tracking());
    setTrackingMeta([]);
    setEditorState(EditorState.createEmpty());
    setRequestErrors(trialErrorsModel);
    setTrialFiles([]);
    setPageKey("start");
  };
  
  return (
    <div>
      {
        {
          start: (
            <>
              <Section>
                <Select
                  label={"Select a tracking type"}
                  value={trackingType}
                  mapping={templateOptionsModel}
                  onChange={(e) => setTrackingType(e.currentTarget.value)}
                  required
                  icon={<LabelIcon/>}
                />
              </Section>
              <Section>
                {
                  trackingType === "" ? (
                    <></>
                  ) : (
                    <>
                      <H3 classes={"i-bottom"}>Next, choose your tracking template</H3>
                      <TrialTemplateCards trackingType={trackingType} setTrialTemplate={(val) => setBaseline(prev => ({...prev, baselineTemplate: val}))}/>
                    </>
                  )
                }
              </Section>
              <Section>
                <ConfirmOrCancelButtons
                  confirmCallback={trackingType && baseline.baselineTemplate ? () => setPageKey("create") : null}
                  confirmText={"Next"}
                  confirmIcon={<HandIcon/>}
                  cancelCallback={closeModal}
                  isLoading={isLoading}
                />
              </Section>
            </>
          ),
          create: (
            <div>
              <TemplateFrame
                trialFiles={trialFiles}
                setTrialFiles={setTrialFiles}
                cardHeader={"Create a Baseline"}
                cardObject={{
                  "Student": student.name,
                  "Tracking Type": trackingType.substring(0,1).toUpperCase() + trackingType.substring(1),
                  "Template": legibleTemplate(baseline.baselineTemplate)
                }}
                fileMetaData={fileMetaData}
                setTrial={setBaseline}
                comments={editorState}
                handleComments={setEditorState}
                dateStarted={baseline.dateStarted}
                dateStartedError={requestErrors.dateStarted}
              >
                <Section>
                  <FormElement
                    value={baseline.label}
                    onChange={(e) => setBaseline(prev => ({...prev, label: e.currentTarget.value}))}
                    placeholder={"Baseline Label"}
                    label={"Label"}
                    errorMessage={requestErrors.label}
                    required
                    icon={<LabelIcon/>}
                  />
                </Section>
                {determineBaseline()}
              </TemplateFrame>
              <Section>
                <ConfirmOrCancelButtons
                  confirmCallback={executeBaselineCreation}
                  cancelCallback={goBack}
                  cancelText={"Go Back"}
                  isLoading={isLoading}
                />
              </Section>
            </div>
          )
        }[pageKey]
      }

    </div>
  );
};

export default CreateBaseline;
