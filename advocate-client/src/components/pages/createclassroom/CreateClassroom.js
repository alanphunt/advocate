import React, {useState} from "react";
import NumberPicker from "components/singletons/NumberPicker";
import Table from "components/collectives/Table";
import {Redirect} from "react-router-dom";
import {FaAddressBook as BookIcon, FaCheck as CheckIcon} from "react-icons/fa";
import DashCard from "components/collectives/DashCard";
import FormElement from "components/singletons/FormElement";
import Modal from "components/collectives/Modal";

const CreateClassroom = ({updateTeacher}) => {
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
    const [createdClassroom, setCreatedClassroom] = useState(false);
    const [formErrors, setFormErrors] = useState(formElements);
    const [displayModal, setDisplayModal] = useState(false);
    const [newTeacherData, setNewTeacherData] = useState(null);

    let stuCount = students.length;

    const updateStudent = (i, event) => {
        let attr = event.currentTarget.getAttribute("name");
        let val = event.currentTarget.value;
        //parse/stringify deep copies the array so we prevent direct state mutation
        let studentsCopy = JSON.parse(JSON.stringify(students));
        studentsCopy[i][attr] = val;
        setStudents([...studentsCopy]);
    };

    const updateStudents = (updatedArray) => {
        setStudents([...updatedArray]);
    };

    const updateClassName = (e) => {
        setClassName(e.currentTarget.value);
    };

    const createClassroom = () => {
            let form = new FormData();
            form.append("students", JSON.stringify(students));
            form.append("className", className);
            fetch("/api/createclassroom", {
                method: "POST",
                body: form,
                headers: {"Authorization": `Bearer ${sessionStorage.authorization}`}
            })
                .then(response => Promise.all([response.ok, response.json()]))
                .then(([ok, body]) => {
                    if(ok) {
                        //refreshData();
                        //alert("Successfully created a new classroom! You will be redirected to the Classroom manager.");
                        setDisplayModal(true);
                    }else {
                        setFormErrors({
                            className: body.className,
                            students: body.students
                        });
                    }
                });
    };

    const confirmClassroomCompletion = (data) => {
        updateTeacher(data);
        setCreatedClassroom(true);
    };

    const closeModal = () => {
        setDisplayModal(false);
    };

    return (
        createdClassroom
            ? <Redirect push to={"/dashboard/classroom"}/>
            : <DashCard header={"Create a Classroom"}>
            <Modal
                closeModal={closeModal}
                displayed={displayModal}
                successModal={
                    {
                        successMessage: "Would you like to create another classroom or proceed to the classroom page?",
                        confirmCallback: confirmClassroomCompletion,
                        cancelCallback: closeModal,
                        confirmText: "Create another",
                        cancelText: "Go to classrooms"
                    }
                }/>
                <div className={"marg-bot-2"}>
                    <FormElement
                        icon={<BookIcon/>}
                        label={"Class Name"}
                        onChange={updateClassName}
                        placeholder={"Class Name"}
                        name={"className"}
                        errorMessage={formErrors.className}
                    />
                </div>
                <div className="marg-bot-2">
                    <h3 className={"i-bottom"}>Number of students</h3>
                    <NumberPicker updateState={updateStudents} object={student} objectArray={students}/>
                </div>
                <div className={"marg-bot-2"}>
                    {
                        formErrors.students !== null
                            ? <p className={"inputerror"}>{formErrors.students}</p>
                            : <></>
                    }
                    <Table studentTable={true}>
                        <div>
                            {
                                students.map((v, i) =>{
                                    return(
                                        <div key={"student"+i} className={"tr"}>
                                            <div className="td">
                                                <input onChange={(e)=>{updateStudent(i, e)}} key={`name${i}`} placeholder='Name' name='name'/>
                                            </div>
                                            <div className="td"><input onChange={(e)=>{updateStudent(i, e)}} key={`goals${i}`} placeholder='Goal Focus' name='goalFocus'/></div>
                                            <div className="td"><input onChange={(e)=>{updateStudent(i, e)}} key={`eligibility${i}`} placeholder='Eligibility' name='eligibility'/></div>
                                            <div className="td"><input onChange={(e)=>{updateStudent(i, e)}} key={`skills${i}`} placeholder='Skills' name='skills'/></div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </Table>
                </div>
                <button
                    type="button"
                    className={stuCount === 0 ||className === "" ? "disabled" : ""}
                    disabled={stuCount === 0}
                    onClick={createClassroom}>
                    <CheckIcon className={"i-right"}/>
                    <span>Create Classroom</span>
                </button>
            </DashCard>
    );
};

export default CreateClassroom;
