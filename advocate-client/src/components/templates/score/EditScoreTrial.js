import React, {useState} from "react";
import BasicScoreTrial from "components/templates/score/BasicScoreTrialForm";
import TemplateFrame from "components/templates/TemplateFrame";
import Column50 from "components/atoms/Column50";
import CardAndUploadColumn from "components/molecules/CardAndUploadColumn";
import ImmutableTextArea from "components/molecules/ImmutableTextArea";
import {crudFetch, mapFileMetaDataToDocument, prepareEditorStateForRequest} from "utils/functions/functions";
import {FaCheck as CheckIcon} from "react-icons/fa";
import {SERVER_ERROR} from "utils/constants";
import {basicScoreTrialErrorsModel} from "utils/models";
import ConfirmOrCancelButtons from "components/molecules/ConfirmOrCancelButtons";

const EditScoreTrial = ({closeModal, studentName, goalName, benchmark, mutableTrial, setMutableTrial, completeCrudOp, isLoading, setIsLoading}) => {
    const [trialFiles, setTrialFiles] = useState([]);
    const [requestErrors, setRequestErrors] = useState(basicScoreTrialErrorsModel);

    const editTrial = () => {
        setIsLoading({"editScoreTrial": true});
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
            error: (res) => {setIsLoading({"":false}); setRequestErrors(res)},
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
        fd.append("documentMeta", JSON.stringify(mutableTrial.documents));
        return fd;
    };

    return (
        <>
            <TemplateFrame>
                <Column50>
                    <BasicScoreTrial
                        trial={mutableTrial}
                        setTrial={setMutableTrial}
                        trackings={mutableTrial.trackings}
                        errors={requestErrors}
                        comments={mutableTrial.comments}
                        updateTracks={(newTracks) => setMutableTrial(prev => ({...prev, trackings: newTracks}))}
                        handleComments={(newComments) => setMutableTrial(prev => ({...prev, comments: newComments}))}
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
                        fileMetaData={mapFileMetaDataToDocument(trialFiles, mutableTrial.documents)}
                        updateFileMetaData={updatedMeta => setMutableTrial(prev => ({...prev, documents: [...updatedMeta]}))}
                        apiPath={"/api/retrievedocument"}
                    />
                </Column50>
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
