import React, {useEffect, useRef, useState} from "react";
import Accordion from "./components/accordion/Accordion";
import Table from "./components/Table";
import GoalDrilldown from "./components/GoalDrilldown";
import Modal, {exitModal} from "../SharedComponents/Modal";
import CreateTrial from "./components/CreateTrial.js"
import CompleteBenchmark from "./components/CompleteBenchmark";
import Toaster from "../SharedComponents/Toaster";

const GoalCenter = (props) =>{

    const [selectedStudentIndex, setSelectedStudentIndex] = useState();
    const [selectedClassroomIndex, setSelectedSClassroomIndex] = useState();

    let selectedStudent = props.teacher.classrooms[selectedClassroomIndex]?.students[selectedStudentIndex];
    const updateTeacher = props.updateTeacher;

    const handleSelected = (stu, ind, classInd) => {
        setSelectedStudentIndex(ind);
        setSelectedBenchmark(null);
        setSelectedSClassroomIndex(classInd);
    };

    const [displayModal, setDisplayModal] = useState(false);
    const [displayToaster, setDisplayToaster] = useState(false);
    const [selectedBenchmark, setSelectedBenchmark] = useState();

    //since the trial modal child will be reused it has to be reset
    const [template, setTemplate] = useState("");
    //the content of the modal depending on what event triggered it
    const [modalChild, setModalChild] = useState();

    const [selectedGoalIndex, setSelectedGoalIndex] = useState();


    const closeModal = (evt) => {
        exitModal(evt, displayModal, () => {
            setDisplayModal(prevState => !prevState);
            setTemplate("");
        });
    };


    return (
        <div className={"dash-main-inner width-100 height-100"} onClick={evt => {
            closeModal(evt);
        }}>
            <Toaster display={displayToaster}/>
            <Modal displayed={displayModal} large={modalChild==="createTrial"}>
                {
                    modalChild === "createTrial"
                        ? <CreateTrial
                            benchmark={selectedBenchmark}
                            template={template}
                            setTemplate={setTemplate}
                            student={selectedStudent}
                            updateTeacher={updateTeacher}
                        />
                        : modalChild === "completeBenchmark"
                        ? <CompleteBenchmark
                            benchmark={selectedBenchmark}
                            updateTeacher={updateTeacher}
                            closeModal={closeModal}
                            benchmarkParentGoal={selectedStudent.goals[selectedGoalIndex]}
                            setModalChild={setModalChild}
                        />
                        : <></>
                }
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
                    handleModal={(child) => {
                        setModalChild(child);
                        setDisplayModal(prevState => !prevState);
                    }}
                    benchmark={selectedBenchmark}
                    setBenchmark={bm => {
                        setSelectedBenchmark(bm);
                    }}
                    selectedGoalIndex={selectedGoalIndex}
                    setSelectedGoalIndex={setSelectedGoalIndex}
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

export const isGoalComplete = (goal) => {
    return checkIncompleteBenchmarks(goal) === 0;
};

export const checkIncompleteBenchmarks = (goal) => {
    return goal.benchmarks.filter(bm => bm.complete === 0).length;
};

export default GoalCenter;