import React, {useState} from "react";
import Table from "./components/Table";
import NumberPicker from "./components/NumberPicker";

const CreateGoal = (props) => {
    const [goal, setGoal] = useState({
        goalName: "",
        startDate: "",
        masteryDate: "",
        process: "",
        monitor: "",
        benchmarks: [],
        studentIds: []
    });

    const benchmark = {
        label: "",
        description: "",
        masteryDate: "",
        tracking: ""
    };

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const handleSelected = (push, stu) => {
        let ids = goal.studentIds;
        if(push)
            setGoal({...goal, studentIds: ids.concat(stu.id)});
        else
            setGoal({...goal, studentIds: ids.filter(id => stu.id !== id)});
    };

    const createGoal = async () => {
        const fd = new FormData();

        let updatedGoals = JSON.parse(JSON.stringify(goal));

        updatedGoals.benchmarks.forEach((bm, i) => {
            bm.label = `Benchmark ${alphabet[i]}.`;
        });

        console.log(updatedGoals);

        Object.keys(updatedGoals).forEach(key => {
            fd.append(key, (key === "benchmarks" ? JSON.stringify(updatedGoals[key]) : updatedGoals[key]));
        });

        const response = await fetch("/api/creategoal", {method: "POST", body: fd});
        const json = await response.json();
        console.log(json);
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
        <div className={"dash-main-inner"}>
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
                            <input onChange={(e) => {setGoal({...goal, startDate: e.currentTarget.value});}} className={"width-25"} id="startDate" type={"text"} placeholder={"DD/MM/YYYY"} name={"startDate"}/>
                        </label>
                    </div>

                    <div className={"marg-bot-2"}>
                        <h3 className={"i-bottom"}>Mastery date</h3>
                        <label htmlFor={"startDate"}>
                            <i className={"fas fa-calendar-check label-i"}/>
                            <input onChange={(e) => {setGoal({...goal, masteryDate: e.currentTarget.value});}} className={"width-25"} id="masteryDate" type={"text"} placeholder={"DD/MM/YYYY"} name={"masteryDate"}/>
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
                        <Table headers={["Label", "Description", "Mastery Date", "Tracking Type"]}>
                            <div>
                                {
                                    goal.benchmarks.map((benchmark, i) => {
                                        return (
                                            <div key={"benchmark"+i} className={"tr"}>
                                                <div className="td"><strong>Benchmark {alphabet[i]}.</strong></div>
                                                <div className="td"><input onChange={(e)=>{updateBenchmark(i, e)}} key={`desc${i}`} placeholder='Description' name='description'/></div>
                                                <div className="td"><input onChange={(e)=>{updateBenchmark(i, e)}} key={`masterydate${i}`} placeholder='MM/DD/YYYY' name='masteryDate'/></div>
                                                <div className="td">
                                                    <select name={"tracking"} key={`tracktype${i}`} onChange={(e)=>{updateBenchmark(i, e)}}>
                                                        <option>Select a type..</option>
                                                        <option value={"score"}>Score</option>
                                                        <option value={"accuracy"}>Accuracy</option>
                                                        <option value={"trial"}>Trial</option>
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
                    <Table studentTable={true} selectable={true} data={props.teacher.classrooms[0].students} selectedCallback={handleSelected}/>
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
/*                    //accuracy, trial, score, duration
*/