import React from 'react';
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


class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        let path = window.location.pathname.split("/")[2];
        this.state = {
            activeCategory: path,
            validJWT: true
        };
        this.teacher = props.teacher;
        this.updateTeacher = props.updateTeacher;
        this.hasClassroomsWithStudents = this.teacher?.classrooms?.length > 0 && this.teacher?.classrooms[0].students.length > 0;
    }

    refreshDataFromComponents = async () => {
        console.log("rehydrating data..");
        let resp = await fetch("/api/teacher", {headers: {"Authorization": `Bearer ${sessionStorage.authorization}`}});
        if(!resp.ok){
            throw new Error(resp.headers.get("Yikes! Something went wrong on the server."));
        }else
            await resp.json().then(data => {
            this.updateTeacher(data);
        });
    };

    //this is in case of page refresh
    componentDidMount() {
        if(!this.teacher)
            this.refreshDataFromComponents().catch(e => {
                console.log(e);
                alert(e.message);
                this.setState(prevState => ({...prevState, validJWT: false}));
            });
    }

    handleChange = (e) => {
        this.setState({activeCategory: (e.replace(" ", ""))});
    };

    render() {
        let teacher = this.teacher;
        console.log(teacher);
        return (
            <div className={"dashboardwrapper"}>
                {
                    teacher
                        ? <>
                            <Sidebar
                                teacher={teacher}
                                navHandler={{updateActiveCategory: this.handleChange, activeCategory: this.state.activeCategory}}
                                updateTeacher={this.props.updateTeacher}
                            />
                            <div className={"dash-main-wrapper"}>
                                <Switch>
                                    <Route path="/dashboard/main" exact>
                                        <DashMain teacher={teacher}/>
                                    </Route>
                                    <Route path="/dashboard/classroom" exact>
                                        <Classroom teacher={teacher}/>
                                    </Route>
                                    <Route path="/dashboard/classroom/create" exact>
                                        <CreateClassroom
                                            updateTeacher={this.updateTeacher}
                                        />
                                    </Route>
                                    <Route path="/dashboard/charts" exact>
                                        <Charts teacher={teacher}/>
                                    </Route>
                                    <Route path="/dashboard/goalcenter" exact>
                                        <GoalCenter
                                            teacher={teacher}
                                            updateTeacher={this.updateTeacher}
                                            refreshData={this.refreshDataFromComponents}
                                            hasClassroomsWithStudents={this.hasClassroomsWithStudents}
                                        />
                                    </Route>
                                    <Route path="/dashboard/goalcenter/create" exact>
                                        <CreateGoal
                                            teacher={teacher}
                                            refreshData={this.refreshDataFromComponents}
                                            updateTeacher={this.updateTeacher}
                                            hasClassroomsWithStudents={this.hasClassroomsWithStudents}
                                        />
                                    </Route>
                                    <Route path="/dashboard/profile" exact>
                                        <Profile teacher={teacher}/>
                                    </Route>
                                </Switch>
                            </div>
                          </>
                        : this.state.validJWT
                            ? <div className={"dashboardwrapper"}>
                                <Loading/>
                              </div>
                        : <Redirect to={"/"}/>
                    }
            </div>
        );
    }
}

export default Dashboard;

