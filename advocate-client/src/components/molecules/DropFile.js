import React, {useState} from "react";
import FormElement from "components/atoms/FormElement";
import FileChip from "components/atoms/FileChip";
import { convertFileSize, generateFilePreview, fileFetch } from "utils/functions/functions";
import {FaPlus as PlusIcon} from "react-icons/fa";
import {FILE_UPLOAD_LIMIT, SERVER_ERROR} from "utils/constants";
import ErrorLabel from "components/atoms/ErrorLabel";

/*
     props:

     state:

*/

const DropFile = ({files, fileMetaData, setFiles, apiPath}) => {
        
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(-1);

    const totalFileSize = () => {
        let accumulator = 0;
        accumulator += files.map(f => f.size).reduce((acc, file) => acc + file)
        if(accumulator > FILE_UPLOAD_LIMIT)

            return formatFile(accumulator)
    };

    const handleFilesUpload = (event) => {
        if(error)
            setError("");  
        let uploadedFiles = event.target.files;
        let fileList = [...files];
        let totalSize = 0;

        for(let i = 0; i < uploadedFiles.length; i++){
            if(fileMetaData.map(f => {
                totalSize += f.size;
                return f.name
                }).includes(uploadedFiles.item(i).name)
            || files.map(f => f.name).includes(uploadedFiles.item(i).name)){
                setError("Cannot upload files with duplicate names.")
            }else{
                let file = uploadedFiles.item(i);
                totalSize += file.size;
                if(totalSize/1024/1000 < FILE_UPLOAD_LIMIT)
                    fileList.push(file);
                else
                    setError("Maximum upload limit of 15 MB exceeded.")
            }
        }

        setFiles(fileList, "file");
    };

    const handleFileAsyncRetrieval = ({path, name, type}, action, index) => {        
        setIsLoading(index);
        fileFetch(apiPath, {path, name, type}, action, () => setIsLoading(-1), (res) => setError(res.error), () => {alert(SERVER_ERROR);setIsLoading(-1)});
    };

    const handleUploadedFileAction = (file, action, index) => {
        setIsLoading(index);
        generateFilePreview(file, file.type, file.name, action);
        setIsLoading(-1);
    };

    const formatFile = (bytes) => {
        return (bytes/1024/1000).toFixed(2);
    };

    const removeFile = (index, type) => {
        let arr = (type === "file" ? [...files] : [...fileMetaData]);
        arr.splice(index, 1);
        setFiles(arr, type);
        if(error)
            setError("");  
    };

    return(
        <div className="dropfile">
            <FormElement
                id="dropfile-input"
                type="file"
                multiple
                placeholder="Choose files"
                accept="image/*,.pdf,.doc,.docx,.txt,.xls,.xlsx,.csv,.html,.htm"
                onChange={handleFilesUpload}
            />
            <div className="dropfile__inner">
                <label htmlFor={"dropfile-input"} className={"dropfile__label"}>
                    <div className="dropfile__text"><p>Click here to attach a document</p><p><PlusIcon/></p></div>
                </label>
                {
                    files.length || fileMetaData.length || error ?
                    <div className="dropfile__inner__filechip">
                        <div className="filechip-size">
                            {files.length ? <p>{totalFileSize()} MB / {FILE_UPLOAD_LIMIT} MB Upload Limit</p> : <></>}
                            
                            {error ? <ErrorLabel text={error}/> : <></>}
                        </div>
                        {
                            fileMetaData.length ? (
                                <div className="filechip-wrapper">
                                    {
                                        fileMetaData.filter(meta => meta.id).map((fileMeta, index) => {
                                            return <FileChip
                                                key={`filechip-${fileMeta.name}`}
                                                text={`${fileMeta.name} - ${convertFileSize(fileMeta.size)}`}
                                                onDelete={() => removeFile(index, "metaData")}
                                                onPreview={() => handleFileAsyncRetrieval(fileMeta, "preview", index)}
                                                onDownload={() => handleFileAsyncRetrieval(fileMeta, "download", index)}
                                                isLoading={isLoading === index}
                                            />
                                        })
                                    }
                                    {
                                        files.map((file, index) => {
                                            return <FileChip
                                                isNewFile={true}
                                                key={`filechipnew-${file.name}`}
                                                text={`${file.name} - ${convertFileSize(file.size)}`}
                                                onDelete={() => removeFile(index, "file")}
                                                onPreview={() => handleUploadedFileAction(files[index], "preview", index)}
                                                onDownload={() => handleUploadedFileAction(files[index], "download", index)}
                                                isLoading={isLoading === index}
                                            />
                                        })
                                    }
                                </div>
                            ) : <></>
                        }
                    </div>
                    : <></>
                }
            </div>
        </div>
    );
};

export default DropFile;
