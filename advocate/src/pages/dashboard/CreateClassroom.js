import React from "react";
import NumberPicker from "./components/NumberPicker";
import Table from "./components/Table";

class CreateClassroom extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            students: [],
            className: ""
        }
    }

    student = {
        name: '',
        goalFocus: '',
        eligibility: '',
        skills: ''
    };

    updateStudent = (i, event) => {
        let attr = event.currentTarget.getAttribute("name");
        let val = event.currentTarget.value;
        //parse/stringify deep copies the array so we prevent direct state mutation
        let studentsCopy = JSON.parse(JSON.stringify(this.state.students));
        studentsCopy[i][attr] = val;
        this.setState({students: studentsCopy});
    };

    updateStudents = (updatedArray) => {
        this.setState({students: updatedArray});
    };

    createClassroom = () => {
        let form = new FormData();
        form.append("students", JSON.stringify(this.state.students));
        form.append("className", this.state.className);
        fetch("/api/createclassroom", {method: "POST", body: form})
            .then(response => response)
            .then(data => {
                alert("Success, you will be redirected to Classroom");
                window.location = "/dashboard/classroom";
            })
            .catch(e => console.log(e));
    };

    updateClassName = (e) => {
        this.setState({className: e.currentTarget.value})
    };

    render() {
        let students = this.state.students;
        let stuCount = students.length;

        return (
            <div className={"dash-main-inner"}>
                <div className={"card width-100"}>
                    <div className={"cardheader"}>
                        <h2>Create a Classroom</h2>
                    </div>
                    <div className={"cardmain"}>
                        <h3 className={"i-bottom"}>Class Name</h3>
                        <label htmlFor={"className"}>
                            <i className={"fas fa-address-book label-i"}/>
                            <input onChange={this.updateClassName} className={"width-25 marg-bot-2"} id="className" type={"text"} placeholder={"Class Name"} name={"className"}/>
                        </label>
                        <div className="marg-bot-2">
                            <h3 className={"i-bottom"}>Number of students</h3>
                            <NumberPicker updateState={this.updateStudents} object={this.student} objectArray={this.state.students}/>
                        </div>
                        <Table studentTable={true}>
                            <div>
                                {
                                    students.map((v, i) =>{
                                        return(
                                            <div key={"student"+i} className={"tr"}>
                                                <div className="td"><input onChange={(e)=>{this.updateStudent(i, e)}} key={`name${i}`} placeholder='Name' name='name' required/></div>
                                                <div className="td"><input onChange={(e)=>{this.updateStudent(i, e)}} key={`goals${i}`} placeholder='Goal Focus' name='goalFocus' required/></div>
                                                <div className="td"><input onChange={(e)=>{this.updateStudent(i, e)}} key={`eligibility${i}`} placeholder='Eligibility' name='eligibility' required/></div>
                                                <div className="td"><input onChange={(e)=>{this.updateStudent(i, e)}} key={`skills${i}`} placeholder='Skills' name='skills' required/></div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </Table>
                    </div>
                    <div className={"cardfooter"}>
                        <button className={stuCount === 0 || this.state.className === "" ? "disabled" : ""} disabled={stuCount === 0} onClick={this.createClassroom}>Create Classroom</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateClassroom;