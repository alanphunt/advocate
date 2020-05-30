import React, {useState} from "react";
import Table from "./components/Table";
import NumberPicker from "./components/NumberPicker";
import {useHistory} from "react-router-dom";
import Accordion from "./components/accordion/Accordion";
import {FaAddressBook as BookIcon, FaCalendarPlus as CalPlusIcon, FaCalendarCheck as CalCheckIcon, FaClipboard as ClipIcon} from "react-icons/fa";

const CreateGoal = (props) => {
    const history = useHistory();

    const [goal, setGoal] = useState({
        goalName: "",
        startDate: "",
        masteryDate: "",
        process: "",
        monitor: "",
        benchmarks: [],
        studentId: ""
    });

    const [selectedStuObj, setSelectedStuObj] = useState({crInd: 999, stuInd: 999});

    const benchmark = {
        label: "",
        description: "",
        masteryDate: "",
        tracking: ""
    };

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const handleSelected = (stu, stuIndex, crInd) => {
        let selected = {crInd: crInd, stuInd: stuIndex};

        if(goal.studentId !== stu.id) {
            setGoal({...goal, studentId: stu.id});
            setSelectedStuObj(selected);
        }
        else {
            selected.crInd = 999;
            selected.stuInd = 999;
            setGoal({...goal, studentId: ""});
            setSelectedStuObj(selected);
        }

    };

    const createGoal = () => {
        const fd = new FormData();

        let updatedGoals = JSON.parse(JSON.stringify(goal));

        updatedGoals.benchmarks.forEach((bm, i) => {
            bm.label = `Benchmark ${alphabet[i]}.`;
        });

        Object.keys(updatedGoals).forEach(key => {
            fd.append(key, (key === "benchmarks" ? JSON.stringify(updatedGoals[key]) : updatedGoals[key]));
        });
        console.log(fd);
        fetch("/api/creategoal", {method: "POST", body: fd, headers: {"Authorization": `Bearer ${sessionStorage.authorization}`}})
            .then(r => r.text())
            .then(d => {
                alert("Successfully created a new goal! You'll be redirected to the goal center.")
                window.location = "/dashboard/goalcenter";
        });
    };

    const updateBenchmarkState = (updatedArray) => {
        setGoal({...goal, benchmarks: updatedArray});
    };

    const updateBenchmark = (i, event) => {
        let attr = event.currentTarget.getAttribute("name");
        let val = event.currentTarget.value;
        let bmCopy = JSON.parse(JSON.stringify(goal.benchmarks));
        bmCopy[i][attr] = val;
        setGoal({...goal, benchmarks: bmCopy});
    };

    return (
        props.teacher.classrooms.length === 0 || props.teacher.classrooms[0]?.students.length === 0
            ? <>{history.push("/dashboard/classroom/create")}</>
            : <div className={"dash-main-inner"}>
                <div className={"card width-100"}>
                    <div className={"cardheader"}><h2>Create a Goal</h2></div>

                    <div className={"cardmain"}>

                        <div className={"marg-bot-2"}>
                            <h3 className={"i-bottom"}>Goal name</h3>
                            <label htmlFor={"goalName"}>
                                <BookIcon className={"label-i"}/>
                                <input onChange={(e) => {setGoal({...goal, goalName: e.currentTarget.value});}}
                                     className={"width-25"} id="goalName" type={"text"} placeholder={"Goal Name"} name={"goalName"}/>
                            </label>
                        </div>

                        <div className={"marg-bot-2"}>
                            <h3 className={"i-bottom"}>Start date</h3>
                            <label htmlFor={"startDate"}>
                                <CalPlusIcon className={"label-i"}/>
                                <input onChange={(e) => {setGoal({...goal, startDate: e.currentTarget.value});}} className={"width-25"} id="startDate" type={"text"} placeholder={"MM/DD/YYYY"} name={"startDate"}/>
                            </label>
                        </div>

                        <div className={"marg-bot-2"}>
                            <h3 className={"i-bottom"}>Mastery date</h3>
                            <label htmlFor={"startDate"}>
                                <CalCheckIcon className={"label-i"}/>
                                <input onChange={(e) => {setGoal({...goal, masteryDate: e.currentTarget.value});}} className={"width-25"} id="masteryDate" type={"text"} placeholder={"MM/DD/YYYY"} name={"masteryDate"}/>
                            </label>
                        </div>

                        <div className={"marg-bot-2"}>
                            <h3 className={"i-bottom"}>How to implement goal</h3>
                            <label htmlFor={"process"}>
                                <ClipIcon className={"label-i"}/>
                                <input onChange={(e) => {setGoal({...goal, process: e.currentTarget.value});}} className={"width-25"} id="process" type={"text"} placeholder={"Process"} name={"Process"}/>
                            </label>
                        </div>

                        <div className={"marg-bot-2"}>
                            <h3 className={"i-bottom"}>Monitor after mastery?</h3>
                            <input onChange={() => {setGoal({...goal, monitor: true});}} type={"radio"} name={"monitor"}/><span className={"marg-right"}>Yes</span>
                            <input onChange={() => {setGoal({...goal, monitor: false});}} type={"radio"} name={"monitor"}/><span>No</span>
                        </div>

                        <div className={"marg-bot-2"}>
                            <h3 className={"i-bottom"}>Benchmarks</h3>
                            <div className={"marg-bot-2"}>
                                <NumberPicker updateState={updateBenchmarkState} limit={26} object={benchmark} objectArray={goal.benchmarks}/>
                            </div>
                            <Table headers={["Label", "Benchmark", "Mastery Date", "Tracking Type"]}>
                                <div>
                                    {
                                        goal.benchmarks.map((benchmark, i) => {
                                            return (
                                                <div key={"benchmark"+i} className={"tr"}>
                                                    <div className="td"><strong>Benchmark {alphabet[i]}.</strong></div>
                                                    <div className="td"><input onChange={(e)=>{updateBenchmark(i, e)}} key={`desc${i}`} placeholder='Benchmark' name='description'/></div>
                                                    <div className="td"><input onChange={(e)=>{updateBenchmark(i, e)}} key={`masterydate${i}`} placeholder='MM/DD/YYYY' name='masteryDate'/></div>
                                                    <div className="td">
                                                        <select name={"tracking"} key={`tracktype${i}`} onChange={(e)=>{updateBenchmark(i, e)}}>
                                                            <option>Select a type..</option>
                                                            <option value={"score"}>Score/Accuracy</option>
                                                            <option value={"trial"}>Trial/Frequency</option>
                                                            <option value={"duration"}>Duration</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </Table>
                        </div>

                        <h3 className={"i-bottom"}>Apply to which student</h3>
                        <Accordion
                            array={props.teacher.classrooms}
                            name={props.teacher.classrooms.map(cr => cr.className)}
                            open
                        >
                            {
                                props.teacher.classrooms.map((cr, crInd) =>
                                    <Table
                                        selectable={true}
                                        selectedCallback={(stu, ind) => {
                                            handleSelected(stu, ind, crInd);
                                        }}
                                        selectedRowIndexes={ selectedStuObj.crInd === crInd ? selectedStuObj.stuInd : 999 }
                                        studentTable={true}
                                        key={"attachgoaltostudent"}
                                        data={cr.students}
                                    />
                                )
                            }
                        </Accordion>

                    </div>

                    <div className={"cardfooter"}>
                        <button
                            className={
                                Object.values(goal).some(v => v === "" || v.length === 0)
                                ? "disabled" : ""}
                            onClick={createGoal}>Create Goal</button>
                    </div>
                </div>
            </div>
    )
};

export default CreateGoal;