import React, {useState, useEffect, useMemo} from 'react';
import Home from './components/pages/homepage/Home';
import Dashboard from './components/pages/dashboard/Dashboard';
import {Route, Switch} from "react-router-dom";
import {Redirect} from "react-router";
import {LOGGED_OUT, STORAGE} from "./utils/constants";
import Toaster from "components/atoms/Toaster";
import {TeacherContext} from "utils/hooks/hooks"

const App = () => {
    const [teacher, setTeacher] = useState(null);
    const memoizedTeacher = useMemo(() => ({teacher, setTeacher}), [teacher, setTeacher]);
    const [failedToRetrieveTeacher, setFailedToRetrieveTeacher] = useState(false);
    const [toaster, setToaster] = useState({display: false, body: ""});

    useEffect(() => {
        let timer = null;
        if(toaster.display){
            timer = setTimeout(() => {
                setToaster({...toaster, display: false});
            }, 3500);
        }
        return timer ? () => clearTimeout(timer) : () => {};
    }, [toaster]);

    const logout = () => {
        STORAGE.clear();
        setFailedToRetrieveTeacher(true);
        setTeacher(null);
    };

    const logoutWithAlert = () => {
        alert(LOGGED_OUT);
        logout();
    };

    const login = (data) => {
        setTeacher(data);
        if(failedToRetrieveTeacher)
            setFailedToRetrieveTeacher(false);
    };
    
    const handleToaster = (message) => {
        setToaster({display: true, body: message});
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
                    <TeacherContext.Provider value={memoizedTeacher}>
                        <Route path="/dashboard/:page" component={() => {
                            return <Dashboard
                                        failedToRetrieveTeacher={failedToRetrieveTeacher}
                                        logout={logout}
                                        logoutWithAlert={logoutWithAlert}
                                        handleToaster={handleToaster}
                                    />;
                        }}/>
                    </TeacherContext.Provider>
                    <Redirect from={"/dashboard"} exact push to={"/dashboard/main"}/>
                </Switch>
            )}/>
            <Toaster display={toaster.display} setDisplay={(displayed) => setToaster({...toaster, display: displayed})}>{toaster.body}</Toaster>
        </div>
    );
}

export default App;
