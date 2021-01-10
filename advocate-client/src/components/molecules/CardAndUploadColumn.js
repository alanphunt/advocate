import Section from "components/atoms/Section";
import React from "react";
import DropFile from "components/molecules/DropFile";
/*
     props:

     state:

*/

const CardAndUploadColumn = ({object, header, hideFileUpload, files, setFiles, fileMetaData, apiPath}) => {
    

    return (
        <div className="card-uploader-column">
            <Section>
                <div className={"infocardwrapper"}>
                    <h3 className={"marg-bot"}>{header || "header"}</h3>
                    {
                        Object.keys(object).map(key => <p key={`infocard-${key}`}><strong>{key}: </strong>{object[key]}</p>)
                    }
                </div>
            </Section>
            {
                hideFileUpload ? (
                    <></>
                ) : (
                    <DropFile files={files} setFiles={setFiles} fileMetaData={fileMetaData} apiPath={apiPath}/>
                )
            }
        </div>
    );
};

export default CardAndUploadColumn;
