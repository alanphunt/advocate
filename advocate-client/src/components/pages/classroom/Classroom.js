import React, {useState} from 'react';
import DashCard from "components/molecules/DashCard";
import FilterableTable from 'components/molecules/table/FilterableTable';
import {crudFetch, editDeleteIcons} from 'utils/functions/functions';
import ModalBody from 'components/molecules/ModalBody';
import TableAccordionGroup from 'components/molecules/table/TableAccordionGroup';
import {FaCheck as CheckIcon, FaPlus as PlusIcon} from "react-icons/fa";
import ClassroomForm from 'components/molecules/ClassroomForm';
import Button from 'components/atoms/Button';
import { BAD_REQUEST_STATUS, BASIC_STUDENT_TABLE_HEADERS, JSON_HEADER, BASIC_STUDENT_TABLE_KEYS } from 'utils/constants';
import Section from 'components/atoms/Section';
import Box from 'components/atoms/Box';
import { useAuth } from "utils/auth/AuthHooks";
import AccordionItem from 'components/atoms/AccordionItem';
import {classroomErrorModel, blankClassroomModel} from "utils/models";
import Modal from 'components/molecules/Modal';
import Toaster from 'components/atoms/Toaster';

const Classroom = () => {
    const {teacher, setTeacher, signout} = useAuth();
    const [toasterText, setToasterText] = useState("");
    const [formErrors, setFormErrors] = useState(classroomErrorModel);

    const [modalAction, setModalAction] = useState("");
    const [mutableClassroom, setMutableClassroom] = useState(null);

    const classrooms = Object.values(teacher.classrooms);
    const students = Object.values(teacher.students);
    const closeModal = () => {setModalAction(""); setMutableClassroom(null); setFormErrors(classroomErrorModel);};

    const confirmCreateClassroomCallback = () => {
        let data = {
            students: JSON.stringify(mutableClassroom.students),
            className: mutableClassroom.className
        };

        fetch("/api/createclassroom", {
            method: "POST",
            body: JSON.stringify(data),
            headers: JSON_HEADER
        })
        .then(res => Promise.all([res.ok, res.json(), res.status]))
        .then(([ok, body, status]) => {
            if(ok) {
                crudOperationSuccessful(body, `Successfully created ${data.className}!`)
            } 
            else if(status === BAD_REQUEST_STATUS)
                setFormErrors(body);
            else
                signout();
        });
    };

    const crudOperationSuccessful = (body, message) => {
        setToasterText(<p>{<CheckIcon className="i-right"/>}{message}</p>);
        setTeacher(body);
        closeModal();
    };

    const determineModalBody = () => {
        switch(modalAction){
            case "create":
                return (
                    <ModalBody
                        header={"Create Classroom"}
                        confirmCallback={confirmCreateClassroomCallback}
                        cancelCallback={closeModal}
                    >
                        <ClassroomForm
                            students={mutableClassroom.students}
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
                        cancelCallback={closeModal}
                    >
                        <p>
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
                        cancelCallback={closeModal}
                    >
                        <ClassroomForm
                            classroom={mutableClassroom}
                            updateClassroom={updateClassroom}
                            students={mutableClassroom.students}
                            updateStudents={updateClassroomStudents}
                            errors={formErrors}
                        />
                    </ModalBody>
                );
            default: return null;
        }
    };

    const executeClassroomDeletion = () => {
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
        setFormErrors(JSON.parse(body));
    };

    const handleIconClick = (action, classroom) => {
        setMutableClassroom({...classroom, students: students.filter(stu => stu.classroomId === classroom.id)});
        setModalAction(action);
    };

    const updateClassroom = (e) => setMutableClassroom(prev => ({...prev, className: e}));

    const updateClassroomStudents = (stus) => setMutableClassroom(prev => ({...prev, students: stus}));

    return (
        <DashCard>
            <Modal displayed={mutableClassroom} largeModal={modalAction === "create" || modalAction === "edit"} closeModal={closeModal}>
                {determineModalBody(modalAction)}
            </Modal>
            <Section>
                <Button
                    text="Create new class"
                    icon={<PlusIcon className="i-right"/>}
                    onClick={() => {setMutableClassroom(blankClassroomModel); setModalAction("create"); }}
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
                                            iconClickedCallback={(action, index) => handleIconClick(action, cr)}
                                        >
                                            {
                                                students.some(stu => stu.classroomId === cr.id)
                                                ? (
                                                    <FilterableTable
                                                        key={`filterabletable-${ind}`}
                                                        headers={BASIC_STUDENT_TABLE_HEADERS}
                                                        tableData={students.filter(stu => stu.classroomId === cr.id)}
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
            <Toaster displayed={toasterText} closeToaster={() => setToasterText("")}>{toasterText}</Toaster>
        </DashCard>
    )
}

export default Classroom;
