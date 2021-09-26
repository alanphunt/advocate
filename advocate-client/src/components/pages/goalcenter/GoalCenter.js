import React, {useState} from "react";
import DashCard from "components/molecules/DashCard";
import { useAuth } from "utils/auth/AuthHooks";
import Row from "components/atoms/Row";
import ColDivider from "components/atoms/ColDivider";
import GoalCenterClassrooms from "components/molecules/GoalCenterClassrooms";
import GoalCenterDrilldown from "components/molecules/table/GoalCenterDrilldown";

/*
    notes:
    we have to use IDs in state because if we store objects that we plan on updating the teacher object will get updated but
    local state will stay the same.
*/
const GoalCenter = ({modalAction, closeModal, setModalAction, setModalBody, setToasterText}) =>{
  const {teacher, setTeacher, signout} = useAuth();

  const [studentId, setStudentId] = useState("");

  return (
    <DashCard fitOnPage>
      <Row gap={[0, "1rem"]} wrap={false} height={"100%"}>
        <GoalCenterClassrooms
          studentId={studentId}
          setStudentId={setStudentId}
        />
        <ColDivider/>
        <GoalCenterDrilldown
          studentId={studentId}
          teacher={teacher}
          modalAction={modalAction}
          setModalAction={setModalAction}
          setModalBody={setModalBody}
          setToasterText={setToasterText}
          setTeacher={setTeacher}
          closeModal={closeModal}
          signout={signout}
          setStudentId={setStudentId}
        />
      </Row>
    </DashCard>
  )
};

export default GoalCenter;