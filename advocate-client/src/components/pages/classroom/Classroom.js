import React from 'react';
import DashCard from "components/molecules/DashCard";
import {editDeleteIcons} from 'utils/functions/functions';
import TableAccordionGroup from 'components/molecules/table/TableAccordionGroup';
import {FaPlus as PlusIcon} from "react-icons/fa";
import Button from 'components/atoms/Button';
import {STUDENT_COLUMNS} from 'utils/constants';
import Section from 'components/atoms/Section';
import Box from 'components/atoms/Box';
import AccordionItem from 'components/atoms/AccordionItem';
import TableTest from "components/molecules/table/TableTest";
import useClassroom from "./useClassroom";

const Classroom = ({modalAction, closeModal, setModalAction, setModalBody, setToasterText, isLoading, setIsLoading}) => {
  const {classrooms, teacher, handleIconClick, renderTableData} = useClassroom({
    modalAction,
    setModalAction,
    closeModal,
    setModalBody,
    setToasterText,
    isLoading,
    setIsLoading
  });

  return (
    <DashCard>
      <Section>
        <Button
          text="Create new class"
          icon={<PlusIcon/>}
          onClick={() => setModalAction("create")}
        />
      </Section>
      {
        classrooms.length
          ? (
            <TableAccordionGroup>
              {
                classrooms.map((cr, ind) => {
                  return (
                    <AccordionItem
                      key={`accItem-${cr.className}`}
                      header={cr.className}
                      preOpened
                      icons={editDeleteIcons()}
                      iconClickedCallback={(action) => handleIconClick(action, cr)}
                    >
                      {
                        cr.studentIds.length
                          ? (
                            <TableTest
                              columns={STUDENT_COLUMNS}
                              data={renderTableData(cr.studentIds.map(id => teacher.students[id]))}
                            />
                          ) : (
                            <Box key={`noStudentsBox-${ind}`} text="No students. Click the edit button to add students."/>
                          )
                      }
                    </AccordionItem>
                  ) } )}
            </TableAccordionGroup>
          ) : <Box text="No classrooms! Click the Create Classroom button to add a classroom."/>
      }
    </DashCard>
  )
}

export default Classroom;
