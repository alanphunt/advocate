import React, {useState} from 'react';
import Home from './components/pages/homepage/Home';
import Dashboard from './components/pages/dashboard/Dashboard';
import {Route, Switch} from "react-router-dom";
import {Redirect} from "react-router";
import {LOGGED_OUT, STORAGE} from "./utils/constants";

const App = () => {
    const [teacher, updateTeacher] = useState(null);
    const [failedToRetrieveTeacher, setFailedToRetrieveTeacher] = useState(false);

    const logout = () => {
        STORAGE.clear();
        setFailedToRetrieveTeacher(true);
        updateTeacher(null);
    };

    const logoutWithAlert = () => {
        alert(LOGGED_OUT);
        logout();
    };

    const login = (data) => {
        updateTeacher(data);
        if(failedToRetrieveTeacher)
            setFailedToRetrieveTeacher(false);
    };

    return (
        <div className="App">
            <Route render={({location}) => (
                <Switch location={location}>
                    <Route path="/" exact component={() => {
                        return <Home
                            teacher={teacher}
                            failedToRetrieveTeacher={failedToRetrieveTeacher}
                            userLogin={login}
                        />;
                    }}/>
                    <Route path="/dashboard/:page" component={() => {
                        return <Dashboard
                            teacher={teacher}
                            updateTeacher={updateTeacher}
                            failedToRetrieveTeacher={failedToRetrieveTeacher}
                            logout={logout}
                            logoutWithAlert={logoutWithAlert}
                        />;
                    }}/>
                    <Redirect from={"/dashboard"} exact push to={"/dashboard/main"}/>
                </Switch>
            )}/>
        </div>
    );
}

export default App;
