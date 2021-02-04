import React, {useState} from "react";
import Section from "components/atoms/Section";
import Table from "components/molecules/table/Table";
import FormElement from "components/atoms/FormElement";
import NumberPicker from "components/atoms/NumberPicker";
import { BASIC_STUDENT_TABLE_HEADERS} from "utils/constants";
import {FaAddressBook as BookIcon, FaRegTrashAlt as TrashIcon} from "react-icons/fa";
import RequiredField from "components/atoms/RequiredField";
import ErrorLabel from "components/atoms/ErrorLabel";

/*
     props:
     state:
*/

const ClassroomForm = ({
    students,
    updateStudents,
    classroom,
    updateClassroom,
    errors
}) => {

    const student = {
        id: -1,
        name: '',
        age: '',
        grade: ''
    };     
    
    const [warning, setWarning] = useState("");
    const warningMessage = "You've deleted a student which will also delete associated goals, benchmarks, trials, and tracking data. Clicking confirm will make these changes permanent. Click cancel to undo."

     const handleUpdateStudent = (index, event, key) => {
        let val = event.currentTarget.value;
        let studentsCopy = [...students];
        let studentCopy = {...studentsCopy[index], [key]:val};
        studentsCopy.splice(index, 1, studentCopy);
        updateStudents(studentsCopy);
    };

    const deleteSpecificStudent = (index) => {
        const studentsCopy = [...students];
        studentsCopy.splice(index, 1);
        if(typeof students[index].id === "string")
            setWarning(warningMessage);
        updateStudents([...studentsCopy]);
    };

    const adjustStudentCount = (studentArray) => {
        students.forEach((student, index) => {
            //if the ID is of type number then it hasn't been processed
            //on the back end and it won't have goals/benchmarks
            if(typeof student.id === "string" && studentArray[index]?.id !== student.id)
                setWarning(warningMessage);
        });
        updateStudents([...studentArray]);
    };

    const renderStudentRow = (student, index) => {
        const editColumn = {'delete': <TrashIcon onClick={() => deleteSpecificStudent(index)} className="selectable hover-color"/>};
        const row = {
            name: <input onChange={(event)=>handleUpdateStudent(index, event, "name")} key={`name${index}`} placeholder='Name' value={student.name} maxLength={50}/>,
            age: <input onChange={(event)=>handleUpdateStudent(index, event, "age")} key={`age${index}`} placeholder='Age' value={student.age} maxLength={2}/>,
            grade: <input onChange={(event)=>handleUpdateStudent(index, event, "grade")} key={`grade${index}`} placeholder='Grade' value={student.grade} maxLength={10}/>
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
                    onChange={e => updateClassroom(e.currentTarget.value)}
                    value={classroom?.className}
                    placeholder={"Class Name"}
                    errorMessage={errors.className}
                    required
                    autoFocus
                />
            </Section>
            <Section>
                <h3 className={"i-bottom"}><RequiredField/>Number of students</h3>
                <NumberPicker updateState={adjustStudentCount} object={student} objectArray={students}/>
            </Section>
            <Section>
                {
                    errors.students
                        ? <ErrorLabel text={errors.students}/>
                        : <></>
                }
                <Table
                    headers={["Delete", ...BASIC_STUDENT_TABLE_HEADERS]}
                    tableData={students.map((student, index) => renderStudentRow(student, index))}
                />
            </Section>
            { warning === "" ? <></> : <p className="incomp-color marg-bot">{warning}</p>}
        </>
    );
};

export default ClassroomForm;
