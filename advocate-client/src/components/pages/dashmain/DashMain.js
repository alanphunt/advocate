import React from "react";
import GetStarted from "components/atoms/GetStarted";
import ProfileCard from "components/atoms/ProfileCard";
import DashWidget from "components/molecules/DashWidget";
import GoalsToMonitor from "components/molecules/GoalsToMonitor";
import DashCard from "components/molecules/DashCard";
import { studentViewObject } from "utils/functions/functions";
import TableAccordionGroup from "components/molecules/TableAccordionGroup";
import { BASIC_STUDENT_TABLE_HEADERS } from "utils/constants";

const DashMain = ({teacher}) => {
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
                    <ProfileCard teacher={teacher}/>
                </DashWidget>
                {
                    classrooms.length === 0
                        ? createClass()
                        : <DashWidget
                            flexSize={2}
                            header={"Classrooms"}
                          >
                              <TableAccordionGroup
                                    accordionHeaders={teacher.classrooms.map(cr => cr.className)}
                                    tableHeaders={BASIC_STUDENT_TABLE_HEADERS}
                                    tableData={teacher.classrooms.map(cr => cr.students.map(stu => studentViewObject(stu)))}
                                    openIndex={0}
                              />
                          </DashWidget>
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