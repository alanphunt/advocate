import React from "react";
import TextArea from "./TextArea";
import { EditorState, convertFromRaw } from 'draft-js';
import Box from "../atoms/Box";

/*
     props:

     state:

*/

const ImmutableTextArea = ({rawData}) => {
    let data = EditorState.createWithContent(convertFromRaw(JSON.parse(rawData)));
    return (
        data.getCurrentContent().hasText() ? (
            <TextArea
                immutable={true}
                editorState={data}
            />
        ) : (<Box text={"No text."}/>)
    );
};

export default ImmutableTextArea;
