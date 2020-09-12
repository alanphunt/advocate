import React from 'react';
import logo from '../../assets/advocate-sm.png'
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

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isFetching: false,
            modalState:{
                contentType: "",
            }
        };
        this.regFocus = React.createRef();
        this.logFocus = React.createRef();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.modalState.contentType !== "") {
            this.state.modalState.contentType === "login"
            ? this.logFocus.current.focus()
            : this.regFocus.current.focus()
        }
    }

    handleModal = (formType) => {
        //this prevents values from being transferred from one form to the other when the modal is displayed
        let regform = document.getElementById("regform");
        let logform = document.getElementById("logform");
        logform && logform.reset();
        regform && regform.reset();
        this.setState({modalState: {contentType: formType}});
    };

    closeModal = (e) => {
        if(this.state.modalState.contentType !== "") {
            this.setState({modalState: {contentType: ""}});
            if(!!e.target.closest(".headerregister"))
                this.setState({modalState: {contentType: "register"}});
            else if (!!e.target.closest(".headerlogin"))
                this.setState({modalState: {contentType: "login"}});
        }
    };

    logIn = (event) => {
        event.preventDefault();
        this.setState({isFetching: true})
        const isLogin = this.state.modalState.contentType === "login";
        let fdata = new FormData(event.currentTarget);
        const email = fdata.get("username");
        const pw = fdata.get("password");

        const data = isLogin ? JSON.stringify({'username': email, 'password': pw}) : fdata;
        const url = `/api/${isLogin ? "authenticate" : "createuser"}`;
        const headers = isLogin ? {"Content-Type": "application/json"} : {};

        fetch(url, {method: "POST", body: data, headers: headers})
            .then(response => Promise.all([response.ok, response.ok ? response.json() : response.text(), response.headers]))
            .then(([ok, body, headers]) => {
                this.setState({isFetching: false})
                if(ok){
                    window.sessionStorage.setItem("authorization", headers.get("authorization"));
                    this.props.updateTeacher(body);
                }else{
                    throw new Error(body);
                }
            })
            .catch(e => alert(e));
    };

    render() {
        let contentType = this.state.modalState.contentType;
        const registerForm = <form
            id="regform"
            className={"centeredform"}
            onSubmit={this.logIn}>
            <label htmlFor={"regfirst"}>
                <NameIcon className={"label-i"}/>
                <input
                    id="regfirst"
                    type={"text"}
                    placeholder={"First Name"}
                    name={"firstName"}
                    required
                    ref={this.regFocus}
                    />
            </label>

            <label htmlFor={"reglast"}>
                <NameIcon className={"label-i"}/>
                <input id="reglast" type={"text"} placeholder={"Last Name"} name={"lastName"} required/>
            </label>

            <label htmlFor={"regemail"}>
                <EmailIcon className={"label-i"}/>
                <input id="regemail" type={"email"} placeholder={"Email"} name={"username"} required/>
            </label>

            <label htmlFor={"regpass"}>
                <PassIcon className={"label-i"}/>
                <input id="regpass" type={"password"} placeholder={"Password"} name={"password"} pattern="((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,20})" required/>
            </label>

            <button type={"submit"}>Submit</button>
        </form>;
        const loginForm = <form id="logform" className={"centeredform"} onSubmit={this.logIn}>
            <label htmlFor={"logemail"}>
                <EmailIcon className={"label-i"}/>
                <input
                    id="logemail"
                    type={"email"}
                    placeholder={"Email"}
                    name={"username"}
                    ref={this.logFocus}
                    required/>
            </label>

            <label htmlFor={"logpass"}>
                <PassIcon className={"label-i"}/>
                <input id={"logpass"} type={"password"} placeholder={"Password"}  name={"password"} required/>
            </label>

            <button type={"submit"}>Submit</button>
        </form>;

        return (
            this.props.teacher
                ? <Redirect push to={{pathname: "/dashboard/main"}}/>
                : (
                    <div className={"herocontainer"} onClick={this.closeModal}>
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
                                    className={"headerlogin i-hover"}>
                                    <UserIcon className={"i-right"}/>
                                    <span>Login</span>
                                </div>
                                <div
                                    onClick={() => {
                                        this.handleModal("register")
                                    }}
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
        );
    }
}

export default Home;