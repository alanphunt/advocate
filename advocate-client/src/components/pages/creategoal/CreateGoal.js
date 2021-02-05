import React, {useEffect, useRef, useState} from "react";
import {FaCheck as CheckIcon, FaRegHandPointRight as RedirectIcon, FaRegCopy as CopyIcon, FaUndo as NewGoalIcon, FaTimes as XIcon} from "react-icons/fa";
import GoalForm from "components/molecules/GoalForm";
import {
    BAD_REQUEST_STATUS,
    BASIC_STUDENT_TABLE_HEADERS,
    FORBIDDEN_STATUS,
    UNAUTHORIZED_STATUS
} from "utils/constants";
import Button from "components/atoms/Button";
import Section from "components/atoms/Section";
import {goalFormErrorModel, goalModel} from "utils/models";
import ModalBody from "components/molecules/ModalBody";
import {prepareEditorStateForRequest, formatStudentObject} from "utils/functions/functions";
import TableAccordionGroup from "components/molecules/table/TableAccordionGroup";

const CreateGoal = ({student, completeCrudOp, classrooms, students, setStudentId, signout, closeModal}) => {
    const { id, name } = student;
    const [goal, setGoal] = useState({...goalModel, studentId: id});
    const [formErrors, setFormErrors] = useState(goalFormErrorModel);
    const [displayTable, setDisplayTable] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if(Object.values(formErrors).some(err => err !== ""))
            scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [formErrors]);

    const createGoal = (callback) => {
        let fd = new FormData();

        Object.keys(goal).forEach(goalKey => {
            if(goalKey === "benchmarks")
                fd.append("benchmarks", JSON.stringify(goal.benchmarks.map(bm => {
                    let editorState = bm.description.getCurrentContent();
                    return {...bm, description: editorState.hasText() ? prepareEditorStateForRequest(editorState) : ""}
                })))
            else if (goalKey === "goal") {
                let goalEditorState = goal.goal.getCurrentContent();
                fd.append("goal", goalEditorState.hasText() ? prepareEditorStateForRequest(goalEditorState) : "");
            }
            else
                fd.append(goalKey, goal[goalKey]);
        })

        fetch("/api/creategoal", {method: "POST", body: fd})
            .then(response => Promise.all([response.ok, response.ok ? response.json() : response.text(), response.status]))
            .then(([ok, data, status]) => {
                if(ok){
                    completeCrudOp(data, <><CheckIcon className="i-right"/>Successfully created goal for {name}!</>, !!callback);
                    if(callback)
                        callback();
                }
                else if(status === BAD_REQUEST_STATUS)
                    setFormErrors(JSON.parse(data));
                else if(status === FORBIDDEN_STATUS || status === UNAUTHORIZED_STATUS)
                    signout();
        });
    };

    const createNewGoalForNewStudent = () => {
        setGoal({...goalModel});
        setDisplayTable(true);
    };

    const handleStudentSelect = (student) => {
        setStudentId(student.id);
        setGoal(prev => ({...prev, studentId: student.id}))
        setDisplayTable(false);
    };

    const modalHeader = goal.studentId && displayTable ? `Copy goal to ...` : goal.studentId && !displayTable ? `Create goal for ${name}` : `Create goal for ...`;

    return (
        <ModalBody
            header={modalHeader}
            hideButtons
            ref={scrollRef}
        >
            {
                displayTable ? (
                    <>
                        <Section>
                            <TableAccordionGroup
                                accordionHeaders={Object.values(classrooms).map(cr => cr.className)}
                                tableData={Object.values(classrooms).map(cr => formatStudentObject(Object.values(students).filter(stu => stu.classroomId === cr.id)))}
                                tableHeaders={BASIC_STUDENT_TABLE_HEADERS}
                                allOpen
                                selectedCallback={handleStudentSelect}
                            />
                        </Section>
                    </>
                ) : (
                    <>
                        <div>
                            <GoalForm mutableGoal={goal} setMutableGoal={setGoal} formErrors={formErrors} studentId={id}/>
                            <div className="creategoalbuttons width-50">
                                <Button className={"marg-bot"} text={"Confirm and Return to Goal center"} icon={<RedirectIcon/>} onClick={() => createGoal(null)}/>
                                <Button className={"marg-bot"} text={"Confirm and Apply Goal to New Student"} icon={<CopyIcon/>} onClick={() => createGoal(() => setDisplayTable(true))}/>
                                <Button className={"marg-bot"} text={"Confirm and Create New Goal for New Student"} icon={<NewGoalIcon/>} onClick={() => createGoal(createNewGoalForNewStudent)}/>
                                <Button className={"cancelButton"} text={"Cancel"} icon={<XIcon/>} onClick={closeModal}/>
                            </div>
                        </div>
                    </>
                )
            }
        </ModalBody>
    )
};

export default CreateGoal;