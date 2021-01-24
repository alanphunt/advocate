import React, {useState, useEffect} from 'react';
import logo from 'images/logo-sm.png'
import {
    FaChartBar as ChartIcon,
    FaNetworkWired as NetIcon,
    FaSync as SyncIcon,
    FaUser as UserIcon,
    FaUserPlus as UserPlusIcon,
    FaUsers as UsersIcon
} from "react-icons/fa";
import Button from 'components/atoms/Button';
import LoginForm from 'components/molecules/LoginForm';
import RegisterForm from 'components/molecules/RegisterForm';
import { homepageErrorModel, loginModel, registrationModel } from 'utils/models';
import { useAuth } from 'utils/auth/AuthHooks';
import ModalBody from 'components/molecules/ModalBody';
import Modal from "components/molecules/Modal";

const Home = ({setIsFetching}) => { 
    const {signin, register} = useAuth();
    const [loginObject, setLoginObject] = useState(loginModel);
    const [registrationObject, setRegistrationObject] = useState(registrationModel);
    const [errors, setErrors] = useState(homepageErrorModel);

    const [modalBody, setModalBody] = useState(null);
    const [modalAction, setModalAction] = useState("");
    const closeModal = () => setModalBody(null);

    const resetForms = () => {
        setLoginObject(loginModel);
        setRegistrationObject(registrationModel);
        setErrors(homepageErrorModel);
    };

    useEffect(() => {
        if(modalAction !== ""){
            setModalBody(                
                <ModalBody
                    header={modalAction === "login" ? "Welcome back!" : "Let's get you started."}
                    hideButtons
                >
                    <div className="formcontainer">
                        <form className={"centeredform"} >
                            {
                                modalAction === "login"
                                ? <LoginForm errors={errors} login={loginObject} updateFormValues={updateFormValues}/>
                                : modalAction === "register"
                                    ? <RegisterForm errors={errors} register={registrationObject} updateFormValues={updateFormValues}/>
                                    : <></>
                            }
                            <Button text={modalAction === "login" ? "Login" : "Register"} onClick={handleFormSubmission} type="submit"/>
                        </form>
                    </div>
                </ModalBody>
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalAction, loginObject, registrationObject, errors])

    useEffect(() => {
        if(!modalBody){
            resetForms();
            setModalAction("");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalBody])

    const handleFormSubmission = (e) => {
        e.preventDefault();
        setIsFetching(true);
        const isLoginForm = modalAction === "login";
        const data = isLoginForm ? loginObject : registrationObject;
        isLoginForm 
            ?  signin(data, setErrors, () => setIsFetching(false), () => setIsFetching(false))
            :  register(data, setErrors, () => setIsFetching(false), () => setIsFetching(false))
    };

    const divKeyPressEvent = (event, formType) => {
        if(event.key === "Enter")
            setModalAction(formType);
    };

    const updateFormValues = (e, key) => {
        if(modalAction === "login")
            setLoginObject({...loginObject, [key]: e.currentTarget.value});
        else
            setRegistrationObject({...registrationObject, [key]: e.currentTarget.value})
    };

    return (
        <div className={"herocontainer"} onClick={() => {if(modalBody) closeModal();}}>
            <Modal displayed={modalBody} closeModal={closeModal} >
                { modalBody }
            </Modal>
            <header className={"homeheader"}>
                    <img src={logo} alt={"Advocate logo"}/>
                    <div className={"promptcontainer"}>
                        <div
                            onClick={() => {
                                setModalAction("login")}
                            }
                            onKeyPress={event => {divKeyPressEvent(event, "login");}}
                            tabIndex={0}
                            className={"headerlogin i-hover"}>
                            <UserIcon className={"i-right"}/>
                            <span>Login</span>
                        </div>
                        <div
                            onClick={() => {
                                setModalAction("register")
                            }}
                            onKeyPress={event => {divKeyPressEvent(event, "register");}}
                            tabIndex={0}
                            className={"headerregister i-hover"}>
                            <UserPlusIcon className={"i-right"}/>
                            <span>Register</span>
                        </div>
                    </div>
                </header>
            <div className={"herotext"}>
                        <h3>Advocate through data.</h3>
                        <h2>Spend less time with data collection and more time impacting lives.</h2>
                        <br/>
                        <p><ChartIcon className={"i-right"}/> Visualize student growth</p>
                        <p><SyncIcon className={"i-right"}/> Create templates to reuse goals</p>
                        <p><UsersIcon className={"i-right"}/>Manage all of your classrooms</p>
                        <p><NetIcon className={"i-right"}/>Multiple methods to track progress</p>
                    </div>
        </div>
    );
};

export default Home;