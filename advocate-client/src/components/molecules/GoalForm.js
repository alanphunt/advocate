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
import NumberPicker from "components/atoms/NumberPicker";
import FormElement from "components/atoms/FormElement";
import Section from "components/atoms/Section";
import NewTable from "./NewTable";

const GoalForm = (props) => {
    const goal = props.goal || null;
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
            <Section>
                <FormElement
                    label={"Goal Name"}
                    placeholder={"Name"}
                    icon={<BookIcon/>}
                    value={goal?.goalName || ""}
                    onChange={(e) => {updateGoalLogic(e, "goalName")}}
                    errorMessage={formErrors?.goalName}
                    autoFocus
                />
            </Section>
            
            <Section>
                <FormElement
                    icon={<BookIcon/>}
                    placeholder={"Goal"}
                    label={"Goal"}
                    value={goal?.goal || ""}
                    onChange={(e) => {updateGoalLogic(e, "goal")}}
                    errorMessage={formErrors?.goal}
                />
            </Section>

            <Section>
                <FormElement
                    label={"Projected Mastery Date"}
                    icon={<CalCheckIcon/>}
                    placeholder={"MM/DD/YYYY"}
                    value={goal?.masteryDate || ""}
                    onChange={(e) => {updateGoalLogic(e, "masteryDate")}}
                    errorMessage={formErrors?.masteryDate}
                />
            </Section>

            <Section>
                <FormElement
                    label={"Start Date"}
                    icon={<CalPlusIcon/>}
                    placeholder={"MM/DD/YYYY"}
                    value={goal?.startDate || ""}
                    onChange={(e) => {updateGoalLogic(e, "startDate")}}
                    errorMessage={formErrors?.startDate}
                />
            </Section>

            <Section>
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
            </Section>

            <Section>
                <FormElement
                    label={"How to implement goal"}
                    icon={<ClipIcon/>}
                    placeholder={"Process"}
                    value={goal?.process || ""}
                    onChange={(e) => {updateGoalLogic(e, "process")}}
                    errorMessage={formErrors?.process}
                />
            </Section>

            <Section>
                <h3 className={"i-bottom"}>Benchmarks</h3>
                <Section>
                    <NumberPicker
                        updateState={adjustBenchmarkCount}
                        limit={26}
                        object={benchmark}
                        objectArray={goal?.benchmarks}
                    />
                </Section>
                {
                    formErrors?.benchmarks
                        ? <p className={"inputerror marg-bot"}>{formErrors?.benchmarks}</p>
                        : <></>
                }
                <NewTable headers={["Label", "Benchmark", "Mastery Date", "Tracking Type"]}>
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
                </NewTable> 
            </Section>

            {
                goal && warning !== ""
                    ? <p className={"incomp-color"}>{warning}</p>
                    : <></>
            }

        </div>
    )
};

export default GoalForm;