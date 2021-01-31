import React, {useState} from "react";
import BasicScoreTrial from "components/molecules/BasicScoreTrial";
import {Trial} from "utils/classes/ContextModels";
import TemplateFrame from "components/templates/TemplateFrame";
import Column50 from "components/atoms/Column50";
import CardAndUploadColumn from "./CardAndUploadColumn";
import ImmutableTextArea from "./ImmutableTextArea";
import {EditorState} from "draft-js";
import {basicScoreTrialErrorsModel} from "utils/models";
import {
    crudFetch,
    formifyObject,
    mapFileMetaDataToDocument,
    prepareEditorStateForRequest
} from "utils/functions/functions";
import {FaCheck as CheckIcon, FaTimes as XIcon} from "react-icons/fa";
import {SERVER_ERROR} from "utils/constants";
import Button from "components/atoms/Button";

const CreateScoreTrial = ({goBack, completeCrudOp, studentName, goalName, benchmark}) => {
    const [newTrial, setNewTrial] = useState(new Trial());
    const [trackings, setTrackings] = useState([]);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [requestErrors, setRequestErrors] = useState(basicScoreTrialErrorsModel);
    const [trialFiles, setTrialFiles] = useState([]);

    let documentMeta = mapFileMetaDataToDocument(trialFiles, []);

    const createTrial = () => {
        const trialNumber = benchmark.trialIds.length + 1;
        let formData = formifyObject({
            "dateStarted": newTrial.dateStarted || "",
            "comments": prepareEditorStateForRequest(editorState.getCurrentContent()),
            "trialNumber": trialNumber,
            "trackings": JSON.stringify(trackings),
            "benchmarkId": benchmark.id,
            "documentMeta": JSON.stringify(documentMeta)
        });

        for(let i = 0; i < trialFiles.length; i++){
            formData.append("documents", trialFiles[i]);
        }

        crudFetch({
            path: "createtrial",
            method: "POST",
            body: formData,
            success: (data) => completeCrudOp(data, <><CheckIcon className="i-right"/>Successfully created Score Trial #{trialNumber}!</>),
            error: (res) => setRequestErrors(res),
            serverError: () => alert(SERVER_ERROR)
        });
    };

    return (
        <>
            <TemplateFrame>
                <Column50>
                    <BasicScoreTrial
                        trial={newTrial}
                        setTrial={setNewTrial}
                        trackings={trackings}
                        updateTracks={setTrackings}
                        errors={requestErrors}
                        comments={editorState}
                        handleComments={setEditorState}
                    />
                </Column50>
                <Column50>
                    <CardAndUploadColumn
                        header={`Basic Score Trial for ${studentName}`}
                        object={{
                            Goal: goalName,
                            Benchmark: benchmark.label,
                            "Benchmark Description": <ImmutableTextArea rawData={benchmark.description}/>
                        }}
                        files={trialFiles}
                        setFiles={setTrialFiles}
                        fileMetaData={documentMeta}
                        apiPath={"/api/retrievedocument"}
                    />
                </Column50>
            </TemplateFrame>
            <div className={"marg-bot"}>
                <Button icon={<CheckIcon/>} className={"marg-right"} onClick={createTrial} text="Submit Trial"/>
                <Button icon={<XIcon/>} className={"cancelButton"} onClick={goBack} text="Back to templates"/>
            </div>
        </>
    );
};

export default CreateScoreTrial;
