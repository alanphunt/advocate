import React, {useState, useEffect} from "react";
import TextArea from "./TextArea";
import FormElement from "components/atoms/FormElement";
import Button from "components/atoms/Button";
import { FaCheck as CheckIcon, FaRegTimesCircle as ExitIcon } from "react-icons/fa";
import { EditorState, convertFromRaw } from 'draft-js';

/*
     props:

     state:

*/

const TextAreaForTable = ({focused, setFocused, placeholder, editorState, setEditorState, index}) => {
    const [initialState, setInitialState] = useState();
    useEffect(() => {
        try{
            if(typeof editorState === "string"){
                setInitialState(EditorState.createWithContent(convertFromRaw(JSON.parse(editorState))));
            }
            else{
                setInitialState(editorState);
            }
        }catch(e){console.log("failed to parse in TextAreaForTable");}
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [focused]);

    const handleCancel = () => {
        setEditorState(initialState);
        setFocused(-1);
    };

    const textPlaceholder = typeof editorState !== "string" && editorState.getCurrentContent().hasText() ? editorState.getCurrentContent().getPlainText().substring(0, 20) + " ..." : placeholder;

    return (
        focused ? (
            <div className={`table-textarea`}>
                <ExitIcon className={"modal-exit"} onClick={handleCancel}/>
                <div className="table-textarea__editor">
                    <TextArea
                        autoFocus
                        editorState={editorState}
                        setEditorState={setEditorState}
                    />
                </div>
                <Button icon={<CheckIcon/>} className="width-100" onClick={() => setFocused(-1)} text="Confirm"/>
            </div>
        ) : (
            <FormElement
                placeholder={textPlaceholder}
                onFocus={() => setFocused(index)}
            />
        )
    );
};

export default TextAreaForTable;
