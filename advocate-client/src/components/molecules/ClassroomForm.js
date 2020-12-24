import React, {useState} from "react";
import Section from "components/atoms/Section";
import NewTable from "components/molecules/NewTable";
import FormElement from "components/atoms/FormElement";
import NumberPicker from "components/atoms/NumberPicker";
import { BASIC_STUDENT_TABLE_HEADERS, JSON_HEADER} from "utils/constants";
import {FaAddressBook as BookIcon, FaRegTrashAlt as TrashIcon} from "react-icons/fa";
import ConfirmOrCancelButtons from "./ConfirmOrCancelButtons";

/*
     props:

     state:

*/

const ClassroomForm = ({
    editingStudents,
    updateEditingStudents,
    editingClassName,
    updateEditingClassName,
    teacherId,
    confirmCallback,
    cancelCallback,
    editingErrors
}) => {
    const student = {
        name: '',
        goalFocus: '',
        eligibility: '',
        skills: ''
    };     
    
    const formElements = {
        className: null,
        students: null
    };

    const [students, setStudents] = useState([]);
    const [className, setClassName] = useState("");
    const [formErrors, setFormErrors] = useState(formElements);
    const [warning, setWarning] = useState("");

    //all of this pertains to editing a classroom
    const isEditing = updateEditingClassName && updateEditingStudents;
    const determinedStudents = isEditing ? editingStudents : students;
    const determinedClassName = isEditing ? editingClassName : className;
    const studentUpdateMethod = isEditing ? updateEditingStudents : setStudents;
    const classNameUpdateMethod = isEditing ? updateEditingClassName : setClassName;
    const determinedErrors = isEditing ? editingErrors : formErrors;
    const tableHeaders = isEditing ? ["", ...BASIC_STUDENT_TABLE_HEADERS] : [...BASIC_STUDENT_TABLE_HEADERS];
    const warningMessage = "You've deleted a student which will also delete associated goals, benchmarks, trials, and tracking data. Clicking confirm will make these changes permanent. Click cancel to undo."

    const createClassroom = async () => {
        let data = {
            teacherId: teacherId,
            students: JSON.stringify(determinedStudents),
            className: determinedClassName
        };

        return fetch("/api/createclassroom", {
            method: "POST",
            body: JSON.stringify(data),
            headers: JSON_HEADER
        })
        .then(res => Promise.all([res.ok, res.ok ? res.json() : res.text(), res.status]));
    };

    const updateStudent = (index, event, key) => {
        let val = event.currentTarget.value;
        //parse/stringify deep copies the array so we prevent direct state mutation
        let studentsCopy = JSON.parse(JSON.stringify(determinedStudents));
        studentsCopy[index][key] = val;
        studentUpdateMethod([...studentsCopy]);
    };

    const updateStudents = (updatedArray) => {
        studentUpdateMethod([...updatedArray]);
    };

    const updateClassName = (e) => {
        classNameUpdateMethod(e.currentTarget.value);
    };

    const deleteSpecificStudent = (index) => {
        const studentsCopy = [...determinedStudents];
        studentsCopy.splice(index, 1);
        if(determinedStudents[index].id)
            setWarning(warningMessage);
        studentUpdateMethod([...studentsCopy]);
    };

    const adjustStudentCount = (studentArray) => {
        determinedStudents.forEach((student, index) => {
            if(student.id && !studentArray[index]?.id)
                setWarning(warningMessage);
        });
        updateStudents(studentArray);
    };

    const renderStudentRow = (student, index) => {
        const editColumn = isEditing ? {'': <TrashIcon onClick={() => deleteSpecificStudent(index)} className="selectable hover-color"/>} : {};
        const row = {
            name: <input onChange={(event)=>updateStudent(index, event, "name")} key={`name${index}`} placeholder='Name' value={determinedStudents[index].name}/>,
            goals: <input onChange={(event)=>updateStudent(index, event, "goalFocus")} key={`goals${index}`} placeholder='Goal Focus' value={determinedStudents[index].goalFocus}/>,
            eligibility: <input onChange={(event)=>updateStudent(index, event, "eligibility")} key={`eligibility${index}`} placeholder='Eligibility' value={determinedStudents[index].eligibility}/>,
            skills: <input onChange={(event)=>updateStudent(index, event, "skills")} key={`skills${index}`} placeholder='Skills' value={determinedStudents[index].skills}/>
        };
            Object.assign(editColumn, row)
        return editColumn;
    };

    return(
        <>
            <Section>
                <FormElement
                    icon={<BookIcon/>}
                    label={"Class Name"}
                    onChange={updateClassName}
                    value={determinedClassName}
                    placeholder={"Class Name"}
                    errorMessage={determinedErrors.className}
                />
            </Section>
            <Section>
                <h3 className={"i-bottom"}>Number of students</h3>
                <NumberPicker updateState={adjustStudentCount} object={student} objectArray={determinedStudents}/>
            </Section>
            <Section>
                {
                    determinedErrors.students !== null
                        ? <p className={"inputerror"}>{determinedErrors.students}</p>
                        : <></>
                }
                <NewTable
                    iconColumn={isEditing}
                    headers={tableHeaders}
                    data={determinedStudents.map((student, index) => renderStudentRow(student, index))}
                />
            </Section>
            { warning === "" ? <></> : <p className="incomp-color marg-bot">{warning}</p>}
            <ConfirmOrCancelButtons
                confirmCallback={() => confirmCallback(students, className, createClassroom, setFormErrors)}
                cancelCallback={cancelCallback}
            />
        </>
    );
};

export default ClassroomForm;
