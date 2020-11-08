import React, {useState, useEffect} from "react";
import NumberPicker from "components/singletons/NumberPicker";
import Table from "components/collectives/Table";
import {Redirect} from "react-router-dom";
import {FaAddressBook as BookIcon, FaCheck as CheckIcon, FaRegCopy as CopyIcon} from "react-icons/fa";
import DashCard from "components/collectives/DashCard";
import FormElement from "components/singletons/FormElement";
import CompletionModal from "components/collectives/CompletionModal";
import Button from "components/singletons/Button";
import {checkLocalForCreated} from "components/functions/functions";

const CreateClassroom = ({teacher, updateTeacher, logout}) => {
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
    const [displayModal, setDisplayModal] = useState(false);
    const [newTeacherData, setNewTeacherData] = useState(null);

    let stuCount = students.length;

    const classroomWasCreated = !!localStorage.getItem("classroomWasCreated") || false;

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
            form.append("teacherId", teacher.id);
            form.append("students", JSON.stringify(students));
            form.append("className", className);
            fetch("/api/createclassroom", {
                method: "POST",
                body: form
            })
                .then(res => Promise.all([res.ok, res.ok ? res.json() : res.text(), res.status]))
                .then(([ok, body, status]) => {
                    if(ok) {
                        setNewTeacherData(body);
                        setDisplayModal(true);
                    }else if(status !== 403){
                        setFormErrors(JSON.parse(body));
                    }else
                        logout();
                });
    };

    const confirmClassroomCompletion = (data) => {
        localStorage.setItem("classroomWasCreated", "true");
        updateTeacher(newTeacherData);
    };

    useEffect(() => {
        return () => {
            checkLocalForCreated("classroomWasCreated");
        };
    }, [])

    const closeModal = () => {
        setStudents([]);
        setClassName("");
        setFormErrors(formElements);
        setDisplayModal(false);
    };

    return (
        classroomWasCreated
            ? <Redirect push to={"/dashboard/classroom"}/>
            : <DashCard header={"Create a Classroom"}>
                <CompletionModal
                    closeModal={closeModal}
                    displayed={displayModal}
                    successMessage={"Would you like to create another classroom or proceed to the classroom page?"}>
                    <Button text={"Go to classrooms"} className={"marg-right"} onClick={confirmClassroomCompletion} icon={<CheckIcon className={"i-right"}/>}/>
                    <Button text={"Create another"} onClick={closeModal} icon={<CopyIcon className={"i-right"}/>}/>
                </CompletionModal>
                <div className={"marg-bot-2"}>
                    <FormElement
                        icon={<BookIcon/>}
                        label={"Class Name"}
                        onChange={updateClassName}
                        value={className}
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
                <Button
                    className={stuCount === 0 ||className === "" ? "disabled" : ""}
                    onClick={createClassroom}
                    icon={<CheckIcon className={"i-right"}/>}
                    text={"Create Classroom"}
                />
            </DashCard>
    );
};

export default CreateClassroom;
