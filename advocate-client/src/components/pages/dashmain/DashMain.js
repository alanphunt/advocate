import React from "react";
import GetStarted from "components/singletons/GetStarted";
import ProfileCard from "components/singletons/ProfileCard";
import Table from "components/collectives/Table";
import Accordion from "components/collectives/Accordion";
import DashWidget from "components/collectives/DashWidget";
import GoalsToMonitor from "components/collectives/GoalsToMonitor";
import DashCard from "components/collectives/DashCard";

const DashMain = props => {
    const teacher = props.teacher;
    const classrooms = teacher.classrooms;
    const createClass = () => {
        return (
            <DashWidget flexSize={1}>
                <GetStarted to={"/dashboard/classroom/create"}>
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
                                        <Table
                                            studentTable={true}
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