import React, {useEffect} from "react";
import TableAccordionGroup from "./table/TableAccordionGroup";
import AccordionItem from "components/atoms/AccordionItem";
import Table from "./table/Table";
import {mapStudentGoalMeta} from "utils/functions/functions";
import Box from "components/atoms/Box";
import Button from "components/atoms/Button";
import {FaPlus as PlusIcon} from "react-icons/fa";
import BaselineDrilldown from "components/molecules/drilldown/BaselineDrilldown";

const GoalCenterTopRow = ({baseline, setBaseline, setMutableBaseline, teacher, student, setStudentId, setModalAction}) => {
  const {students, classrooms, baselines, goals, benchmarks, trackings, documents} = teacher;
  const hasClassroomsWithStudents = !!Object.keys(students).length;
  const tableHeaders = ["Name", "Goal Count", "Goal Completion %"];
  const studentBaselines = Object.keys(baselines)
    .filter(key => student?.baselineIds.includes(key))
    .reduce((obj, key) => {
      return {
        ...obj,
        [key]: baselines[key]
      };
    }, {});
  
  useEffect(() => {
    //this is for creating a new goal and selecting a new student in the modal
    if(student) {
      let crIndex = -1;
      let stuIndex = -1;
      Object.values(classrooms).forEach((cr, crInd) => {
        if(cr.id === student.classroomId){
          crIndex = crInd;
          stuIndex = cr.studentIds.indexOf(student.id);
        }
      });
    }
  }, [student]);

  const handleSelectedStudent = (student, studentIndex, classroomIndex) => {
    setStudentId(student.id);
  };
  
  return (
    <div className={"goalcenter-row goalcenter-row-top"}>
      <div className={"drilldown-classroom flex-1"}>
        <h2 className={"marg-bot"}>Select a student to begin</h2>
        {
          hasClassroomsWithStudents
            ? (
              <TableAccordionGroup>
                {
                  Object.values(classrooms).map((classroom, classroomIndex) => {
                    return (
                      <AccordionItem header={`${classroom.className} - (${classroom.studentIds.length})`} preOpened key={`accItem-${classroom.className}`}>
                        <Table
                          headers={tableHeaders}
                          tableData={
                            classroom.studentIds.map(id => mapStudentGoalMeta(students[id],
                              students[id].goalIds.map(goalId => goals[goalId])
                                .map(goal => ({...goal, benchmarks: goal.benchmarkIds.map(bmId => benchmarks[bmId])}
                                ))))
                          }
                          selectedCallback={(student, studentIndex) => handleSelectedStudent(student, studentIndex, classroomIndex)}
                          selectedRowId={student?.id}
                        />
                      </AccordionItem>
                    )
                  })
                }
              </TableAccordionGroup>
            ) : <Box text={"No classrooms. Visit the classroom page to create a classroom."}/>
        }
      </div>
      <div className={"drilldown-baseline flex-1"}>
        <div className={"marg-bot-2 flex-center-between"}>
          <h2>Summary for {student ? student.name : "..."}</h2>
          <Button
            text="Create Baseline"
            icon={<PlusIcon className={"i-right"}/>}
            className={`${student?.name ? " enabled" : " disabled"}`}
            onClick={() => setModalAction("createBaseline")}
          />
        </div>
        {
          student ? (
            <BaselineDrilldown
              student={student}
              setModalAction={setModalAction}
              allBaselines={studentBaselines}
              documents={documents}
              trackings={trackings}
              baseline={baseline}
              setBaseline={setBaseline}
              setMutableBaseline={setMutableBaseline}
            />
          ) : <></>
        }
      </div>
    </div>
  );
};

export default GoalCenterTopRow;
