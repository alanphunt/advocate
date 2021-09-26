import React, {useState} from "react";
import Section from "components/atoms/Section";
import FormElement from "components/atoms/FormElement";
import NumberPicker from "components/atoms/NumberPicker";
import {FaAddressBook as BookIcon, FaRegTrashAlt as TrashIcon} from "react-icons/fa";
import RequiredField from "components/atoms/RequiredField";
import ErrorLabel from "components/atoms/ErrorLabel";
import {Student} from "utils/classes/ContextModels";
import TableTest from "components/molecules/table/TableTest";
import H3 from "../atoms/H3";


const ClassroomForm = ({
  updateStudents,
  classroom,
  updateClassroom,
  errors
}) => {
  const students = classroom.students || [];
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
    if(students[index].id !== "")
      setWarning(warningMessage);
    updateStudents([...studentsCopy]);
  };

  const adjustStudentCount = (studentArray) => {
    students.forEach((student, index) => {
    //if the ID is of type number then it hasn't been processed on the back end and it won't have goals/benchmarks
    if(student.id !== "" && studentArray[index]?.id !== student.id)
      setWarning(warningMessage);
    });
    updateStudents([...studentArray]);
  };

  const renderStudentRow = (student, index) => {
    return {
      name: <input onChange={(event) => handleUpdateStudent(index, event, "name")} key={`name${index}`}
                   placeholder='Name' value={student.name} maxLength={50}/>,
      age: <input onChange={(event) => handleUpdateStudent(index, event, "age")} key={`age${index}`} placeholder='Age'
                  value={student.age} maxLength={2}/>,
      grade: <input onChange={(event) => handleUpdateStudent(index, event, "grade")} key={`grade${index}`}
                    placeholder='Grade' value={student.grade} maxLength={10}/>,
      actions: null
    };
  };

  const columns = [
    {
      title: <span>Name<RequiredField/></span>,
      dataIndex: "name",
      width: "30%",
    },
    {
      title: <span>Age<RequiredField/></span>,
      dataIndex: "age",
      width: "30%",
    },
    {
      title: <span>Grade<RequiredField/></span>,
      dataIndex: "grade",
      width: "30%",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      width: "10%",
      render: (content, ind) => {return <H3><TrashIcon onClick={() => deleteSpecificStudent(ind)} className="selectable hover-color"/></H3>}
    }
  ];

  return(
    <>
    <Section>
      <FormElement
        icon={<BookIcon/>}
        label={"Class Name"}
        onChange={e => updateClassroom(e.currentTarget.value)}
        value={classroom.className}
        placeholder={"Class Name"}
        errorMessage={errors.className}
        required
        autoFocus
      />
    </Section>
    <Section>
      <H3 classes={"i-bottom"}>Number of students<RequiredField/></H3>
      <NumberPicker updateState={adjustStudentCount} object={new Student()} objectArray={students}/>
    </Section>
    <Section>
      {
        errors.students
          ? <ErrorLabel text={errors.students}/>
          : <></>
      }
      <TableTest
        columns={columns}
        data={students?.map((student, index) => renderStudentRow(student, index))}
      />
    </Section>
    { warning === "" ? <></> : <p className="incomp-color marg-bot">{warning}</p>}
    </>
  );
};

export default ClassroomForm;
