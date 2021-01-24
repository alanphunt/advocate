import React, {useState} from "react";
import {FaCheck as CheckIcon, FaRegHandPointRight as RedirectIcon, FaRegCopy as CopyIcon, FaUndo as NewGoalIcon} from "react-icons/fa";
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

const CreateGoal = ({student, completeCrudOp, classroomIds, classrooms, students, setSelectedStudentId, signout}) => {
    const { id, name } = student;
    const [goal, setGoal] = useState({...goalModel, studentId: id});
    const [formErrors, setFormErrors] = useState(goalFormErrorModel);
    const [displayTable, setDisplayTable] = useState(false);

    const createGoal = (callback) => {
        let fd = new FormData();

        Object.keys(goal).forEach(goalKey => {
            if(goalKey === "benchmarks")
                fd.append("benchmarks", JSON.stringify(goal.benchmarks.map(bm => ({...bm, description: prepareEditorStateForRequest(bm.description.getCurrentContent())}))))
            else if (goalKey === "goal")
                fd.append("goal", prepareEditorStateForRequest(goal.goal.getCurrentContent()));
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
        setDisplayTable(true);
        setGoal({...goalModel});
    };

    const handleStudentSelect = (student) => {
        setSelectedStudentId(student.id);
        setGoal(prev => ({...prev, studentId: student.id}))
        setDisplayTable(false);
    };

    return (
        <ModalBody
            header={`Create goal for ${ displayTable ? '...' :  name}`}
            hideButtons
        >
            {
                displayTable ? (
                    <>
                        <Section>
                            <TableAccordionGroup
                                accordionHeaders={classroomIds.map(crId => classrooms[crId].className)}
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
                                <Button className={"marg-bot"} text={"Confirm and Return to Goal center"} icon={<RedirectIcon className={"i-right"}/>} onClick={() => createGoal(null)}/>
                                <Button className={"marg-bot"} text={"Confirm and Apply Goal to New Student"} icon={<CopyIcon className={"i-right"}/>} onClick={() => createGoal(() => setDisplayTable(true))}/>
                                <Button text={"Confirm and Create New Goal for New Student"} icon={<NewGoalIcon className={"i-right"}/>} onClick={() => createNewGoalForNewStudent(createNewGoalForNewStudent)}/>
                            </div>
                        </div>
                    </>
                )
            }
        </ModalBody>
    )
};

export default CreateGoal;