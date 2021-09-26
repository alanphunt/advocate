import React from "react";
import {CardColumnModel} from "utils/models";
import Column50 from "components/atoms/Column50";
import CardAndUploadColumn from "components/molecules/CardAndUploadColumn";
import ImmutableTextArea from "components/molecules/ImmutableTextArea";
import Section from "components/atoms/Section";
import TextArea from "components/molecules/TextArea";
import {convertFromRaw, EditorState} from "draft-js";
import FormElement from "components/atoms/FormElement";
import {FaCalendarPlus as CalPlusIcon} from "react-icons/fa";
import H3 from "../atoms/H3";

const TemplateFrame = ({
  children,
  dateStarted,
  setTrial,
  dateStartedError,
  comments,
  handleComments,
  trialFiles,
  setTrialFiles,
  fileMetaData,
  updateFileMetaData,
  cardHeader,
  goalName,
  benchmark,
  hideCard,
  hideFileUpload,
  cardObject
}) => {
  
  return (
    <>
      <div className={"display"}>
        <Column50>
          <Section>
            <FormElement
              label={"Start Date"}
              icon={<CalPlusIcon/>}
              placeholder={"MM/DD/YY"}
              value={dateStarted}
              onChange={(e) => setTrial(prev => ({...prev, dateStarted: e.currentTarget.value}))}
              errorMessage={dateStartedError}
              required
              autoFocus
            />
          </Section>
  
          {children}
          
          <Section>
            <H3 classes={"i-bottom"}>Comments</H3>
            <TextArea
              editorState={typeof comments === "string" ? EditorState.createWithContent(convertFromRaw(JSON.parse(comments))) : comments}
              setEditorState={handleComments}
            />
          </Section>
        </Column50>
        <Column50>
          <CardAndUploadColumn
            header={cardHeader}
            object={hideCard ? null : cardObject ? cardObject : new CardColumnModel(goalName, benchmark.label, <ImmutableTextArea rawData={benchmark.description}/>)}
            files={trialFiles}
            setFiles={setTrialFiles}
            fileMetaData={fileMetaData}
            updateFileMetaData={updateFileMetaData}
            apiPath={"/api/retrievedocument"}
            hideCard={hideCard}
            hideFileUpload={hideFileUpload}
          />
        </Column50>
      </div>
    </>
  );
};

export default TemplateFrame;
