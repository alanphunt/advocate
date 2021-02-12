import React from "react";
import {CardColumnModel} from "utils/models";
import Column50 from "components/atoms/Column50";
import CardAndUploadColumn from "components/molecules/CardAndUploadColumn";
import ImmutableTextArea from "components/molecules/ImmutableTextArea";
import Section from "../atoms/Section";
import TextArea from "../molecules/TextArea";
import {convertFromRaw, EditorState} from "draft-js";
import FormElement from "../atoms/FormElement";
import {FaCalendarPlus as CalPlusIcon} from "react-icons/fa";

const TemplateFrame = ({children, dateStarted, setTrial, dateStartedError, comments, handleComments, trialFiles, setTrialFiles, fileMetaData, updateFileMetaData, cardHeader, goalName, benchmark}) => {
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
            <h3 className={"marg-bot"}>Trial Comments</h3>
            <TextArea
              editorState={typeof comments === "string" ? EditorState.createWithContent(convertFromRaw(JSON.parse(comments))) : comments}
              setEditorState={handleComments}
            />
          </Section>
        </Column50>
        <Column50>
          <CardAndUploadColumn
            header={cardHeader}
            object={new CardColumnModel(goalName, benchmark.label, <ImmutableTextArea rawData={benchmark.description}/>)}
            files={trialFiles}
            setFiles={setTrialFiles}
            fileMetaData={fileMetaData}
            updateFileMetaData={updateFileMetaData}
            apiPath={"/api/retrievedocument"}
          />
        </Column50>
      </div>
    </>
  );
};

export default TemplateFrame;
