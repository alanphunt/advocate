import React, {useState} from "react";
import {FaCheck as CheckIcon, FaRegHandPointRight as RedirectIcon, FaRegCopy as CopyIcon, FaUndo as NewGoalIcon} from "react-icons/fa";
import GoalForm from "components/molecules/GoalForm";
import {BAD_REQUEST_STATUS} from "utils/constants";
import Button from "components/atoms/Button";
import Section from "components/atoms/Section";
import {goalFormErrorModel, goalModel} from "utils/models";
import ModalBody from "components/molecules/ModalBody";
import { convertToRaw, EditorState } from 'draft-js';

const CreateGoal = ({studentId, studentName, cleanupCrudOp}) => {
    const [goal, setGoal] = useState({...goalModel, studentId: studentId});
    const [formErrors, setFormErrors] = useState(goalFormErrorModel);
    const [displayTable, setDisplayTable] = useState(false);
    const [modalHeader, setModalHeader] = useState(`Create goal for ${studentName}`);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const handleSelected = (stu, stuIndex, crInd) => {
        setGoal({...goal, studentId: stu.id});
        setModalHeader(`Create goal for ${stu.name}`)
    };

    const createGoal = () => {
        const fd = new FormData();

        Object.keys(goal).forEach(key => {
            if(key === "goal")
                fd.append(key, JSON.stringify(convertToRaw(editorState.getCurrentContent())))
            else
                fd.append(key, (key === "benchmarks" ? JSON.stringify(goal[key]) : goal[key]));
        });
        fetch("/api/creategoal", {method: "POST", body: fd})
            .then(response => Promise.all([response.ok, response.ok ? response.json() : response.text(), response.status]))
            .then(([ok, data, status]) => {
                if(ok){
                    cleanupCrudOp(data, <><CheckIcon className="i-right"/>Successfully created goal for {studentName}!</>);
                }
                else if(status === BAD_REQUEST_STATUS)
                    setFormErrors(JSON.parse(data));
                //else
                    //signout();
                
        });
    };

    const resetState = () => {
        setGoal({...goalModel, studentId: studentId});
        formErrors(goalFormErrorModel);
    };

    const copyGoalToNewStudent = () => {
        setDisplayTable(true);
    };

    const createNewGoal = () => {
        setDisplayTable(true);
        resetState();
    };

    return (
        <ModalBody
            header={modalHeader}
            hideButtons
        >
            {
                displayTable ? (
                    <>
                        <Section>
                            <h3 className={"i-bottom"}>Select a student</h3>
                        </Section>
                    </>
                ) : (
                    <>
                        <div>
                            <GoalForm goal={goal} updateGoal={setGoal} formErrors={formErrors} editorState={editorState} setEditorState={setEditorState}/>
                            <div className="creategoalbuttons width-50">
                                <Button className={"marg-bot"} text={"Confirm and Return to Goal center"} icon={<RedirectIcon className={"i-right"}/>} onClick={createGoal}/>
                                <Button className={"marg-bot"} text={"Confirm and Apply Goal to New Student"} icon={<CopyIcon className={"i-right"}/>} onClick={copyGoalToNewStudent}/>
                                <Button text={"Confirm and Create New Goal for New Student"} icon={<NewGoalIcon className={"i-right"}/>} onClick={createNewGoal}/>
                            </div >
                        </div>
                    </>
                )
            }
        </ModalBody>
    )
};

export default CreateGoal;