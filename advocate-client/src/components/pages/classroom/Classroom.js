import React, {useState} from 'react';
import DashCard from "components/molecules/DashCard";
import FilterableTable from 'components/molecules/FilterableTable';
import {crudFetch, editDeleteIcons} from 'utils/functions/functions';
import Modal from 'components/molecules/Modal';
import ModalBody from 'components/molecules/ModalBody';
import TableAccordionGroup from 'components/molecules/TableAccordionGroup';
import {FaCheck as CheckIcon, FaPlus as PlusIcon} from "react-icons/fa";
import ClassroomForm from 'components/molecules/ClassroomForm';
import Button from 'components/atoms/Button';
import { BAD_REQUEST_STATUS, BASIC_STUDENT_TABLE_HEADERS, JSON_HEADER } from 'utils/constants';
import Section from 'components/atoms/Section';
import Box from 'components/atoms/Box';
import { useAuth } from "utils/auth/AuthHooks";
import { useUi } from 'utils/ui/UiHooks';

const Classroom = () => {
    const {teacher, setTeacher, signout} = useAuth();
    const {setLargeModal, setToasterText, modalBody, setModalBody, closeModal} = useUi();

    const classrooms = teacher.classrooms;

    const [selectedClassroom, setSelectedClassroom] = useState({});
    const [formErrors, setFormErrors] = useState({});


    const handleCrudError = (body) => {
        setFormErrors(JSON.parse(body));
    };
    
    const renderDeleteClassroomModalBody = () => {
        return (
            <ModalBody
                header={`Delete ${selectedClassroom.className}?`}
                confirmCallback={executeClassroomDeletion}
                cancelCallback={closeModal}
            >
                <p>
                    This will delete all students and all goals, benchmarks, trials, and tracking associated with those students.
                    This action cannot be undone.
                </p>
            </ModalBody>
        )
    };

    const executeClassroomDeletion = (body) => {
        crudFetch(
            {
                path: `deleteclassroom?classroomId=${selectedClassroom.id}`, 
                method: "DELETE",
                success: (body) => crudOperationSuccessful(body, `Successfully deleted ${selectedClassroom.className}`), 
                error: handleCrudError, 
                serverError: signout
            }
        )
    };

    const executeClassroomUpdate = () => {
        crudFetch({
            path: "updateclassroom", 
            method: "PUT",
            body: JSON.stringify(selectedClassroom),
            success: (body) => crudOperationSuccessful(body, `Successfully updated ${selectedClassroom.className}`), 
            error: handleCrudError,
            serverError: signout,
            headers: JSON_HEADER
        })
    };

    const crudOperationSuccessful = (body, message) => {
        setToasterText(<p>{<CheckIcon className="i-right"/>}{message}</p>);
        setTeacher(body);
        closeModal();
    };

    const updateClassroomName = (name) => {
        setSelectedClassroom(previous => ({...previous, className: name}));
    };

    const updateClassroomStudents = (studentArray) => {
        setSelectedClassroom(previous => ({...previous, students: [...studentArray]}))
    };

    const renderEditClassroomModalBody = () => {
        
        return (
            <ModalBody
                header={`Edit ${selectedClassroom.className}`}
                hideButtons
            >
                <ClassroomForm
                    editingClassName={selectedClassroom.className}
                    updateEditingClassName={updateClassroomName}
                    editingStudents={selectedClassroom.students}
                    updateEditingStudents={updateClassroomStudents}
                    teacherId={teacher.id}
                    confirmCallback={executeClassroomUpdate}
                    cancelCallback={closeModal}
                    editingErrors={formErrors}
                />
            </ModalBody>
        )
    };

    const handleIconClick = (action, index) => {
        setSelectedClassroom(classrooms[index]);
        setModalBody(determineModalBody(action));
    };

    const renderCreateClassroomModalBody = () => {
        return (
            <ModalBody
                header={"Create Classroom"}
                hideButtons
            >
                <ClassroomForm
                    teacherId={teacher.id}
                    logout={signout}
                    confirmCallback={confirmCreateClassroomCallback}
                    cancelCallback={closeModal}
                />
            </ModalBody>
        );
    };

    const confirmCreateClassroomCallback = async (students, className, createClassroom, setFormErrors) => {
        await createClassroom()
        .then(([ok, body, status]) => {
            if(ok) {
                crudOperationSuccessful(body, `Successfully created ${className}!`)
            } 
            else if(status === BAD_REQUEST_STATUS)
                setFormErrors(JSON.parse(body));
            else
                signout();
        });
    };

    const determineModalBody = (action) => { 
        switch(action){
            case "create":
                setLargeModal(true);
                return renderCreateClassroomModalBody();
            case "edit":
                setLargeModal(true);
                return renderEditClassroomModalBody();
            case "delete":
                return renderDeleteClassroomModalBody();
            default: null;
        }
    };

    const renderAccordion = () => {
        return (
            classrooms.length > 0
                ? <TableAccordionGroup
                    allOpen
                    accordionHeaders={classrooms.map(cr => cr.className)}
                    accordionIcons={editDeleteIcons()}
                    accordionIconCallback={handleIconClick}
                    noTable
                  >
                    {
                        classrooms.map((cr, ind) => {
                                return (
                                    cr.students.length
                                    ? <FilterableTable
                                        key={`classroomtable${ind}`}
                                        headers={BASIC_STUDENT_TABLE_HEADERS}
                                        data={cr.students.map(stu => 
                                            ({
                                               name: stu.name,
                                               age: stu.age,
                                               grade: stu.grade
                                           })
                                       )}
                                    />
                                    : <Box key={`noStudentsBox-${ind}`} text="No students, click the edit button to add students."/>
                                )
                            }
                        )
                    }
                  </TableAccordionGroup>
                : <></>
        )
    };

    return (
        <DashCard>
            <Section>
                <Button
                    text="Create new class"
                    icon={<PlusIcon className="i-right"/>}
                    onClick={() => setModalBody(determineModalBody("create"))}
                />
            </Section>
            {renderAccordion()}
        </DashCard>
    )
}

export default Classroom;
