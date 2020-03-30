import React from 'react';
import Sidebar from "./components/Sidebar";
import {Route, Switch} from "react-router-dom";
import DashMain from "./DashMain";
import Classroom from "./Classroom";
import Charts from "./Charts";
import GoalCenter from "./GoalCenter";
import Profile from "./Profile";
import CreateClassroom from "./CreateClassroom";


class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        let path = window.location.pathname.split("/")[2];
        this.state = {activeCategory: path};
    }

    handleChange = (e) => {
        this.setState({activeCategory: (e.replace(" ", ""))});
    };



    render() {
        return (
                <div className={"dashboardwrapper"}>
                    <Sidebar navHandler={{updateActiveCategory: this.handleChange, activeCategory: this.state.activeCategory}}/>
                    <div className={"dash-main-wrapper"}>
                        <Switch>
                            <Route path="/dashboard/main">
                                <DashMain navHandler={{updateActiveCategory: this.handleChange}}/>
                            </Route>
                            <Route path="/dashboard/classroom" exact>
                                <Classroom/>
                            </Route>
                            <Route path="/dashboard/classroom/create">
                                <CreateClassroom/>
                            </Route>
                            <Route path="/dashboard/charts" exact>
                                <Charts/>
                            </Route>
                            <Route path="/dashboard/goalcenter" exact>
                                <GoalCenter/>
                            </Route>
                            <Route path="/dashboard/profile">
                                <Profile/>
                            </Route>
                        </Switch>
                    </div>
                </div>
        );
    }
}

export default Dashboard;
