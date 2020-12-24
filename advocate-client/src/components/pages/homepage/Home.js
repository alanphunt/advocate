import React, {useState} from 'react';
import logo from 'images/logo-sm.png'
import Modal from 'components/molecules/Modal'
import {Redirect} from "react-router";
import Loading from "components/atoms/Loading";
import FormElement from "components/atoms/FormElement";
import {
    FaAt as EmailIcon,
    FaChartBar as ChartIcon,
    FaIdCard as NameIcon,
    FaNetworkWired as NetIcon,
    FaSync as SyncIcon,
    FaUser as UserIcon,
    FaUserLock as PassIcon,
    FaUserPlus as UserPlusIcon,
    FaUsers as UsersIcon
} from "react-icons/fa";
import {SERVER_ERROR} from "utils/constants";
import Button from 'components/atoms/Button';

const Home = ({teacher, userLogin, failedToRetrieveTeacher}) => {
    const loginObj = {
        username: '',
        password: ''
    };
    
    const registerObj = {
        username: '',
        password: '',
        firstName: '',
        lastName: '',

    };

    const errorObj = {
        login: "",
        registerUsername: "",
        registerPassword: "",
        registerFirstName: "",
        registerLastName: ""
    };
        
    const [login, setLogin] = useState(loginObj);
    const [register, setRegister] = useState(registerObj)
    const [isFetching, setIsFetching] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [errors, setErrors] = useState(errorObj);

    const resetForms = () => {
        setLogin(loginObj);
        setRegister(registerObj);
        setErrors(errorObj);
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

    const handleForm = (e) => {
        e.preventDefault();
        setIsFetching(true);
        handleFormSubmission();
    };

    const handleServerError = () => {
        setIsFetching(false);
        alert(SERVER_ERROR);
    };

    const handleFormSubmission = () => {
        const isLogin = modalContent === "login";
        const data = isLogin ? login : register;
        const path =  isLogin ? 'authenticate' : 'createuser';

        fetch(`/api/${path}`, {method: "POST", body: JSON.stringify(data), headers: {"Content-Type": "application/json"}})
            .then(response => Promise.all([response.ok, response.json()]))
            .then(([ok, body]) => {
                setIsFetching(false);
                if(ok){
                    userLogin(body);
                }else{
                    setErrors({
                            login: body.error || "",
                            registerFirstName: body.firstName || "",
                            registerLastName: body.lastName || "",
                            registerUsername: body.username || "",
                            registerPassword: body.password || "",
                        });
                }
            })
            .catch(handleServerError);
    };

    const divKeyPressEvent = (event, formType) => {
        if(event.key === "Enter")
            setModalContent(formType);
    };

    const updateFormValues = (e, key) => {
        if(modalContent === "login")
            setLogin({...login, [key]: e.currentTarget.value});
        else
            setRegister({...register, [key]: e.currentTarget.value})
    };

    const registerForm =
        <>
            <FormElement
                value={register.firstName}
                icon={<NameIcon/>}
                placeholder={"First Name"}
                name={"firstName"}
                errorMessage={errors.registerFirstName}
                onChange={(e) => {updateFormValues(e, "firstName")}}
                autoFocus
            />
            <FormElement
                value={register.lastName}
                icon={<NameIcon/>}
                placeholder={"Last Name"}
                name={"lastName"}
                errorMessage={errors.registerLastName}
                onChange={(e) => {updateFormValues(e, "lastName")}}
            />
            <FormElement
                value={register.username}
                icon={<EmailIcon/>}
                placeholder={"Email"}
                name={"username"}
                errorMessage={errors.registerUsername}
                onChange={(e) => {updateFormValues(e, "username")}}
            />
            <FormElement
                onChange={(e) => {updateFormValues(e, "password")}}
                value={register.password}
                icon={<PassIcon/>}
                type={"password"}
                placeholder={"Password"}
                name={"password"}
                errorMessage={errors.registerPassword}
            />
        </>;

    const loginForm =
        <>
            <FormElement
                onChange={(e) => {updateFormValues(e, "username")}}
                value={login.username}
                icon={<EmailIcon/>}
                placeholder={"Email"}
                name={"username"}
                autoFocus
            />
            <FormElement
                value={login.password}
                icon={<PassIcon/>}
                /*type={"password"}*/
                placeholder={"Password"}
                name={"password"}
                onChange={(e) => {updateFormValues(e, "password")}}
            />
            {
                errors.login !== ""
                    ? <p className={"inputerror marg-bot"}>{ errors.login }</p>
                    : <></>
            }
        </>;

    return (
        teacher && !failedToRetrieveTeacher
            ? <Redirect push to={{pathname: "/dashboard/main"}}/>
            : <div className={"herocontainer"} onClick={closeModal}>
                <div className={isFetching ? "display" : "nodisplay"}>
                    <Loading/>
                </div>
                <Modal
                    displayed={modalContent !== ""}
                    closeModal={closeModal}
                >
                    <div className="formcontainer">
                        <div className={"formheader"}>
                            <h2>{modalContent === "login" ? "Welcome back!" : "Let's get you started."}</h2>
                            <hr/>
                        </div>
                        <form
                            className={"centeredform"}
                            onSubmit={handleForm}
                        >
                            {modalContent === "login" ? loginForm : modalContent === "register" ? registerForm : null}
                            <Button text="Submit" onClick={handleForm} type="submit"/>
                        </form>
                    </div>
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
    )
};

export default Home;