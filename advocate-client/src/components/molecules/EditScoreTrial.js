import React, {useState} from "react";
import BasicScoreTrial from "components/molecules/BasicScoreTrial";
import TemplateFrame from "components/templates/TemplateFrame";
import Column50 from "components/atoms/Column50";
import CardAndUploadColumn from "./CardAndUploadColumn";
import ImmutableTextArea from "./ImmutableTextArea";
import {crudFetch, mapFileMetaDataToDocument, prepareEditorStateForRequest} from "utils/functions/functions";
import {FaCheck as CheckIcon} from "react-icons/fa";
import {SERVER_ERROR} from "utils/constants";
import {basicScoreTrialErrorsModel} from "utils/models";
import ConfirmOrCancelButtons from "./ConfirmOrCancelButtons";

const EditScoreTrial = ({closeModal, studentName, goalName, benchmark, mutableTrial, setMutableTrial, completeCrudOp}) => {
    const [trialFiles, setTrialFiles] = useState([]);
    const [requestErrors, setRequestErrors] = useState(basicScoreTrialErrorsModel);

    const editTrial = () => {
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
            error: (res) => setRequestErrors(res),
            serverError: () => alert(SERVER_ERROR)
        });
    };

    const mapMutableTrialData = () => {
        let fd = new FormData();

        fd.append("trial", JSON.stringify({
            ...mutableTrial,
            trackings: [],
            documents: [],
            trackingIds: [],
            documentIds: [],
            comments: prepareEditorStateForRequest(mutableTrial.comments)
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
                        handleComments={(newComments) => setMutableTrial(prev => ({...prev, comments: newComments.getCurrentContent()}))}
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
                        fileMetaData={mapFileMetaDataToDocument(trialFiles, [])}
                        setFiles={setTrialFiles}
                        apiPath={"/api/retrievedocument"}
                    />
                </Column50>
            </TemplateFrame>
            <ConfirmOrCancelButtons
                cancelCallback={closeModal}
                confirmCallback={editTrial}
            />
        </>
    );
};

export default EditScoreTrial;
