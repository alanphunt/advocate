import React from "react";
import GetStarted from "components/atoms/GetStarted";
import ProfileCard from "components/atoms/ProfileCard";
import Accordion from "components/molecules/Accordion";
import DashWidget from "components/molecules/DashWidget";
import GoalsToMonitor from "components/molecules/GoalsToMonitor";
import DashCard from "components/molecules/DashCard";
import StudentTable from "components/molecules/StudentTable";

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
        <DashCard noCanvas>
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
                            <Accordion
                                openIndex={0}
                                array={teacher.classrooms}
                                data={teacher.classrooms.map(cr => cr.className)}
                            >
                                {
                                    teacher.classrooms.map((cr, crInd) =>
                                        <StudentTable
                                            key={`dashmaintable${crInd}`}
                                            data={cr.students}
                                        />
                                    )
                                }
                            </Accordion>
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