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
import FormElement from "../../SharedComponents/FormElement";

const GoalForm = (props) => {
    const goal = props.goal || null;
    console.log(goal);
    const updateGoal = props.updateGoal || null;
    const formErrors = props.formErrors || null;

    const [warning, setWarning] = useState("");
    const warningMessage = "You've deleted a benchmark that had associated trial data. Clicking confirm will make these changes permanent. Click cancel to undo.";

    const benchmark = {
        label: "",
        description: "",
        masteryDate: "",
        tracking: ""
    };

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

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

    return (
        <div>
            <div className={"marg-bot-2"}>
                <FormElement
                    label={"Goal Name"}
                    placeholder={"Name"}
                    icon={<BookIcon/>}
                    value={goal?.goalName || ""}
                    onChange={(e) => {updateGoalLogic(e, "goalName")}}
                    errorMessage={formErrors?.goalName}
                />
            </div>

            <div className={"marg-bot-2"}>
                <FormElement
                    icon={<BookIcon/>}
                    placeholder={"Goal"}
                    label={"Goal"}
                    value={goal?.goal || ""}
                    onChange={(e) => {updateGoalLogic(e, "goal")}}
                    errorMessage={formErrors?.goal}
                />
            </div>

            <div className={"marg-bot-2"}>
                <FormElement
                    label={"Projected Mastery Date"}
                    icon={<CalCheckIcon/>}
                    placeholder={"MM/DD/YYYY"}
                    value={goal?.masteryDate || ""}
                    onChange={(e) => {updateGoalLogic(e, "masteryDate")}}
                    errorMessage={formErrors?.masteryDate}
                />
            </div>

            <div className={"marg-bot-2"}>
                <FormElement
                    label={"Start Date"}
                    icon={<CalPlusIcon/>}
                    placeholder={"MM/DD/YYYY"}
                    value={goal?.startDate || ""}
                    onChange={(e) => {updateGoalLogic(e, "startDate")}}
                    errorMessage={formErrors?.startDate}
                />
            </div>

            <div className={"marg-bot-2"}>
                <FormElement>
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
                </FormElement>
            </div>

            <div className={"marg-bot-2"}>
                <FormElement
                    label={"How to implement goal"}
                    icon={<ClipIcon/>}
                    placeholder={"Process"}
                    value={goal?.process || ""}
                    onChange={(e) => {updateGoalLogic(e, "process")}}
                    errorMessage={formErrors?.process}
                />
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
                {
                    formErrors?.benchmarks
                        ? <p className={"inputerror marg-bot"}>{formErrors?.benchmarks}</p>
                        : <></>
                }
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