import React, {useState} from "react";
import {
    FaAddressBook as BookIcon,
    FaCalendarCheck as CalCheckIcon,
    FaCalendarPlus as CalPlusIcon,
    FaClipboard as ClipIcon,
    FaRegSquare as UncheckedIcon,
    FaRegCheckSquare as CheckedIcon,
    FaRegTrashAlt as TrashIcon
} from "react-icons/fa";
import NumberPicker from "./NumberPicker";
import Table from "./Table";

const GoalForm = (props) => {
    const goal = props.goal || null;
    const updateGoal = props.updateGoal || null;

    const [warning, setWarning] = useState("");
    const warningMessage = "You've deleted a benchmark that had associated trial data. Clicking confirm will make these changes permanent. Click cancel to undo.";

    const updateBenchmark = (index, event, key) => {
        let val = event.currentTarget.value;
        let bm = {...goal.benchmarks[index], [key]: val, label: `Benchmark ${alphabet[index]}.`};
        let bms = [...goal.benchmarks];
        bms.splice(index, 1, bm);
        updateGoal({ ...goal, benchmarks: [...bms] });
    };

    const deleteSpecificBenchmark = (index) => {
        //delete the specified benchmark then update the remaining labels to the correct letter
        let bms = [...goal.benchmarks];
        bms.splice(index, 1);
        bms = bms.map((bm, i) => {
            return {...bm, label: `Benchmark ${alphabet[i]}.`};
        });
        updateGoal({...goal, benchmarks: [...bms]});
        if(goal && goal.benchmarks[index].enabled)
            setWarning(warningMessage);
    };

    const updateGoalLogic = (e, key, monitor) => {
        updateGoal({...goal, [key]: (key === "monitor" ? monitor : e.currentTarget.value)});
    };

    const adjustBenchmarkCount = (objArray) => {
        goal.benchmarks.forEach((obj, ind) => {
            if(obj.enabled && !objArray[ind]?.enabled)
                setWarning(warningMessage);
        })
        updateGoal({...goal, benchmarks: objArray});
    };

    const benchmark = {
        label: "",
        description: "",
        masteryDate: "",
        tracking: ""
    };

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    return (
        <div className={""}>
            <div className={"marg-bot-2"}>
                <h3 className={"i-bottom"}>Goal name</h3>
                <label>
                    <BookIcon className={"label-i"}/>
                    <input
                        placeholder={"Name"}
                        value={goal?.goalName || ""}
                        onChange={(e) => {updateGoalLogic(e, "goalName")}}
                        autoFocus
                    />
                </label>
            </div>

            <div className={"marg-bot-2"}>
                <h3 className={"i-bottom"}>Goal</h3>
                <label>
                    <BookIcon className={"label-i"}/>
                    <input placeholder={"Goal"}  value={goal?.goal || ""} onChange={(e) => {updateGoalLogic(e, "goal")}}/>
                </label>
            </div>

            <div className={"marg-bot-2"}>
                <h3 className={"i-bottom"}>Projected mastery date</h3>
                <label>
                    <CalCheckIcon className={"label-i"}/>
                    <input placeholder={"MM/DD/YYYY"} value={goal?.masteryDate || ""} onChange={(e) => {updateGoalLogic(e, "masteryDate")}}/>
                </label>
            </div>

            <div className={"marg-bot-2"}>
                <h3 className={"i-bottom"}>Start date</h3>
                <label>
                    <CalPlusIcon className={"label-i"}/>
                    <input placeholder={"MM/DD/YYYY"} value={goal?.startDate || ""} onChange={(e) => {updateGoalLogic(e, "startDate")}}/>
                </label>
            </div>

            <div className={"marg-bot-2"}>
                <h3 className={"i-bottom flex-center-vert"}>Monitor after mastery?
                {
                    goal?.monitor
                        ? <CheckedIcon
                            tabIndex={0}
                            className={"i-left selectable"}
                            onClick={() => {updateGoalLogic(null, "monitor", 0)}}
                            onKeyPress={(e) => {
                                if (e.key === "Enter")
                                    updateGoalLogic(null, "monitor", 0)
                            }}
                        />
                        : <UncheckedIcon
                            tabIndex={0}
                            className={"i-left selectable"}
                            onClick={() => {updateGoalLogic(null, "monitor", 1)}}
                            onKeyPress={(e) => {
                                if (e.key === "Enter")
                                    updateGoalLogic(null, "monitor", 1)
                            }}
                        />
                }
                </h3>
            </div>

            <div className={"marg-bot-2"}>
                <h3 className={"i-bottom"}>How to implement goal</h3>
                <label>
                    <ClipIcon className={"label-i"}/>
                    <input placeholder={"Process"}  value={goal?.process || ""} onChange={(e) => {updateGoalLogic(e, "process")}}/>
                </label>
            </div>

            <div className={"marg-bot-2"}>
                <h3 className={"i-bottom"}>Benchmarks</h3>
                <div className={"marg-bot-2"}>
                    <NumberPicker
                        updateState={adjustBenchmarkCount}
                        limit={26}
                        object={benchmark}
                        objectArray={goal?.benchmarks}
                    />
                </div>
                <Table headers={["Label", "Benchmark", "Mastery Date", "Tracking Type"]}>
                    <div>
                        {
                            goal?.benchmarks?.map((benchmark, ind) => {
                                return (
                                    <div key={"benchmark"+ind} className={"tr"}>
                                        <div className="td">
                                            <strong>Benchmark {alphabet[ind]}.</strong>
                                            <TrashIcon
                                                className={"selectable hover-color"}
                                                onClick={() => {
                                                    deleteSpecificBenchmark(ind);
                                                }}
                                            />
                                        </div>
                                        <div className="td">
                                            <input
                                                onChange={(e) => {
                                                    updateBenchmark(ind, e, "description")
                                                }}
                                                key={`desc${ind}`}
                                                placeholder='Benchmark'
                                                value={goal?.benchmarks[ind]?.description}
                                            />
                                        </div>
                                        <div className="td">
                                            <input
                                                onChange={(e) => {
                                                    updateBenchmark(ind, e, "masteryDate");
                                                }}
                                                key={`masterydate${ind}`}
                                                placeholder='MM/DD/YYYY'
                                                value={goal?.benchmarks[ind]?.masteryDate}
                                            />
                                        </div>
                                        <div className="td">
                                            <select
                                                key={`tracktype${ind}`}
                                                onChange={(e) => {
                                                    updateBenchmark(ind, e, "tracking")
                                                }}
                                                value={goal?.benchmarks[ind]?.tracking}
                                            >
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

            {
                goal && warning !== ""
                    ? <p className={"incomp-color"}>{warning}</p>
                    : <></>
            }

        </div>
    )
};

export default GoalForm;