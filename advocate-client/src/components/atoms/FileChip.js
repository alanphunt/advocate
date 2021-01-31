import React, {useState, useEffect} from "react";
import {FaRegTrashAlt as TrashIcon, FaRegEye as PreviewIcon,  FaRegArrowAltCircleDown as DownloadIcon} from "react-icons/fa";
import LoadingIcon from "components/atoms/LoadingIcon";
/*
     props:

     state:

*/

const FileChip = ({text, onDelete, onPreview, onDownload, isNewFile, isLoading}) => {
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        if(isLoading && hovered)
            setHovered(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hovered])

    return (
        <div className="filechip" onMouseOver={() => setHovered(true)} onMouseOut={() => setHovered(false)}>
            <div className={`filechip__text${isNewFile ? " border-green" : ""}`}>
                {
                    isLoading 
                    ? <LoadingIcon/> 
                    : 
                    <div className={`filechip__icons ${hovered ? ' display-centered' : ''}${isLoading ? '' : ''}`}>
                        {onDelete ? <TrashIcon onClick={onDelete} className="marg-right"/> : <></>}
                        <PreviewIcon onClick={onPreview} className="marg-right"/>
                        <DownloadIcon onClick={onDownload}/>
                    </div>
                }
                    <span className={isLoading ? "hidden" : ""}>{text}</span>
            </div>
        </div>
    );
};

export default FileChip;
