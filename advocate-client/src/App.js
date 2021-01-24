import React, {useState, useEffect} from 'react';
import Home from './components/pages/homepage/Home';
import Dashboard from './components/pages/dashboard/Dashboard';
import PageNotFound from './components/pages/404/PageNotFound';
import {Redirect, Route, Switch} from "react-router-dom";
import ProtectedRoute from 'components/molecules/ProtectedRoute';
import { useAuth } from 'utils/auth/AuthHooks';
import { useLocation } from 'react-router';
import Loading from 'components/atoms/Loading';

const App = () => {
    const {teacher, refreshTeacher} = useAuth();
    const location = useLocation();
    const [isFetching, setIsFetching] = useState(false);


    useEffect(() => {
        if(!teacher?.teacher && location.pathname.includes("/dashboard/")){
            setIsFetching(true);
            refreshTeacher(() => setIsFetching(false)).catch(e => {setIsFetching(false);alert(e);});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [teacher]);

    return (
        <div className="App">
            {
                isFetching
                ? <Loading/>
                : <></>
            }
            <Switch>
                <Route path="/" exact >
                    <Home setIsFetching={setIsFetching} /> 
                </Route>
                <ProtectedRoute path="/dashboard/:page" >
                    <Dashboard />
                </ProtectedRoute>
                <ProtectedRoute path="/dashboard">
                    <Redirect to="/dashboard/main"/>
                </ProtectedRoute>
                <Route path="*">
                    <PageNotFound/>
                </Route>
            </Switch>
        </div>
    );
}

export default App;