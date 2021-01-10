import React, {useState, useEffect} from "react";
import { EditorState, convertFromRaw } from 'draft-js';
import ModalBody from "components/molecules/ModalBody";
import GoalForm from "components/molecules/GoalForm";
import {goalFormErrorModel} from "utils/models";

/*
     props:

     state:

*/

const EditGoal = ({goal, updateGoal, closeModal, editGoal}) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [editGoalFormErrors, setEditGoalFormErrors] = useState(goalFormErrorModel);

    useEffect(() => {
        setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(goal.goal))));
    }, []);

    return (
        <ModalBody
            header={`Edit goal '${goal.goalName}'`}
            cancelCallback={closeModal}
            confirmCallback={() => editGoal(setEditGoalFormErrors)}
        >
            <GoalForm formErrors={editGoalFormErrors} goal={goal} updateGoal={updateGoal} editorState={editorState} setEditorState={setEditorState}/>
        </ModalBody>
    );
};

export default EditGoal;
