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
import { useUi } from 'utils/ui/UiHooks';
import Modal from "components/molecules/Modal";

const App = () => {
    const teacherObject = useAuth();
    const location = useLocation();
    // const [toaster, setToaster] = useState({display: false, body: ""});
    const [isFetching, setIsFetching] = useState(false);
    const {largeModal, setLargeModal, toasterText, modalBody, closeModal, closeToaster} = useUi();

    useEffect(() => {
        let timer = null;
        if(toasterText){
            timer = setTimeout(() => closeToaster, 4000);
        }
        return timer ? () => clearTimeout(timer) : () => {};
    }, [toasterText]);

    useEffect(() => {
        if(!teacherObject.teacher && location.pathname.includes("/dashboard/")){
            setIsFetching(true);
            teacherObject.refreshTeacher(() => setIsFetching(false)).catch(e => {setIsFetching(false);alert(e);});
        }
        
    }, [teacherObject]);
    
    useEffect(() => {
        if(!modalBody && largeModal)
            setLargeModal(false)
    }, [modalBody])

    return (
        <div className="App">
            {
                isFetching
                ? <Loading/>
                : <></>
            }
            <Modal displayed={!!modalBody} closeModal={closeModal} largeModal={largeModal} >
                { modalBody ? modalBody : <></> }
            </Modal>
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
            <Toaster display={!!toasterText} setDisplay={closeToaster}>{toasterText}</Toaster>
        </div>
    );
}

export default App;