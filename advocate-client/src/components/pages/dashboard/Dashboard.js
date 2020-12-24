import React, {useState, useEffect, useContext} from 'react';
import Sidebar from "components/molecules/Sidebar";
import {Redirect, Route, Switch} from "react-router-dom";
import DashMain from "components/pages/dashmain/DashMain";
import Classroom from "components/pages/classroom/Classroom";
import ProgressReport from "components/pages/charts/ProgressReport";
import GoalCenter from "components/pages/goalcenter/GoalCenter";
import Profile from "components/pages/profile/Profile";
import CreateGoal from "components/pages/creategoal/CreateGoal";
import Loading from "components/atoms/Loading";
import Test from "components/pages/Test/Test"
import {SERVER_ERROR} from "utils/constants";
import {TeacherContext} from "utils/hooks/hooks"


const Dashboard = ({failedToRetrieveTeacher, logout, logoutWithAlert, handleToaster}) => {
    const {teacher, setTeacher} = useContext(TeacherContext);
    const [activeCategory, setActiveCategory] = useState(window.location.pathname.split("/")[2]);
    const hasClassroomsWithStudents = teacher?.classrooms?.length > 0 && teacher?.classrooms[0].students.length > 0;

    const refreshDataFromComponents = async () => {
        let resp = await fetch("/api/teacher");
        if (!resp.ok)
            throw new Error(SERVER_ERROR);
        else
            await resp.json().then(data => {
                setTeacher(data);
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
                            updateTeacher={setTeacher}
                        />
                        <div className={"dash-main-wrapper"}>
                            <Switch>
                                <Route path="/dashboard/main" exact>
                                    <DashMain teacher={teacher} />
                                </Route>
                                <Route path="/dashboard/classroom" exact>
                                    <Classroom 
                                        logout={logout}
                                        handleToaster={handleToaster}
                                    />
                                </Route>
                                <Route path="/dashboard/progressreport" exact>
                                    <ProgressReport teacher={teacher}/>
                                </Route>
                                <Route path="/dashboard/goalcenter" exact>
                                    <GoalCenter
                                        refreshData={refreshDataFromComponents}
                                        hasClassroomsWithStudents={hasClassroomsWithStudents}
                                        logout={logoutWithAlert}
                                    />
                                </Route>
                                <Route path="/dashboard/goalcenter/create" exact>
                                    <CreateGoal
                                        refreshData={refreshDataFromComponents}
                                        hasClassroomsWithStudents={hasClassroomsWithStudents}
                                        logout={logoutWithAlert}
                                    />
                                </Route>
                                <Route path="/dashboard/profile" exact>
                                    <Profile
                                        teacher={teacher}
                                        updateTeacher={setTeacher}
                                        logout={logoutWithAlert}
                                    />
                                </Route>
                                <Route path="/dashboard/test" exact>
                                    <Test teacher={teacher} updateTeacher={setTeacher} logout={logout}/>
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

