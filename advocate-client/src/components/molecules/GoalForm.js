import React, {useState, useEffect} from "react";
import {
  FaAddressBook as BookIcon,
  FaCalendarCheck as CalCheckIcon,
  FaCalendarPlus as CalPlusIcon,
  FaRegTrashAlt as TrashIcon,
  FaRegCopy as CopyIcon } from "react-icons/fa";
import NumberPicker from "components/atoms/NumberPicker";
import FormElement from "components/atoms/FormElement";
import Section from "components/atoms/Section";
import Table from "./table/Table";
import TextArea from "./TextArea";
import {benchmarkModel, templateOptionsModel} from "utils/models";
import RequiredField from "components/atoms/RequiredField";
import ErrorLabel from "components/atoms/ErrorLabel";
import TextAreaForTable from "./TextAreaForTable";
import { convertFromRaw, EditorState } from 'draft-js';
import Checkbox from "./Checkbox";
import TableCell from "components/atoms/table/TableCell";
import TableRow from "components/atoms/table/TableRow";
import Select from "components/atoms/Select";

const GoalForm = ({mutableGoal, setMutableGoal, formErrors}) => {
  useEffect(() => {
    try{
      let parsedBenchmarks = mutableGoal.benchmarks.map(bm =>{
        return {...bm, description: EditorState.createWithContent(convertFromRaw(JSON.parse(bm.description)))}
      });
      setMutableGoal({...mutableGoal, goal: EditorState.createWithContent(convertFromRaw(JSON.parse(mutableGoal.goal))), benchmarks: parsedBenchmarks});
    }catch(e){console.log("couldn't parse editorstate")}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const [focused, setFocused] = useState(-1);
  
  const [warning, setWarning] = useState("");
  const warningMessage = "You've deleted a benchmark that had associated trial data. Clicking confirm will make these changes permanent. Click cancel to undo.";
  
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  
  const adjustBenchmarkCount = (objArray) => {
    mutableGoal.benchmarks.forEach((obj, ind) => {
      if(obj.enabled && !objArray[ind]?.enabled)
        setWarning(warningMessage);
    })
    setMutableGoal({...mutableGoal, benchmarks: [...objArray]});
  };
  
  const copySpecificBenchmark = (benchmark) => {
    setMutableGoal({...mutableGoal, benchmarks: mutableGoal.benchmarks.concat(benchmark)})
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
  
  const updateBenchmark = (index, event, key) => {
    let val = key === "description" ? event : event.currentTarget.value;
    let bms = [...mutableGoal.benchmarks];
    let bm = {...bms[index], [key]: val, label: `Benchmark ${alphabet[index]}.`};
    bms.splice(index, 1, bm);
    setMutableGoal({ ...mutableGoal, benchmarks: [...bms]});
  };
  
  const updateGoalLogic = (e, key, monitor) => {
    if(key !== "goal")
      setMutableGoal({...mutableGoal, [key]: (key === "monitor" ? monitor : e.currentTarget.value)});
    else{
      setMutableGoal({...mutableGoal, goal: e});
    }
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
        <h3 className={"i-bottom"}><RequiredField/>Goal</h3>
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
          value={mutableGoal.startDate || ""}
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
        <Checkbox
          text={"Monitor after mastery?"}
          condition={mutableGoal?.monitor}
          updateCondition={(updatedCondition) => updateGoalLogic(null, "monitor", updatedCondition ? 1 : 0)}
        />
      </Section>
      
      <Section>
        <h3 className={"i-bottom"}>Benchmarks</h3>
        <Section>
          <NumberPicker
            updateState={adjustBenchmarkCount}
            limit={26}
            object={benchmarkModel}
            objectArray={mutableGoal.benchmarks}
          />
        </Section>
        <Table
          columnSize={{0: "flex-half"}}
          hideSearchAndSort
          headers={[<span><RequiredField/>Label</span>, <span><RequiredField/>Benchmark</span>, <span><RequiredField/>Mastery Date</span>, <span><RequiredField/>Tracking Type</span>]}>
          {
            mutableGoal.benchmarks?.map((benchmark, ind) => {
              let label = `Benchmark ${alphabet[ind]}`;
              return (
                <TableRow key={"benchmark"+ind}>
                  <TableCell classes="flex-half">
                    <strong>{label}</strong>
                    <div>
                      <CopyIcon
                        className={"selectable hover-color i-right"}
                        onClick={() => {
                          copySpecificBenchmark({...benchmark, label: `Benchmark ${alphabet[mutableGoal.benchmarks.length]}`, id: "", metDate: "", complete: 0});
                        }}/>
                      <TrashIcon
                        className={"selectable hover-color"}
                        onClick={() => {
                          deleteSpecificBenchmark(ind);
                        }}/>
                    </div>
                  </TableCell>
                  <TableCell>
                    <TextAreaForTable
                      placeholder="Benchmark Description"
                      editorState={benchmark.description}
                      setEditorState={(es) => updateBenchmark(ind, es, "description")}
                      focused={focused === ind}
                      index={ind}
                      setFocused={setFocused}
                    />
                  </TableCell>
                  <TableCell>
                    <FormElement
                      onChange={(e) => updateBenchmark(ind, e, "masteryDate")}
                      placeholder='MM/DD/YY'
                      value={benchmark.masteryDate}
                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      value={benchmark.tracking}
                      onChange={(e) => updateBenchmark(ind, e, "tracking")}
                      mapping={templateOptionsModel}
                    />
                  </TableCell>
                </TableRow>
              )
            })
          }
        </Table>
        <ErrorLabel text={formErrors?.benchmarks}/>
      </Section>
      
      {
        mutableGoal && warning !== ""
          ? <ErrorLabel text={warning}/>
          : <></>
      }
    </div>
  )
};

export default GoalForm;