import React from "react";
import TextArea from "./TextArea";
import { convertToRaw, EditorState, convertFromRaw } from 'draft-js';

/*
     props:

     state:

*/

const ImmutableTextArea = ({rawData}) => {
    return (
        <TextArea
            immutable={true}
            editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(rawData)))}
        />
    );
};

export default ImmutableTextArea;
