import React, {useState} from "react";
import FileChip from "components/atoms/FileChip";
import {convertFileSize, fileFetch} from "utils/functions/functions";
import Box from "components/atoms/Box";

/*
  props:
  state:
*/
const FileChipWrapper = ({fileMeta}) => {
  const [chipIndex, setChipIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  
  const completeRetrieval = () => {
    setIsLoading(false);
    setChipIndex(-1);
  };
  
  const handleFileAction = (file, action, index) => {
    setChipIndex(index);
    setIsLoading(true);
    fileFetch("/api/retrievedocument", file, action, () => {}, () => {}, completeRetrieval)
  };
  
  return (
    <div className="filechip-wrapper">
      {
        fileMeta?.length ? (
          fileMeta.map((file, index) => {
            return <FileChip
              key={`filechip-${file.name}`}
              text={`${file.name} - ${convertFileSize(file.size)}`}
              onPreview={() => handleFileAction(file, "preview", index)}
              onDownload={() => handleFileAction(file, "download", index)}
              isLoading={index === chipIndex && isLoading}
            />
          })
        ) : <Box text={"No documents."}/>
      }
    </div>
  );
};

export default FileChipWrapper;
