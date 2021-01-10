import React, {useState, useEffect} from 'react';
import Home from './components/pages/homepage/Home';
import Dashboard from './components/pages/dashboard/Dashboard';
import PageNotFound from './components/pages/404/PageNotFound';
import {Redirect, Route, Switch} from "react-router-dom";
import Toaster from "components/atoms/Toaster";
import ProtectedRoute from 'components/molecules/ProtectedRoute';
import { useAuth } from 'utils/auth/AuthHooks';
import { useLocation } from 'react-router';
import Loading from 'components/atoms/Loading';

const App = () => {
    const teacherObject = useAuth();
    const location = useLocation();
    const [toaster, setToaster] = useState({display: false, body: ""});
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        let timer = null;
        if(toaster.display){
            timer = setTimeout(() => {
                setToaster({...toaster, display: false});
            }, 4000);
        }
        return timer ? () => clearTimeout(timer) : () => {};
    }, [toaster]);

    useEffect(() => {
        if(!teacherObject.teacher && location.pathname.includes("/dashboard/")){
            setIsFetching(true);
            teacherObject.refreshTeacher(() => setIsFetching(false)).catch(e => {setIsFetching(false);alert(e);});
        }
        
    }, [teacherObject]);

    const handleToaster = (message) => setToaster({display: true, body: message});

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
                    <Dashboard handleToaster={handleToaster} />
                </ProtectedRoute>
                <ProtectedRoute path="/dashboard">
                    <Redirect to="/dashboard/main"/>
                </ProtectedRoute>
                <Route path="*">
                    <PageNotFound/>
                </Route>
            </Switch>
            <Toaster display={toaster.display} setDisplay={(displayed) => setToaster({...toaster, display: displayed})}>{toaster.body}</Toaster>
        </div>
    );
}

export default App;