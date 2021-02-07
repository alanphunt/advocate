import React, {useEffect, useRef, useState} from "react";
import ModalBody from "components/molecules/ModalBody";
import GoalForm from "components/molecules/GoalForm";
import {goalFormErrorModel} from "utils/models";
import {crudFetch, formifyObject, prepareEditorStateForRequest,} from "utils/functions/functions";
import {FaCheck as CheckIcon} from "react-icons/fa";

/*
     props:

     state:

*/

const EditGoal = ({mutableGoal, setMutableGoal, closeModal, completeCrudOp, signout}) => {
    const [editGoalFormErrors, setEditGoalFormErrors] = useState(goalFormErrorModel);
    const scrollRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if(Object.values(editGoalFormErrors).some(err => err !== ""))
            scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [editGoalFormErrors]);

    const editGoal = () => {
        setIsLoading(true);
        let goalEditorState = mutableGoal.goal.getCurrentContent();

        crudFetch({
            path: "editgoal",
            method: "POST",
            body: formifyObject({
                ...mutableGoal,
                goal: goalEditorState.hasText() ? prepareEditorStateForRequest(goalEditorState) : "",
                benchmarks: JSON.stringify(mutableGoal.benchmarks.map(bm => {
                    let bmEditorState = bm.description.getCurrentContent();
                    return {
                        ...bm,
                        description: bmEditorState.hasText() ? prepareEditorStateForRequest(bmEditorState) : ""
                    }
                }))
            }),
            success: (data) => {setIsLoading(false); completeCrudOp(data, <><CheckIcon className="i-right"/>Successfully updated goal {mutableGoal.goalName}</>);},
            error: (data, headers, status) => {setIsLoading(false); setEditGoalFormErrors(data);},
            serverError: signout
        });
      };

    return (
        <ModalBody
            header={`Edit goal '${mutableGoal.goalName}'`}
            cancelCallback={closeModal}
            confirmCallback={editGoal}
            ref={scrollRef}
            isLoading={isLoading}
        >
            <GoalForm formErrors={editGoalFormErrors} mutableGoal={mutableGoal} setMutableGoal={setMutableGoal}/>
        </ModalBody>
    );
};

export default EditGoal;
