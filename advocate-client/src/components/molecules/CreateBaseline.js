import React, {useEffect, useState} from "react";
import Select from "components/atoms/Select";
import {templateOptionsModel, baselineErrorsModel} from "utils/models";
import Section from "components/atoms/Section";
import TrialTemplateCards from "components/molecules/TrialTemplateCards";
import ConfirmOrCancelButtons from "components/molecules/ConfirmOrCancelButtons";
import {
  crudFetch,
  formifyObject,
  mapFileMetaDataToDocument,
  prepareEditorStateForRequest
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


const CreateBaseline = ({closeModal, student, goal, completeCrudOp, isLoading, setIsLoading, signout}) => {
  const [trackingType, setTrackingType] = useState("");
  const [pageKey, setPageKey] = useState("start");
  
  const [baseline, setBaseline] = useState(new Baseline());
  const [trackings, setTrackings] = useState(new Tracking());
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [requestErrors, setRequestErrors] = useState(baselineErrorsModel);
  const [trialFiles, setTrialFiles] = useState([]);
  
  useEffect(() => {
    if(!trackingType)
      setBaseline(prev => ({...prev, baselineTemplate: ""}))
  }, [trackingType]);
  
  useEffect(() => {
    if(baseline.baselineTemplate) {
      if (baseline.baselineTemplate === TEMPLATE_TYPES.SCORE_BASIC)
        setTrackings([]);
    }
  }, [baseline.baselineTemplate]);
  
  let fileMetaData = mapFileMetaDataToDocument(trialFiles, []);
  
  const determineBaseline = () => {
    switch(baseline.baselineTemplate){
      case TEMPLATE_TYPES.SCORE_BASIC:
        return (
          <>
            <BasicScoreTrialForm
              trackings={trackings}
              labelError={requestErrors.label}
              updateTracks={setTrackings}
            />
          </>
        );
      case TEMPLATE_TYPES.SCORE_BEST_OUT_OF:
        return (
          <>
            <BestOutOfTrialForm
              track={trackings}
              setTrack={(val) => setTrackings(prev => ({...prev, ...val}))}
              error={requestErrors.bestOutOf}
            />
          </>
        );
      default: return <></>
    }
  };
  
  const executeBaselineCreation = () => {
    setIsLoading({createBaseline: true});
    let fd = formifyObject({
      "startDate": baseline.dateStarted,
      "label": baseline.label,
      "trackings": JSON.stringify(trackings),
      baseline: JSON.stringify({
        "comments": prepareEditorStateForRequest(editorState.getCurrentContent()),
        "documents": fileMetaData,
        "studentId": student.id,
        "baselineTemplate": baseline.baselineTemplate
      })
    });
    for(let i = 0; i < trialFiles.length; i++){
      fd.append("documents", trialFiles[i]);
    }
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
                      <h3 className={"i-bottom"}>Next, choose your tracking template</h3>
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
                    errorMessage={requestErrors.baselineLabel}
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
