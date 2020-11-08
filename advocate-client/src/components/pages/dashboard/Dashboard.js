import React, {useState, useEffect} from 'react';
import Sidebar from "components/collectives/Sidebar";
import {Redirect, Route, Switch} from "react-router-dom";
import DashMain from "components/pages/dashmain/DashMain";
import Classroom from "components/pages/classroom/Classroom";
import Charts from "components/pages/charts/Charts";
import GoalCenter from "components/pages/goalcenter/GoalCenter";
import Profile from "components/pages/profile/Profile";
import CreateClassroom from "components/pages/createclassroom/CreateClassroom";
import CreateGoal from "components/pages/creategoal/CreateGoal";
import Loading from "components/singletons/Loading";
import {SERVER_ERROR} from "utils/constants";

const Dashboard = ({teacher, updateTeacher, failedToRetrieveTeacher, logout, logoutWithAlert}) => {
    console.log(teacher);

    let path = window.location.pathname.split("/")[2];
    const [activeCategory, setActiveCategory] = useState(path);
    const hasClassroomsWithStudents = teacher?.classrooms?.length > 0 && teacher?.classrooms[0].students.length > 0;

    const refreshDataFromComponents = async () => {
        let resp = await fetch("/api/teacher");
        if (!resp.ok)
            throw new Error(SERVER_ERROR);
        else
            await resp.json().then(data => {
                updateTeacher(data);
            });
    };

    useEffect(() => {
        if (!teacher && !failedToRetrieveTeacher) {
            console.log("rehydrating data..");
            refreshDataFromComponents().catch(e => {
                logoutWithAlert();
            });
        }
    }, []);

    const handleChange = (e) => {
        setActiveCategory(e.replace(" ", ""));
    };

    return (
        <div className={"dashboardwrapper"}>
            {
                teacher && !failedToRetrieveTeacher
                    ? <>
                        <Sidebar
                            teacher={teacher}
                            logout={logout}
                            navHandler={{'updateActiveCategory': handleChange, 'activeCategory': activeCategory}}
                            updateTeacher={updateTeacher}
                        />
                        <div className={"dash-main-wrapper"}>
                            <Switch>
                                <Route path="/dashboard/main" exact>
                                    <DashMain teacher={teacher} />
                                </Route>
                                <Route path="/dashboard/classroom" exact>
                                    <Classroom teacher={teacher}/>
                                </Route>
                                <Route path="/dashboard/classroom/create" exact>
                                    <CreateClassroom
                                        teacher={teacher}
                                        updateTeacher={updateTeacher}
                                        logout={logoutWithAlert}
                                    />
                                </Route>
                                <Route path="/dashboard/charts" exact>
                                    <Charts teacher={teacher}/>
                                </Route>
                                <Route path="/dashboard/goalcenter" exact>
                                    <GoalCenter
                                        teacher={teacher}
                                        updateTeacher={updateTeacher}
                                        refreshData={refreshDataFromComponents}
                                        hasClassroomsWithStudents={hasClassroomsWithStudents}
                                        logout={logoutWithAlert}
                                    />
                                </Route>
                                <Route path="/dashboard/goalcenter/create" exact>
                                    <CreateGoal
                                        teacher={teacher}
                                        refreshData={refreshDataFromComponents}
                                        updateTeacher={updateTeacher}
                                        hasClassroomsWithStudents={hasClassroomsWithStudents}
                                        logout={logoutWithAlert}
                                    />
                                </Route>
                                <Route path="/dashboard/profile" exact>
                                    <Profile
                                        teacher={teacher}
                                        updateTeacher={updateTeacher}
                                        logout={logoutWithAlert}
                                    />
                                </Route>
                            </Switch>
                        </div>
                    </>
                    : failedToRetrieveTeacher
                        ? <Redirect to={"/"}/>
                        : <Loading/>
            }
        </div>
    );
};

export default Dashboard;

