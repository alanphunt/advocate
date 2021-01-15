import React, {useState} from 'react';
import Sidebar from "components/molecules/Sidebar";
import {Route, Switch} from "react-router-dom";
import DashMain from "components/pages/dashmain/DashMain";
import Classroom from "components/pages/classroom/Classroom";
import ProgressReport from "components/pages/progressreports/ProgressReport";
import Help from "components/pages/help/Help";
import GoalCenter from "components/pages/goalcenter/GoalCenter";
import Profile from "components/pages/profile/Profile";
import CreateGoal from "components/pages/creategoal/CreateGoal";
import Test from "components/pages/Test/Test"
import DashNav from 'components/molecules/DashNav';

const Dashboard = () => {
    const [expanded, setExpanded] = useState(true);
    
    return (
        <div className={"dashboardwrapper"}>
            <Sidebar
                expanded={expanded}
                setExpanded={setExpanded}
            />
            <div className={"dash-main-wrapper"}>
            <DashNav/>
                <Switch>
                    <Route path="/dashboard/classroom" exact>
                        <Classroom />
                    </Route>
                    <Route path="/dashboard/progressreport" exact>
                        <ProgressReport />
                    </Route>
                    <Route path="/dashboard/help" exact>
                        <Help/>
                    </Route>
                    <Route path="/dashboard/goalcenter" exact>
                        <GoalCenter />
                    </Route>
                    <Route path="/dashboard/goalcenter/create" exact>
                        <CreateGoal />
                    </Route>
                    <Route path="/dashboard/profile" exact>
                        <Profile/>
                    </Route>
                    <Route path="/dashboard/test" exact>
                        <Test />
                    </Route>
                    <Route path="/dashboard/main" exact>
                        <DashMain/>
                    </Route>
                </Switch>
            </div>
        </div>
    );
};

export default Dashboard;

