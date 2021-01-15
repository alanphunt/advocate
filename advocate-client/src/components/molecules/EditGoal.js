import React, {useState} from "react";
import ModalBody from "components/molecules/ModalBody";
import GoalForm from "components/molecules/GoalForm";
import {goalFormErrorModel} from "utils/models";
import {crudFetch, formifyObject, prepareEditorStateForRequest,} from "utils/functions/functions";
import {FaCheck as CheckIcon} from "react-icons/fa";
import {SERVER_ERROR} from "utils/constants";
/*
     props:

     state:

*/

const EditGoal = ({mutableGoal, setMutableGoal, closeModal, completeCrudOp}) => {
    const [editGoalFormErrors, setEditGoalFormErrors] = useState(goalFormErrorModel);
/* 
    useEffect(() => {
        setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(goal.goal))));
         let parsedBenchmarks = goal.benchmarks.map(bm =>{
            return {...bm, description: EditorState.createWithContent(convertFromRaw(JSON.parse(bm.description)))}
        });
        setMutableGoal({...goal, benchmarks: parsedBenchmarks}); 
    }, []); */

  
    const editGoal = () => {
        crudFetch({
            path: "editgoal",
            method: "POST",
            body: formifyObject({
                ...mutableGoal, 
                goal: prepareEditorStateForRequest(mutableGoal?.goal),
                benchmarks: JSON.stringify(mutableGoal?.benchmarks.map(bm => prepareEditorStateForRequest(bm.description)))
            }),
            success: (data) => completeCrudOp(data, <><CheckIcon className="i-right"/>Successfully updated goal {mutableGoal?.goalName}</>),
            error: (data, headers, status) => setEditGoalFormErrors(data),
            serverError: () => alert(SERVER_ERROR)
        });
      };

    return (
        <ModalBody
            header={`Edit goal '${mutableGoal?.goalName}'`}
            cancelCallback={closeModal}
            confirmCallback={editGoal}
        >
            <GoalForm formErrors={editGoalFormErrors} mutableGoal={mutableGoal} setMutableGoal={setMutableGoal}/>
        </ModalBody>
    );
};

export default EditGoal;
