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
        this.state = {
            activeCategory: path,
            isFetching: true
        };
        this.teacher = props.location.state?.teacher || null;
    }

    componentDidMount() {
        if(!this.teacher) {
            fetch("/api/teacher").then(r => r.json()).then(d => {
                this.teacher = d;
                this.setState(() => ({isFetching: false}));
            });
        }else{
            this.setState(() => ({isFetching: false}));
        }
    }

    handleChange = (e) => {
        this.setState({activeCategory: (e.replace(" ", ""))});
    };

    render() {
        let teacher = this.teacher;
        console.log(teacher);
        return (
            this.state.isFetching
            ? <p>Loading..</p>
            : <div className={"dashboardwrapper"}>
                <Sidebar teacher={teacher} navHandler={{updateActiveCategory: this.handleChange, activeCategory: this.state.activeCategory}}/>
                <div className={"dash-main-wrapper"}>
                    <Switch>
                        <Route path="/dashboard/main">
                            <DashMain teacher={teacher} navHandler={{updateActiveCategory: this.handleChange}}/>
                        </Route>
                        <Route path="/dashboard/classroom" exact>
                            <Classroom teacher={teacher}/>
                        </Route>
                        <Route path="/dashboard/classroom/create">
                            <CreateClassroom/>
                        </Route>
                        <Route path="/dashboard/charts" exact>
                            <Charts teacher={teacher}/>
                        </Route>
                        <Route path="/dashboard/goalcenter" exact>
                            <GoalCenter teacher={teacher}/>
                        </Route>
                        <Route path="/dashboard/profile">
                            <Profile teacher={teacher}/>
                        </Route>
                    </Switch>
                </div>
            </div>

    );
    }
}

export default Dashboard;
