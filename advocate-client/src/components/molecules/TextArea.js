import React from "react";
import { Editor } from "react-draft-wysiwyg";

/*
     props:

     state:

*/

const TextArea = ({editorState, setEditorState, immutable}) => {
    const toolbarOptions = {
        options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'emoji', 'remove', 'history']
    };

    return (
        <div className={"textarea-wrapper"}>
            <Editor
                editorState={editorState}
                onEditorStateChange={setEditorState || null}
                toolbarClassName="toolbar"
                wrapperClassName=""
                editorClassName={`text-area${immutable ? ' immutable-text-area' : ""}`}
                toolbar={toolbarOptions}
                toolbarHidden={immutable || false}
            />
        </div>
    );
};

export default TextArea;
