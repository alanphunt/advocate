import React, {useState, useEffect} from 'react';
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, EditorState, convertFromRaw } from 'draft-js';
import { JSON_HEADER } from 'utils/constants';

/*
    Props:
        
    State:
        
*/
const Test = ({teacher, updateTeacher, logout}) => {

    const [editorState, setEditorState] = useState(null);
    const contentState = editorState?.getCurrentContent();

    useEffect(() => {
        setEditorState(teacher.description ? EditorState.createWithContent(convertFromRaw(JSON.parse(teacher.description))) : EditorState.createEmpty())
        return () => {
        }
    }, [])

    const toolbarOptions = {
        options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'emoji', 'remove', 'history']
    };

    const save = () => {
        const obj = JSON.stringify({
            trialComment: JSON.stringify(convertToRaw(contentState))
        });


        fetch("/api/savecomment", {body: obj, method: "POST", headers: JSON_HEADER})
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
        })
    };

    return(
        <div>

                <Editor
                    editorState={editorState}
                    onEditorStateChange={setEditorState}
                    toolbarClassName="toolbar"
                    wrapperClassName=""
                    editorClassName="text-area"
                    toolbar={toolbarOptions}
                />

        <button onClick={save}>save comment</button>
        </div>
    );
};

export default Test;