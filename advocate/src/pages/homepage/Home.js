import React from 'react';
import logo from '../../assets/logo-sm.png'
import Modal from '../SharedComponents/Modal'
import {Redirect} from "react-router";
import Loading from "../SharedComponents/Loading";
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
import FormElement from "../SharedComponents/FormElement";

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isFetching: false,
            modalContent: "",
            errors: {
                login: "",
                registerUsername: "",
                registerPassword: "",
                registerFirstName: "",
                registerLastName: ""
            }
        };
        this.regFocus = React.createRef();
        this.logFocus = React.createRef();
    }

    handleModal = (formType) => {
        //this prevents values from being transferred from one form to the other when the modal is displayed
        let regform = document.getElementById("regform");
        let logform = document.getElementById("logform");
        logform && logform.reset();
        regform && regform.reset();
        this.setState({...this.state, modalContent: formType});
    };

    closeModal = (e) => {
        if(this.state.modalContent !== "") {
            this.setState({...this.state, modalContent: ""});
            if(!!e.target.closest(".headerregister"))
                this.setState({...this.state, modalContent: "register"});
            else if (!!e.target.closest(".headerlogin"))
                this.setState({...this.state, modalContent: "login"});
        }
    };

    handleForm = (e) => {
        e.preventDefault();
        this.setState({...this.state, isFetching: true})
        const fdata = new FormData(e.currentTarget);
        if(this.state.modalContent === "login")
            this.logIn(fdata);
        else
            this.register(fdata);
    };

    handleServerError = () => {
        this.setState({...this.state, isFetching: false});
        alert("Uh oh! Having a hard time connecting to the server.");
    };

    logIn = (formData) => {
        const newData = JSON.stringify({username: formData.get("username"), password: formData.get("password")});
        fetch("/api/authenticate", {method: "POST", body: newData, headers: {"Content-Type": "application/json"}})
            .then(response => Promise.all([response.ok, response.json(), response.headers, response.status]))
            .then(([ok, body, headers, status]) => {
                this.setState({...this.state, isFetching: false})
                if(ok){
                    this.handleFormCompletion(body, headers);
                }else{
                    this.setState({...this.state, errors: {
                            ...this.state.errors,
                            login: body.error
                        }})
                }
            })
            .catch(e => {
                this.handleServerError();
            });
    };

    register = (formData) => {
        fetch("/api/createuser", {method: "POST", body: formData})
            .then(response => Promise.all([response.ok, response.json(), response.headers]))
            .then(([ok, body, headers]) => {
                this.setState({...this.state, isFetching: false})
                if(ok){
                    this.handleFormCompletion(body, headers);
                }else{
                    this.setState({...this.state, errors: {
                            registerFirstName: body.firstName,
                            registerLastName: body.lastName,
                            registerUsername: body.username,
                            registerPassword: body.password,
                        }});
                }
            })
            .catch(e => {
                this.handleServerError();
            });
    };

    handleFormCompletion = (body, headers) => {
        window.sessionStorage.setItem("authorization", headers.get("jwt"));
        this.props.updateTeacher(body);
    };

    divKeyPressEvent = (event, formType) => {
        if(event.key === "Enter")
            this.handleModal(formType);
    };

    render() {
        let contentType = this.state.modalContent;
        const registerForm =
            <form
                id="regform"
                className={"centeredform"}
                onSubmit={this.handleForm}>
                <FormElement
                    icon={<NameIcon/>}
                    placeholder={"First Name"}
                    name={"firstName"}
                    errorMessage={this.state.errors.registerFirstName}
                    autoFocus
                />
                <FormElement
                    icon={<NameIcon/>}
                    placeholder={"Last Name"}
                    name={"lastName"}
                    errorMessage={this.state.errors.registerLastName}
                />
                <FormElement
                    icon={<EmailIcon/>}
                    placeholder={"Email"}
                    name={"username"}
                    errorMessage={this.state.errors.registerUsername}
                />
                <FormElement
                    icon={<PassIcon/>}
                    type={"password"}
                    placeholder={"Password"}
                    name={"password"}
                    errorMessage={this.state.errors.registerPassword}
                />
            <button tabIndex={0} type={"submit"}>Submit</button>
        </form>;

        const loginForm =
            <form
                id="logform"
                className={"centeredform"}
                onSubmit={this.handleForm}>
                <FormElement
                    icon={<EmailIcon/>}
                    placeholder={"Email"}
                    name={"username"}
                    autoFocus
                />
                <FormElement
                    icon={<PassIcon/>}
                    /*type={"password"}*/
                    placeholder={"Password"}
                    name={"password"}
                />
                {
                    this.state.errors.login !== ""
                        ? <p className={"inputerror marg-bot"}>{ this.state.errors.login }</p>
                        : <></>
                }
                <button type={"submit"}>Submit</button>
            </form>;

        return (
            this.props.teacher
                ? <Redirect push to={{pathname: "/dashboard/main"}}/>
                : <div className={"herocontainer"} onClick={this.closeModal}>
                        <div className={this.state.isFetching ? "display" : "nodisplay"}>
                            <Loading/>
                        </div>
                        <Modal
                            displayed={contentType !== ""}
                            closeModal={this.closeModal}
                        >
                            <div className="formcontainer">
                                <div className={"formheader"}>
                                    <h2>{contentType === "login" ? "Welcome back!" : "Let's get you started."}</h2>
                                    <hr/>
                                </div>
                                {contentType === "login" ? loginForm : registerForm}
                            </div>
                        </Modal>
                        <header className={"homeheader"}>
                            <img src={logo} alt={"Advocate logo"}/>
                            <div className={"promptcontainer"}>
                                <div
                                    onClick={() => {
                                        this.handleModal("login")}
                                    }
                                    onKeyPress={event => {this.divKeyPressEvent(event, "login");}}
                                    tabIndex={0}
                                    className={"headerlogin i-hover"}>
                                    <UserIcon className={"i-right"}/>
                                    <span>Login</span>
                                </div>
                                <div
                                    onClick={() => {
                                        this.handleModal("register")
                                    }}
                                    onKeyPress={event => {this.divKeyPressEvent(event, "register");}}
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
    }
}

export default Home;