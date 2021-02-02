import Section from "components/atoms/Section";
import React from "react";
import DropFile from "components/molecules/DropFile";

const CardAndUploadColumn = ({object, header, hideFileUpload, files, setFiles, fileMetaData, updateFileMetaData, apiPath}) => {

    return (
        <div className="card-uploader-column">
            <Section>
                <div className={"infocardwrapper"}>
                    <h3 className={"marg-bot"}>{header || "header"}</h3>
                    {
                        Object.keys(object).map((key, index) => {
                            return (
                                typeof object[key] === "string"
                                    ? <p key={`infocard-${index}`}><strong>{key}: </strong>{object[key]}</p>
                                    : <div key={`infocard-description-${index}`}><p><strong>{key}: </strong></p>{object[key]}</div>
                            )
                        })
                    }
                </div>
            </Section>
            {
                hideFileUpload ? (
                    <></>
                ) : (
                    <DropFile files={files} setFiles={setFiles} fileMetaData={fileMetaData} apiPath={apiPath} updateFileMetaData={updateFileMetaData}/>
                )
            }
        </div>
    );
};

export default CardAndUploadColumn;
