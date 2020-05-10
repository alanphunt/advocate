import React, {useState} from "react";
import Table from "./components/Table";
import NumberPicker from "./components/NumberPicker";
import {useHistory} from "react-router-dom";
import Accordion from "./components/accordion/Accordion";

const CreateGoal = (props) => {
    const history = useHistory();

    const [goal, setGoal] = useState({
        goalName: "",
        startDate: "",
        masteryDate: "",
        process: "",
        monitor: "",
        benchmarks: [],
        studentIds: []
    });

    const [selectedRowIndexes, setSelectedRowIndex] = useState([]);
    const [selectedStuObj, setSelectedStuObj] = useState([]);

    const benchmark = {
        label: "",
        description: "",
        masteryDate: "",
        tracking: ""
    };

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const handleSelected = (stu, selectedIndex, crInd) => {
        let ids = goal.studentIds;
        let selected = {crInd: crInd, stuInd: selectedIndex};

        if(!goal.studentIds.includes(stu.id)) {
            setGoal({...goal, studentIds: ids.concat(stu.id)});
            setSelectedStuObj(prevState => prevState.concat(selected))
            //setSelectedRowIndex(selectedRowIndexes.concat(selectedIndex))
        }
        else {
            setGoal({...goal, studentIds: ids.filter(id => stu.id !== id)});
            setSelectedStuObj(prevState => prevState.filter(stuObj =>
                stuObj.crInd !== selected.crInd ||
                (stuObj.stuInd !== selected.stuInd && stuObj.crInd === selected.crInd)
            ))
            //setSelectedRowIndex(selectedRowIndexes.filter(i => i !== selectedIndex))
        }

    };

    const createGoal = () => {
        const fd = new FormData();

        let updatedGoals = JSON.parse(JSON.stringify(goal));

        updatedGoals.benchmarks.forEach((bm, i) => {
            bm.label = `Benchmark ${alphabet[i]}.`;
        });

        console.log(updatedGoals);

        Object.keys(updatedGoals).forEach(key => {
            fd.append(key, (key === "benchmarks" ? JSON.stringify(updatedGoals[key]) : updatedGoals[key]));
        });

        fetch("/api/creategoal", {method: "POST", body: fd})
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
                                <i className={"fas fa-address-book label-i"}/>
                                <input onChange={(e) => {setGoal({...goal, goalName: e.currentTarget.value});}}
                                     className={"width-25"} id="goalName" type={"text"} placeholder={"Goal Name"} name={"goalName"}/>
                            </label>
                        </div>

                        <div className={"marg-bot-2"}>
                            <h3 className={"i-bottom"}>Start date</h3>
                            <label htmlFor={"startDate"}>
                                <i className={"fas fa-calendar-plus label-i"}/>
                                <input onChange={(e) => {setGoal({...goal, startDate: e.currentTarget.value});}} className={"width-25"} id="startDate" type={"text"} placeholder={"MM/DD/YYYY"} name={"startDate"}/>
                            </label>
                        </div>

                        <div className={"marg-bot-2"}>
                            <h3 className={"i-bottom"}>Mastery date</h3>
                            <label htmlFor={"startDate"}>
                                <i className={"fas fa-calendar-check label-i"}/>
                                <input onChange={(e) => {setGoal({...goal, masteryDate: e.currentTarget.value});}} className={"width-25"} id="masteryDate" type={"text"} placeholder={"MM/DD/YYYY"} name={"masteryDate"}/>
                            </label>
                        </div>

                        <div className={"marg-bot-2"}>
                            <h3 className={"i-bottom"}>How to implement goal</h3>
                            <label htmlFor={"process"}>
                                <i className={"fas fa-clipboard label-i"}/>
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

                        <h3 className={"i-bottom"}>Apply to which students</h3>
                        <Accordion
                            array={props.teacher.classrooms}
                            name={props.teacher.classrooms.map(cr => cr.className)}
                        >
                            {
                                props.teacher.classrooms.map((cr, crInd) =>
                                    <Table
                                        selectable={true}
                                        selectedCallback={(stu, ind) => {
                                            handleSelected(stu, ind, crInd);
                                        }}
                                        selectedRowIndexes={
                                            selectedStuObj.map(stuObj => {
                                                    if (stuObj.crInd === crInd)
                                                        return stuObj.stuInd;
                                                }
                                            ).filter(n => n !== undefined)
                                        }
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

/*

                                        selectedRowIndexes={crind === selectedRowIndexes ? 0 : 1}

                        <Table selectedRowIndexes={selectedRowIndexes} studentTable={true} selectable={true} data={props.teacher.classrooms[0].students} selectedCallback={handleSelected}/>

 */