import React from 'react';
import Sidebar from "./components/Sidebar";
import {Route, Switch} from "react-router-dom";
import DashMain from "./DashMain";
import Classroom from "./Classroom";
import Charts from "./Charts";
import GoalCenter from "./GoalCenter";
import Profile from "./Profile";
import CreateClassroom from "./CreateClassroom";
import CreateGoal from "./CreateGoal";
import Loading from "../SharedComponents/Loading";


class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        let path = window.location.pathname.split("/")[2];
        this.state = {
            activeCategory: path,
        };
        this.teacher = props.teacher;
    }

    refreshDataFromComponents = async () => {
        console.log("rehydrating data..");
        let resp = await fetch("/api/teacher", {headers: {"Authorization": `Bearer ${sessionStorage.authorization}`}});
        await resp.json().then(data => {
            this.props.updateTeacher(data);
        });
    };

    componentDidMount() {
        if(!this.props.teacher)
            this.refreshDataFromComponents().then();
    }

    handleChange = (e) => {
        this.setState({activeCategory: (e.replace(" ", ""))});
    };

    render() {
        let teacher = this.teacher;
        console.log(teacher);
        return (
            this.props.teacher
                ? <div className={"dashboardwrapper"}>
                    <Sidebar
                        teacher={teacher}
                        navHandler={{updateActiveCategory: this.handleChange, activeCategory: this.state.activeCategory}}
                        updateTeacher={this.props.updateTeacher}
                        updateLoggedIn={this.props.updateLoggedIn}
                    />
                    <div className={"dash-main-wrapper"}>
                        <Switch>
                            <Route path="/dashboard/main">
                                <DashMain teacher={teacher}/>
                            </Route>
                            <Route path="/dashboard/classroom" exact>
                                <Classroom teacher={teacher}/>
                            </Route>
                            <Route path="/dashboard/classroom/create">
                                <CreateClassroom navHandler={this.handleChange} refreshData={this.refreshDataFromComponents}/>
                            </Route>
                            <Route path="/dashboard/charts" exact>
                                <Charts teacher={teacher}/>
                            </Route>
                            <Route path="/dashboard/goalcenter" exact>
                                <GoalCenter teacher={teacher}/>
                            </Route>
                            <Route path="/dashboard/goalcenter/create">
                                <CreateGoal teacher={teacher} refreshData={this.refreshDataFromComponents}/>
                            </Route>
                            <Route path="/dashboard/profile">
                                <Profile teacher={teacher}/>
                            </Route>
                        </Switch>
                    </div>
                </div>
                : <div className={"dashboardwrapper"}>
                    <Loading/>
                  </div>
        );
    }
}

export default Dashboard;
