import React from "react";
import GetStarted from "components/atoms/GetStarted";
import ProfileCard from "components/atoms/ProfileCard";
import DashWidget from "components/molecules/DashWidget";
import GoalsToMonitor from "components/molecules/GoalsToMonitor";
import DashCard from "components/molecules/DashCard";
import TableAccordionGroup from "components/molecules/table/TableAccordionGroup";
import { BASIC_STUDENT_TABLE_HEADERS } from "utils/constants";
import { useAuth } from "utils/auth/AuthHooks";
import AccordionItem from "components/atoms/AccordionItem";
import Table from "components/molecules/table/Table";

const DashMain = () => {
    const {teacher} = useAuth();
    const classrooms = teacher.classrooms;

    const createClass = () => {
        return (
            <DashWidget flexSize={1}>
                <GetStarted to={"/dashboard/classroom"}>
                    <h2>Get started by creating a classroom</h2>
                </GetStarted>
            </DashWidget>
        )
    };

    return (
        <DashCard>
            <div className={"cardwrapperrow"}>
                <DashWidget flexSize={1}>
                    <ProfileCard teacher={teacher.teacher}/>
                </DashWidget>
                {
                    Object.values(classrooms).length === 0
                        ? createClass()
                        : (
                            <DashWidget flexSize={2} header={"Classrooms"}>
                                <TableAccordionGroup>
                                    {
                                        Object.values(teacher.classrooms).map((classroom, index) => {
                                            return (
                                                <AccordionItem header={classroom.className} key={`dashmainClassroom-${classroom.className}`}>
                                                    <Table
                                                        tableData={Object.values(teacher.students).filter(stu => stu.classroomId === classroom.id)}
                                                        headers={BASIC_STUDENT_TABLE_HEADERS}
                                                        dataKeys={["name", "age", "grade"]}
                                                    />
                                                </AccordionItem>
                                            )
                                        })
                                    }
                                </TableAccordionGroup>
                            </DashWidget>
                        )
                }
            </div>
            <div className={"cardwrapperrow"}>
                <DashWidget
                    flexSize={.5}
                    header={"Mastered goals to monitor"}
                >
                    <GoalsToMonitor
                        teacher={teacher}
                    />
                </DashWidget>
            </div>
        </DashCard>
    );
};

export default DashMain;