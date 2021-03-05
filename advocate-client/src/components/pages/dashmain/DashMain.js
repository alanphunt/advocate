import React from "react";
import GetStarted from "components/atoms/GetStarted";
import ProfileCard from "components/atoms/ProfileCard";
import DashWidget from "components/molecules/DashWidget";
import GoalsToMonitor from "components/molecules/GoalsToMonitor";
import DashCard from "components/molecules/DashCard";
import { useAuth } from "utils/auth/AuthHooks";
import ClassroomWidget from "components/molecules/dashWidgets/ClassroomWidget";

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
                    <ProfileCard teacher={{...teacher.teacher, dateCreated: teacher.accountDetails.dateCreated}}/>
                </DashWidget>
                {
                    Object.values(classrooms).length === 0
                        ? createClass()
                        : <ClassroomWidget classrooms={teacher.classrooms} students={teacher.students}/>
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