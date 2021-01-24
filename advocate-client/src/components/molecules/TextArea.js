import React, {useRef, useEffect} from "react";
import { Editor } from "react-draft-wysiwyg";

/*
     props:

     state:

*/

const TextArea = ({editorState, setEditorState, immutable, autoFocus}) => {
    const toolbarOptions = {
        options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'emoji', 'remove', 'history']
    };
    const innerRef = useRef()
    
    useEffect(() => {
        if(autoFocus)
            innerRef.current.focusEditor();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                ref={innerRef}
            />
        </div>
    );
};

export default TextArea;
