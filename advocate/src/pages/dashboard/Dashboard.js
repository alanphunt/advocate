import React from 'react';
import Sidebar from "./components/Sidebar";
import {Route, Switch} from "react-router-dom";
import DashMain from "./DashMain";
import Classroom from "./Classroom";
import Charts from "./Charts";
import GoalCenter from "./GoalCenter";
import Profile from "./Profile";


class Dashboard extends React.Component {
    render() {
        return (
                <div className={"dashboardwrapper"}>
                    <Sidebar/>
                    <div className={"dash-main-wrapper"}>
                        <Switch>
                            <Route path="/dashboard/main" component={DashMain}/>
                            <Route path="/dashboard/classroom" component={Classroom}/>
                            <Route path="/dashboard/charts" component={Charts}/>
                            <Route path="/dashboard/goalcenter" component={GoalCenter}/>
                            <Route path="/dashboard/profile" component={Profile}/>
                        </Switch>
                    </div>
                </div>
        );
    }
}

export default Dashboard;
