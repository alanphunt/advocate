import React, {useState, useEffect} from "react";
import {FaCheck as CheckIcon, FaRegHandPointRight as RedirectIcon, FaRegCopy as CopyIcon, FaUndo as NewGoalIcon} from "react-icons/fa";
import GoalForm from "components/molecules/GoalForm";
import {BAD_REQUEST_STATUS, BASIC_STUDENT_TABLE_HEADERS} from "utils/constants";
import Button from "components/atoms/Button";
import Section from "components/atoms/Section";
import {goalFormErrorModel, goalModel} from "utils/models";
import ModalBody from "components/molecules/ModalBody";
import {prepareEditorStateForRequest, formatStudentObject} from "utils/functions/functions";
import TableAccordionGroup from "components/molecules/TableAccordionGroup";

const CreateGoal = ({studentId, initialStudentName, completeCrudOp, teacher, setStudentIndex}) => {
    const [goal, setGoal] = useState({...goalModel, studentId: studentId});
    const [formErrors, setFormErrors] = useState(null);
    const [displayTable, setDisplayTable] = useState(false);
    const [studentName, setStudentName] = useState(null);
    useEffect(() => {
        if(!formErrors){
            setDisplayTable(true);
        }
    }, [teacher])

    const createGoal = (preventClose = false) => {
        const fd = new FormData();

        Object.keys(goal).forEach(key => {
            if(key === "goal")
                fd.append(key, prepareEditorStateForRequest(goal.goal.getCurrentContent()))
            else if(key === "benchmarks"){
                fd.append(key, JSON.stringify(goal[key].map(bm => ({...bm, description: prepareEditorStateForRequest(bm.description.getCurrentContent())}))))
            }
            else
                fd.append(key, goal[key]);
        });
        fetch("/api/creategoal", {method: "POST", body: fd})
            .then(response => Promise.all([response.ok, response.ok ? response.json() : response.text(), response.status]))
            .then(([ok, data, status]) => {
                if(ok){
                    completeCrudOp(data, <><CheckIcon className="i-right"/>Successfully created goal for {studentName || initialStudentName}!</>, preventClose);
                }
                else if(status === BAD_REQUEST_STATUS)
                    setFormErrors(JSON.parse(data));
                //else
                    //signout();
                
        });
    };

    const completeGoal = () => {
        if(!formErrors){
            setFormErrors(null);
            setDisplayTable(true);
        }
    };

    const createNewGoalForNewStudent = () => {
        completeGoal();
        setGoal({...goalModel});
    };

    const handleStudentSelect = (student) => {
        setStudentName(student.name);
        setGoal(prev => ({...prev, studentId: student.id}))
        setDisplayTable(false);
    };


    return (
        <ModalBody
            header={`Create goal for ${ displayTable ? '...' : studentName || initialStudentName}`}
            hideButtons
        >
            {
                displayTable ? (
                    <>
                        <Section>
                            <TableAccordionGroup
                                accordionHeaders={teacher.classrooms.map(cr => cr.className)}
                                tableData={teacher.classrooms.map(cr => formatStudentObject(cr.students))}
                                tableHeaders={BASIC_STUDENT_TABLE_HEADERS}
                                allOpen
                                selectedRowCallback={handleStudentSelect}
                            />
                        </Section>
                    </>
                ) : (
                    <>
                        <div>
                            <GoalForm mutableGoal={goal} setMutableGoal={setGoal} formErrors={formErrors} studentId={studentId}/>
                            <div className="creategoalbuttons width-50">
                                <Button className={"marg-bot"} text={"Confirm and Return to Goal center"} icon={<RedirectIcon className={"i-right"}/>} onClick={createGoal}/>
                                <Button className={"marg-bot"} text={"Confirm and Apply Goal to New Student"} icon={<CopyIcon className={"i-right"}/>} onClick={completeGoal}/>
                                <Button text={"Confirm and Create New Goal for New Student"} icon={<NewGoalIcon className={"i-right"}/>} onClick={createNewGoalForNewStudent}/>
                            </div >
                        </div>
                    </>
                )
            }
        </ModalBody>
    )
};

export default CreateGoal;