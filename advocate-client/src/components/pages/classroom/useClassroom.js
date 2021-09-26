import React, {useEffect, useRef, useState} from 'react';
import {crudFetch, mapStudents, removeEntryFromObject} from 'utils/functions/functions';
import ModalBody from 'components/molecules/ModalBody';
import {FaCheck as CheckIcon} from "react-icons/fa";
import ClassroomForm from 'components/molecules/ClassroomForm';
import {
  BAD_REQUEST_STATUS,
  JSON_HEADER,
  NOT_LOADING,
  CLASSROOM_LOADING,
  DELETE_CLASSROOM_LOADING, EDIT_CLASSROOM_LOADING
} from 'utils/constants';
import { useAuth } from "utils/auth/AuthHooks";
import {classroomErrorModel} from "utils/models";
import {Classroom as ClassObject} from "utils/classes/ContextModels";

const useClassroom = ({modalAction, setModalAction, closeModal, setModalBody, setToasterText, isLoading, setIsLoading}) => {
  const {teacher, setTeacher, signout} = useAuth();
  const [formErrors, setFormErrors] = useState(classroomErrorModel);

  const [mutableClassroom, setMutableClassroom] = useState(new ClassObject());

  const classrooms = Object.values(teacher.classrooms);
  const renderTableData = students => mapStudents(students);

  const scrollRef = useRef(null);

  useEffect(() => {
    if(Object.values(formErrors).some(err => err !== ""))
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [formErrors]);

  useEffect(() => {
    setModalBody(_determineModalBody());
  }, [modalAction, mutableClassroom, formErrors, isLoading])

  const _closeModalWrapper = () => {
    closeModal();
    setMutableClassroom(new ClassObject());
    setFormErrors(classroomErrorModel);
  };

  const _confirmCreateClassroomCallback = () => {
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
          // crudOperationSuccessful(body, `Successfully created ${mutableClassroom.className}!`)
          _classroomCreationSuccessful(body);
        }
        else if(status === BAD_REQUEST_STATUS)
          setFormErrors(body);
        else
          signout();
      });
  };

  const _classroomDeletionSuccessful = () => {
    setTeacher(prev => ({
      ...prev,
      classrooms: removeEntryFromObject(mutableClassroom.id, prev.classrooms)
    }));
    _setToasterAndCloseModal(`Successfully deleted ${mutableClassroom.className}`);
  };

  const _classroomCreationSuccessful = (body) => {
    _updatePartialContext(body);
    _setToasterAndCloseModal(`Successfully created ${mutableClassroom.className}!`);
  };

  const _setToasterAndCloseModal = (message) => {
    setToasterText(<p>{<CheckIcon className="i-right"/>}{message}</p>)
    _closeModalWrapper();
  };

  const _updatePartialContext = (body) => {
    setTeacher(prev => ({
      ...prev,
      classrooms: {...prev.classrooms, ...body.classroom},
      students: {...prev.students, ...body.students}
    }))
  };

  const _classroomUpdateSuccessful = (body) => {
    _updatePartialContext(body);
    _setToasterAndCloseModal(`Successfully updated ${mutableClassroom.className}`);
  };

  const _determineModalBody = () => {
    switch(modalAction){
      case "create":
        return (
          <ModalBody
            header={"Create Classroom"}
            confirmCallback={_confirmCreateClassroomCallback}
            cancelCallback={_closeModalWrapper}
            ref={scrollRef}
            isLoading={isLoading.createClassroom}
          >
            <ClassroomForm
              classroom={mutableClassroom}
              updateClassroom={_updateClassroom}
              updateStudents={_updateClassroomStudents}
              errors={formErrors}
            />
          </ModalBody>
        );
      case "delete":
        return (
          <ModalBody
            header={`Delete ${mutableClassroom.className}?`}
            confirmCallback={_executeClassroomDeletion}
            cancelCallback={_closeModalWrapper}
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
            confirmCallback={_executeClassroomUpdate}
            cancelCallback={_closeModalWrapper}
            ref={scrollRef}
            isLoading={isLoading.editClassroom}
          >
            <ClassroomForm
              classroom={mutableClassroom}
              updateClassroom={_updateClassroom}
              updateStudents={_updateClassroomStudents}
              errors={formErrors}
            />
          </ModalBody>
        );
      default: return null;
    }
  };

  const _executeClassroomDeletion = () => {
    setIsLoading(DELETE_CLASSROOM_LOADING);
    crudFetch(
      {
        path: `deleteclassroom?classroomId=${mutableClassroom.id}`,
        method: "DELETE",
        success: (body) => _classroomDeletionSuccessful(),
        error: _handleCrudError,
        serverError: signout
      }
    )
  };

  const _executeClassroomUpdate = () => {
    setIsLoading(EDIT_CLASSROOM_LOADING);
    crudFetch({
      path: "updateclassroom",
      method: "PUT",
      body: JSON.stringify(mutableClassroom),
      success: (body) => _classroomUpdateSuccessful(body),
      error: _handleCrudError,
      serverError: signout,
      headers: JSON_HEADER
    })
  };

  const _handleCrudError = (body) => {
    setIsLoading(NOT_LOADING);
    setFormErrors(body);
  };

  const handleIconClick = (action, classroom) => {
    setMutableClassroom({...classroom, students: classroom.studentIds.map(id => teacher.students[id])});
    setModalAction(action);
  };

  const _updateClassroom = (e) => setMutableClassroom(prev => ({...prev, className: e}));

  const _updateClassroomStudents = (stus) => setMutableClassroom(prev => ({...prev, students: stus}));

  return ({
    classrooms,
    teacher,
    handleIconClick,
    renderTableData,
  });
};

export default useClassroom;