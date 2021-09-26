import React, {useEffect, useRef, useState} from "react";
import {FaCheck as CheckIcon, FaRegHandPointRight as RedirectIcon, FaRegCopy as CopyIcon, FaUndo as NewGoalIcon, FaTimes as XIcon} from "react-icons/fa";
import GoalForm from "components/molecules/GoalForm";
import {Goal} from "utils/classes/ContextModels"
import {
  BAD_REQUEST_STATUS,
  FORBIDDEN_STATUS, JSON_HEADER, NOT_LOADING, STUDENT_COLUMNS,
  UNAUTHORIZED_STATUS
} from "utils/constants";
import Button from "components/atoms/Button";
import Section from "components/atoms/Section";
import {goalFormErrorModel} from "utils/models";
import ModalBody from "components/molecules/ModalBody";
import {prepareEditorStateForRequest, formatStudentObject} from "utils/functions/functions";
import TableAccordionGroup from "components/molecules/table/TableAccordionGroup";
import AccordionItem from "../atoms/AccordionItem";
import TableTest from "./table/TableTest";

const CreateGoal = ({student, completeCrudOp, classrooms, students, setStudentId, signout, closeModal}) => {
  const { id, name } = student;
  const [goal, setGoal] = useState(new Goal());
  const [formErrors, setFormErrors] = useState(goalFormErrorModel);
  const [displayTable, setDisplayTable] = useState(false);
  const [isLoading, setIsLoading] = useState(NOT_LOADING);
  const scrollRef = useRef(null);

  useEffect(() => {
    if(Object.values(formErrors).some(err => err !== ""))
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [formErrors]);

  const createGoal = (buttonKey, callback) => {
    setIsLoading({[buttonKey]: true});
    let goalEditorState = goal.goal.getCurrentContent();

    const payload = JSON.stringify({
      ...goal,
      studentId: id,
      goal: (goalEditorState.hasText() ? prepareEditorStateForRequest(goalEditorState) : ""),
      benchmarks: goal.benchmarks.map(bm => {
        let bmEditorState = bm.description.getCurrentContent();
        return {
          ...bm,
          description: bmEditorState.hasText() ? prepareEditorStateForRequest(bmEditorState) : ""
        }
      })
    });

    fetch("/api/creategoal", {method: "POST", body: payload, headers: JSON_HEADER})
      .then(response => Promise.all([response.ok, response.json(), response.status]))
      .then(([ok, data, status]) => {
        setIsLoading(NOT_LOADING);
        if(ok){
          completeCrudOp(data, <><CheckIcon className="i-right"/>Successfully created goal for {name}!</>, !!callback);
          if(callback)
            callback();
        }
        else if(status === BAD_REQUEST_STATUS)
          setFormErrors(data);
        else if(status === FORBIDDEN_STATUS || status === UNAUTHORIZED_STATUS)
          signout();
      });
  };

  const createNewGoalForNewStudent = () => {
    setGoal(new Goal());
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
              <TableAccordionGroup>
                {
                  Object.values(classrooms).map(classroom => (
                    <AccordionItem
                      key={`accItem-${classroom.className}`}
                      header={classroom.className}
                      preOpened>
                      {
                        <TableTest
                          columns={STUDENT_COLUMNS}
                          data={formatStudentObject(Object.values(students).filter(stu => stu.classroomId === classroom.id))}
                          selectedCallback={handleStudentSelect}
                        />
                      }
                    </AccordionItem>
                  ))
                }
              </TableAccordionGroup>
            </Section>
          </>
        ) : (
          <>
            <div>
              <GoalForm mutableGoal={goal} setMutableGoal={setGoal} formErrors={formErrors} studentId={id}/>
              <div className="creategoalbuttons width-50">
                <Button className={"marg-bot"} text={"Confirm and Return to Goal center"} isLoading={isLoading.return} icon={<RedirectIcon/>} onClick={() => createGoal("return", null)}/>
                <Button className={"marg-bot"} text={"Confirm and Apply Goal to New Student"} isLoading={isLoading.apply} icon={<CopyIcon/>} onClick={() => createGoal("apply",() => setDisplayTable(true))}/>
                <Button className={"marg-bot"} text={"Confirm and Create New Goal for New Student"} isLoading={isLoading.new} icon={<NewGoalIcon/>} onClick={() => createGoal("new", createNewGoalForNewStudent)}/>
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