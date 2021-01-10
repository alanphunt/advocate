import React, {useState} from 'react';
import logo from 'images/logo-sm.png'
import Modal from 'components/molecules/Modal'
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

const Home = ({setIsFetching}) => { 
    let teacherObject = useAuth();
    const [loginObject, setLoginObject] = useState(loginModel);
    const [registrationObject, setRegistrationObject] = useState(registrationModel);
    const [modalContent, setModalContent] = useState("");
    const [errors, setErrors] = useState(homepageErrorModel);

    const resetForms = () => {
        setLoginObject(loginModel);
        setRegistrationObject(registrationModel);
        setErrors(homepageErrorModel);
    };

    const closeModal = (e) => {
        if(modalContent !== "") {
            setModalContent("");
            if(!!e.target.closest(".headerregister"))
                setModalContent("register");
            else if (!!e.target.closest(".headerlogin"))
                setModalContent("login");
            resetForms();
        }
    };

    const handleFormSubmission = (e) => {
        e.preventDefault();
        setIsFetching(true);
        const isLoginForm = modalContent === "login";
        const data = isLoginForm ? loginObject : registrationObject;
        isLoginForm 
            ?  teacherObject.signin(data, setErrors, () => setIsFetching(false))
            :  teacherObject.register(data, setErrors, () => setIsFetching(false))
    };

    const divKeyPressEvent = (event, formType) => {
        if(event.key === "Enter")
            setModalContent(formType);
    };

    const updateFormValues = (e, key) => {
        if(modalContent === "login")
            setLoginObject({...loginObject, [key]: e.currentTarget.value});
        else
            setRegistrationObject({...registrationObject, [key]: e.currentTarget.value})
    };

    return (
        <div className={"herocontainer"} onClick={closeModal}>
            <Modal
                displayed={modalContent !== ""}
                closeModal={closeModal}
            >
                <ModalBody
                    header={modalContent === "login" ? "Welcome back!" : "Let's get you started."}
                    hideButtons
                >
                    <div className="formcontainer">
                        <form className={"centeredform"} >
                            {
                                modalContent === "login"
                                ? <LoginForm errors={errors} login={loginObject} updateFormValues={updateFormValues}/>
                                : modalContent === "register"
                                    ? <RegisterForm errors={errors} register={registrationObject} updateFormValues={updateFormValues}/>
                                    : null
                            }
                            <Button text={modalContent === "login" ? "Login" : "Register"} onClick={handleFormSubmission} type="submit"/>
                        </form>
                    </div>
                </ModalBody>
            </Modal>
            <header className={"homeheader"}>
                    <img src={logo} alt={"Advocate logo"}/>
                    <div className={"promptcontainer"}>
                        <div
                            onClick={() => {
                                setModalContent("login")}
                            }
                            onKeyPress={event => {divKeyPressEvent(event, "login");}}
                            tabIndex={0}
                            className={"headerlogin i-hover"}>
                            <UserIcon className={"i-right"}/>
                            <span>Login</span>
                        </div>
                        <div
                            onClick={() => {
                                setModalContent("register")
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