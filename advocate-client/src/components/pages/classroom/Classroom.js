import React, {useEffect, useRef, useState} from 'react';
import DashCard from "components/molecules/DashCard";
import Table from 'components/molecules/table/Table';
import {crudFetch, editDeleteIcons} from 'utils/functions/functions';
import ModalBody from 'components/molecules/ModalBody';
import TableAccordionGroup from 'components/molecules/table/TableAccordionGroup';
import {FaCheck as CheckIcon, FaPlus as PlusIcon} from "react-icons/fa";
import ClassroomForm from 'components/molecules/ClassroomForm';
import Button from 'components/atoms/Button';
import {
  BAD_REQUEST_STATUS,
  BASIC_STUDENT_TABLE_HEADERS,
  JSON_HEADER,
  BASIC_STUDENT_TABLE_KEYS,
  NOT_LOADING,
  CLASSROOM_LOADING,
  DELETE_CLASSROOM_LOADING, EDIT_CLASSROOM_LOADING
} from 'utils/constants';
import Section from 'components/atoms/Section';
import Box from 'components/atoms/Box';
import { useAuth } from "utils/auth/AuthHooks";
import AccordionItem from 'components/atoms/AccordionItem';
import {classroomErrorModel} from "utils/models";
import {Classroom as ClassObject} from "utils/classes/ContextModels";

const Classroom = ({modalAction, closeModal, setModalAction, setModalBody, setToasterText, isLoading, setIsLoading}) => {
  const {teacher, setTeacher, signout} = useAuth();
  const [formErrors, setFormErrors] = useState(classroomErrorModel);
  
  const [mutableClassroom, setMutableClassroom] = useState(new ClassObject());
  
  const classrooms = Object.values(teacher.classrooms);
  const students = Object.values(teacher.students);
  
  const scrollRef = useRef(null);
  
  useEffect(() => {
    if(Object.values(formErrors).some(err => err !== ""))
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [formErrors]);
  
  useEffect(() => {
    setModalBody(determineModalBody());
  }, [modalAction, mutableClassroom, formErrors, isLoading])
  
  const closeModalWrapper = () => {
    closeModal();
    setMutableClassroom(new ClassObject());
    setFormErrors(classroomErrorModel);
  };
  
  const confirmCreateClassroomCallback = () => {
    setIsLoading(CLASSROOM_LOADING);
/*    let data = {
      students: JSON.stringify(mutableClassroom.students),
      className: mutableClassroom.className
    };*/
    
    fetch("/api/createclassroom", {
      method: "POST",
      body: JSON.stringify(mutableClassroom),
      headers: JSON_HEADER
    })
      .then(res => Promise.all([res.ok, res.json(), res.status]))
      .then(([ok, body, status]) => {
        setIsLoading(NOT_LOADING);
        if(ok) {
          crudOperationSuccessful(body, `Successfully created ${mutableClassroom.className}!`)
        }
        else if(status === BAD_REQUEST_STATUS)
          setFormErrors(body);
        else
          signout();
      });
  };
  
  const crudOperationSuccessful = (body, message) => {
    setIsLoading(NOT_LOADING);
    setToasterText(<p>{<CheckIcon className="i-right"/>}{message}</p>);
    setTeacher(body);
    closeModalWrapper();
  };
  
  const determineModalBody = () => {
    switch(modalAction){
      case "create":
        return (
          <ModalBody
            header={"Create Classroom"}
            confirmCallback={confirmCreateClassroomCallback}
            cancelCallback={closeModalWrapper}
            ref={scrollRef}
            isLoading={isLoading.createClassroom}
          >
            <ClassroomForm
              classroom={mutableClassroom}
              updateClassroom={updateClassroom}
              updateStudents={updateClassroomStudents}
              errors={formErrors}
            />
          </ModalBody>
        );
      case "delete":
        return (
          <ModalBody
            header={`Delete ${mutableClassroom.className}?`}
            confirmCallback={executeClassroomDeletion}
            cancelCallback={closeModalWrapper}
            isLoading={isLoading.deleteClassroom}
          >
            <p className={"marg-bot-2"}>
              This will delete all students and all goals, benchmarks, trials, and tracking associated with those students.
              This action cannot be undone.
            </p>
          </ModalBody>
        );
      case "edit":
        return (
          <ModalBody
            header={`Edit ${classrooms.find(cr => cr.id === mutableClassroom.id).className}`}
            confirmCallback={executeClassroomUpdate}
            cancelCallback={closeModalWrapper}
            ref={scrollRef}
            isLoading={isLoading.editClassroom}
          >
            <ClassroomForm
              classroom={mutableClassroom}
              updateClassroom={updateClassroom}
              updateStudents={updateClassroomStudents}
              errors={formErrors}
            />
          </ModalBody>
        );
      default: return null;
    }
  };
  
  const executeClassroomDeletion = () => {
    setIsLoading(DELETE_CLASSROOM_LOADING);
    crudFetch(
      {
        path: `deleteclassroom?classroomId=${mutableClassroom.id}`,
        method: "DELETE",
        success: (body) => crudOperationSuccessful(body, `Successfully deleted ${mutableClassroom.className}`),
        error: handleCrudError,
        serverError: signout
      }
    )
  };
  
  const executeClassroomUpdate = () => {
    setIsLoading(EDIT_CLASSROOM_LOADING);
    crudFetch({
      path: "updateclassroom",
      method: "PUT",
      body: JSON.stringify(mutableClassroom),
      success: (body) => crudOperationSuccessful(body, `Successfully updated ${mutableClassroom.className}`),
      error: handleCrudError,
      serverError: signout,
      headers: JSON_HEADER
    })
  };
  
  const handleCrudError = (body) => {
    setIsLoading(NOT_LOADING);
    setFormErrors(body);
  };
  
  const handleIconClick = (action, classroom) => {
    setMutableClassroom({...classroom, students: classroom.studentIds.map(id => teacher.students[id])});
    setModalAction(action);
  };
  
  const updateClassroom = (e) => setMutableClassroom(prev => ({...prev, className: e}));
  
  const updateClassroomStudents = (stus) => setMutableClassroom(prev => ({...prev, students: stus}));
  
  return (
    <DashCard>
      <Section>
        <Button
          text="Create new class"
          icon={<PlusIcon className="i-right"/>}
          onClick={() => setModalAction("create")}
        />
      </Section>
      {
        classrooms.length
          ? (
            <TableAccordionGroup>
              {
                classrooms.map((cr, ind) => {
                  return (
                    <AccordionItem
                      key={`accItem-${cr.className}`}
                      header={cr.className}
                      preOpened
                      icons={editDeleteIcons()}
                      iconClickedCallback={(action) => handleIconClick(action, cr)}
                    >
                      {
                        students.some(stu => stu.classroomId === cr.id)
                          ? (
                            <Table
                              headers={BASIC_STUDENT_TABLE_HEADERS}
                              tableData={cr.studentIds.map(id => teacher.students[id])}
                              dataKeys={BASIC_STUDENT_TABLE_KEYS}
                            />
                          ) : (
                            <Box key={`noStudentsBox-${ind}`} text="No students. Click the edit button to add students."/>
                          )
                      }
                    </AccordionItem>
                  ) } )}
            </TableAccordionGroup>
          ) : <Box text="No classrooms! Click the Create Classroom button to add a classroom."/>
      }
    </DashCard>
  )
}

export default Classroom;
