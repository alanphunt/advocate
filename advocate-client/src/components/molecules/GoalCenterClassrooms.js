import React from "react";
import Col from "components/atoms/Col";
import H2 from "components/atoms/H2";
import TableAccordionGroup from "./table/TableAccordionGroup";
import AccordionItem from "../atoms/AccordionItem";
import TableTest from "./table/TableTest";
import Box from "components/atoms/Box";
import {mapStudentGoalMeta} from "utils/functions/functions";

const GoalCenterClassrooms = ({studentId, setStudentId, hasClassroomWithStudents, teacher}) => {
  const {students, classrooms, goals, benchmarks} = teacher;
  const handleSelectedStudent = (student) => setStudentId(student.id);

  const columns = [
    {
      title: "Name",
      dataIndex: "name"
    },
    {
      title: "Goal Count",
      dataIndex: "goalCount"
    },
    {
      title: "Goal Completion",
      dataIndex: "completion"
    }
  ]
  const renderTableData = (classroom) => classroom.studentIds.map(id => mapStudentGoalMeta(students[id],
    students[id].goalIds.map(goalId => goals[goalId])
      .map(goal => ({...goal, benchmarks: goal.benchmarkIds.map(bmId => benchmarks[bmId])}))
  ))

  return (
    <Col span={8} classes={"col-padding"}>
      <H2 margin>Select a student to begin</H2>
      {
        hasClassroomWithStudents
          ? (
            <TableAccordionGroup>
              {
                Object.values(classrooms).map((classroom, classroomIndex) => {
                  return (
                    <AccordionItem header={`${classroom.className} - (${classroom.studentIds.length})`} preOpened key={`accItem-${classroom.className}`}>
                      <TableTest
                        columns={columns}
                        data={renderTableData(classroom)}
                        selectedCallback={(student, studentIndex) => handleSelectedStudent(student, studentIndex, classroomIndex)}
                        selectedId={studentId}
                      />
                    </AccordionItem>
                  )
                })
              }
            </TableAccordionGroup>
          ) : <Box text={"No classrooms. Visit the classroom page to create a classroom."}/>
      }
    </Col>
  );
};

export default GoalCenterClassrooms;