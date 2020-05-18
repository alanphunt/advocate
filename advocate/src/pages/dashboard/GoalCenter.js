import React, {useState} from "react";
import Accordion from "./components/accordion/Accordion";
import Table from "./components/Table";
import GoalDrilldown from "./components/GoalDrilldown";
import Modal, {exitModal} from "../Modal";
import CreateTrial from "./components/CreateTrial.js"

const GoalCenter = (props) =>{

    const [selectedStudentIndex, setSelectedStudentIndex] = useState(999);
    const [selectedClassroomIndex, setSelectedSClassroomIndex] = useState(999);

    let selectedStudent = props.teacher.classrooms[selectedClassroomIndex]?.students[selectedStudentIndex];

    const handleSelected = (stu, ind, crind) => {
        setSelectedStudentIndex(ind);
        setSelectedSClassroomIndex(crind);
    };

    const [displayModal, setDisplayModal] = useState(false);
    const [selectedBenchmark, setSelectedBenchmark] = useState();

    const [template, setTemplate] = useState("");

    return (
        <div className={"dash-main-inner width-100 height-100"} onClick={e => {
            exitModal(e, displayModal, () => {
                setDisplayModal(prevState => !prevState);
                setTemplate("");
            });
        }}>
            <Modal displayed={displayModal} large>
                <CreateTrial benchmark={selectedBenchmark} template={template} setTemplate={setTemplate} student={selectedStudent}/>
            </Modal>
            <div className={"card height-50 marg-bot"}>
                <div className={"cardheader"}><h2>Goal Center</h2></div>
                <div className={"cardmain"}>
                    <Accordion open={true} array={props.teacher.classrooms} name={props.teacher.classrooms.map(cr => cr.className)}>
                        {
                            props.teacher.classrooms.map((cr, crind) =>
                                <Table
                                    selectable={true}
                                    selectedCallback={(stu, ind) => {
                                        handleSelected(stu, ind, crind);
                                    }}
                                    selectedRowIndexes={selectedClassroomIndex === crind ? selectedStudentIndex : 999}
                                    headers={["Name", "Goal Focus", "Goal Count", "Goal Completion %"]}
                                    key={"studentgoaltable"+crind}
                                    data={studentGoalMeta(cr.students)}
                                />
                            )
                        }
                    </Accordion>
                </div>
            </div>
            <div className={"card height-50"}>
                <GoalDrilldown
                    handleModal={(bm) => {
                        setDisplayModal(prevState => !prevState);
                        setSelectedBenchmark(bm);
                    }}
                    key={"drilldownfor"+selectedStudent?.name}
                    student={selectedStudent}/>
            </div>
        </div>
    )
};

export const calculateGoalCompletion = (student) => {
    const goals = student.goals;
    const goalCount = goals.length || 0;
    const completedGoals = goals.filter(goal => goal.benchmarks.filter(bm => bm.complete === 1).length === goal.benchmarks.length).length;
    let percent = Math.round((completedGoals / goalCount) * 100);
    return isNaN(percent) ? 0 : percent;
};

export const studentGoalMeta = (students) => {
    return students.map(student => {
        return {name: student.name, goalFocus: student.goalFocus, goalCount: student.goals.length, completion: `${calculateGoalCompletion(student)}%`};
    });
};

export default GoalCenter;