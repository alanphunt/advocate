import React, {useState, useEffect} from 'react';
import Home from './components/pages/homepage/Home';
import Dashboard from './components/pages/dashboard/Dashboard';
import PageNotFound from './components/pages/404/PageNotFound';
import {Redirect, Route, Switch} from "react-router-dom";
import ProtectedRoute from 'components/molecules/ProtectedRoute';
import { useAuth } from 'utils/auth/AuthHooks';
import { useLocation } from 'react-router';
import Loading from 'components/atoms/Loading';
import Modal from "components/molecules/Modal";
import Toaster from "components/atoms/Toaster";

const App = () => {
  const {teacher, refreshTeacher} = useAuth();
  const location = useLocation();
  const [isFetching, setIsFetching] = useState(false);
  const [modalAction, setModalAction] = useState("");
  const [modalBody, setModalBody] = useState(null);
  const [toasterText, setToasterText] = useState("");
  
  const closeModal = () => {
    setModalAction("");
    setModalBody(null);
  }
  
  const isLargeModal = modalAction.includes("create") || modalAction.includes("edit") || modalAction.includes("copy")|| modalAction.includes("complete");
  
  useEffect(() => {
    if(!modalBody){
      setModalAction("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalBody])
  
  useEffect(() => {
    if(!teacher?.teacher && location.pathname.includes("/dashboard/")){
      setIsFetching(true);
      refreshTeacher(() => setIsFetching(false)).catch(e => {setIsFetching(false);alert(e);});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teacher]);
  
  return (
    <div className={`App${modalBody ? " modal-opened" : ""}`}>
      {
        isFetching
          ? <Loading/>
          : <></>
      }
      <Modal displayed={modalBody} closeModal={closeModal} largeModal={isLargeModal}>
        {modalBody}
      </Modal>
      <Switch>
        <Route path="/" exact >
          <Home
            setIsFetching={setIsFetching}
            modalAction={modalAction}
            setModalAction={setModalAction}
            setModalBody={setModalBody}
            closeModal={closeModal}
          />
        </Route>
        <ProtectedRoute path="/dashboard/:page" >
          <Dashboard
            modalAction={modalAction}
            setModalAction={setModalAction}
            setModalBody={setModalBody}
            setToasterText={setToasterText}
            closeModal={closeModal}
          />
        </ProtectedRoute>
        <ProtectedRoute path="/dashboard">
          <Redirect to="/dashboard/main"/>
        </ProtectedRoute>
        <Route path="*">
          <PageNotFound/>
        </Route>
      </Switch>
      <Toaster displayed={toasterText} closeToaster={() => setToasterText("")}>{toasterText}</Toaster>
    </div>
  );
}

export default App;