import React, {useState, useEffect} from "react";
import {
    FaAddressBook as BookIcon,
    FaCalendarCheck as CalCheckIcon,
    FaCalendarPlus as CalPlusIcon,
    FaRegSquare as UncheckedIcon,
    FaRegCheckSquare as CheckedIcon,
    FaRegTrashAlt as TrashIcon,
    FaRegCopy as CopyIcon } from "react-icons/fa";
import NumberPicker from "components/atoms/NumberPicker";
import FormElement from "components/atoms/FormElement";
import Section from "components/atoms/Section";
import Table from "./Table";
import TextArea from "./TextArea";
import {benchmarkModel} from "utils/models";
import RequiredField from "components/atoms/RequiredField";
import ErrorLabel from "components/atoms/ErrorLabel";
import TextAreaForTable from "./TextAreaForTable";
import { convertFromRaw, EditorState } from 'draft-js';

const GoalForm = ({mutableGoal, setMutableGoal, formErrors}) => {
    useEffect(() => {
        // if(goal.goal.getCurrentContent().hasText()){
            try{
                let parsedBenchmarks = mutableGoal.benchmarks.map(bm =>{
                    return {...bm, description: EditorState.createWithContent(convertFromRaw(JSON.parse(bm.description)))}
                });
                setMutableGoal({...mutableGoal, goal: EditorState.createWithContent(convertFromRaw(JSON.parse(mutableGoal.goal))), benchmarks: parsedBenchmarks});
            }catch(e){console.log("couldn't parse editorstate")}
        // }
    }, []);

    const [focused, setFocused] = useState(-1);

    const [warning, setWarning] = useState("");
    const warningMessage = "You've deleted a benchmark that had associated trial data. Clicking confirm will make these changes permanent. Click cancel to undo.";

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const updateBenchmark = (index, event, key) => {
        let val = key === "description" ? event : event.currentTarget.value;
        let bms = [...mutableGoal.benchmarks];
        let bm = {...bms[index], [key]: val, label: `Benchmark ${alphabet[index]}.`};
        bms.splice(index, 1, bm);
        setMutableGoal({ ...mutableGoal, benchmarks: [...bms]});
    };

    const deleteSpecificBenchmark = (index) => {
        //delete the specified benchmark then update the remaining labels to the correct letter
        let bms = [...mutableGoal.benchmarks];
        bms.splice(index, 1);
        bms = bms.map((bm, i) => {
            return {...bm, label: `Benchmark ${alphabet[i]}.`};
        });
        setMutableGoal({...mutableGoal, benchmarks: [...bms]});
        if(mutableGoal && mutableGoal.benchmarks[index].enabled)
            setWarning(warningMessage);
    };

    const updateGoalLogic = (e, key, monitor) => {
        if(key !== "goal")
            setMutableGoal({...mutableGoal, [key]: (key === "monitor" ? monitor : e.currentTarget.value)});
        else{
            setMutableGoal({...mutableGoal, goal: e});
        }
    };

    const adjustBenchmarkCount = (objArray) => {
        mutableGoal.benchmarks.forEach((obj, ind) => {
            if(obj.enabled && !objArray[ind]?.enabled)
                setWarning(warningMessage);
        })
        console.log(objArray);
        setMutableGoal({...mutableGoal, benchmarks: [...objArray]});
    };

    const copySpecificBenchmark = (benchmark) => {
        setMutableGoal({...mutableGoal, benchmarks: mutableGoal.benchmarks.concat(benchmark)})
    };

    return (
        <div>
            <Section>
                <FormElement
                    label={"Goal Name"}
                    placeholder={"Name"}
                    icon={<BookIcon/>}
                    value={mutableGoal.goalName}
                    onChange={(e) => {updateGoalLogic(e, "goalName")}}
                    errorMessage={formErrors?.goalName}
                    required
                    autoFocus
                />
            </Section>
            
            <Section>
                <h3 className={"marg-bot"}><RequiredField/>Goal</h3>
                {        
                    typeof mutableGoal.goal === "string"
                    ? <></>
                    :   <TextArea
                            editorState={mutableGoal.goal}
                            setEditorState={(editorState) => updateGoalLogic(editorState, "goal")}                     
                        />
                }
                <ErrorLabel text={formErrors?.goal}/>
            </Section>

            <Section>
                <FormElement
                    label={"Start Date"}
                    icon={<CalPlusIcon/>}
                    placeholder={"MM/DD/YY"}
                    value={mutableGoal.startDate}
                    onChange={(e) => {updateGoalLogic(e, "startDate")}}
                    errorMessage={formErrors?.startDate}
                />
            </Section>

            <Section>
                <FormElement
                    label={"Projected Mastery Date"}
                    icon={<CalCheckIcon/>}
                    placeholder={"MM/DD/YY"}
                    value={mutableGoal.masteryDate}
                    onChange={(e) => {updateGoalLogic(e, "masteryDate")}}
                    errorMessage={formErrors?.masteryDate}
                    required
                />
            </Section>

            <Section>
                <FormElement>
                    <h3 className={"i-bottom flex-center-vert"}>Monitor after mastery?
                        {
                            mutableGoal?.monitor
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
                <h3 className={"i-bottom"}><RequiredField/>Benchmarks</h3>
                <Section>
                    <NumberPicker
                        updateState={adjustBenchmarkCount}
                        limit={26}
                        object={benchmarkModel}
                        objectArray={mutableGoal.benchmarks}
                    />
                </Section>
                <Table
                    headers={["Label", "Benchmark", "Mastery Date", "Tracking Type"]}
                    requiredHeaderIndexes={[1,2,3]}
                >
                    {
                        mutableGoal?.benchmarks?.map((benchmark, ind) => {
                                return (
                                    <div key={"benchmark"+ind} className={"tr"}>
                                        <div className="td">
                                            <strong>Benchmark {alphabet[ind]}.</strong>
                                            <div>
                                                <CopyIcon
                                                    className={"selectable hover-color i-right"}
                                                    onClick={() => {
                                                        copySpecificBenchmark(benchmark);
                                                    }}/>
                                                <TrashIcon
                                                    className={"selectable hover-color"}
                                                    onClick={() => {
                                                        deleteSpecificBenchmark(ind);
                                                    }}/>
                                                </div>
                                        </div>
                                        <div className="td">
                                            <TextAreaForTable
                                                placeholder="Benchmark Description"
                                                editorState={benchmark.description}
                                                setEditorState={(es) => updateBenchmark(ind, es, "description")}
                                                focused={focused === ind}
                                                index={ind}
                                                setFocused={setFocused}
                                            />
                                        </div>
                                        <div className="td">
                                            <FormElement 
                                                onChange={(e) => updateBenchmark(ind, e, "masteryDate")}
                                                placeholder='MM/DD/YY'
                                                value={benchmark.masteryDate}
                                            />
                                        </div>
                                        <div className="td">
                                            <select
                                                onChange={(e) => {
                                                    updateBenchmark(ind, e, "tracking")
                                                }}
                                                value={benchmark.tracking}
                                            >
                                                <option>Select a type..</option>
                                                <option value={"score"}>Score</option>
                                                <option value={"accuracy"}>Accuracy</option>
                                                <option value={"trial"}>Trial</option>
                                                <option value={"frequency"}>Frequency</option>
                                                <option value={"duration"}>Duration</option>
                                                <option value={"other"}>Other</option>
                                            </select>
                                        </div>
                                    </div>
                                )
                            })
                    }
                </Table> 
                <ErrorLabel text={formErrors?.benchmarks}/>
            </Section>

            {
                mutableGoal && warning !== ""
                    ? <p className={"incomp-color"}>{warning}</p>
                    : <></>
            }

        </div>
    )
};

export default GoalForm;