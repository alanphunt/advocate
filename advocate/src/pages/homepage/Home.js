import React from 'react';
import logo from '../../assets/advocate-sm.png'
import Modal, {exitModal} from '../Modal'
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
                displayed: false,
                contentType: "login",
            }
        };
    }

    handleModal = (vis, formType) => {
        //this prevents values from being transferred from one form to the other when the modal is displayed
        let regform = document.getElementById("regform");
        let logform = document.getElementById("logform");
        logform && logform.reset();
        regform && regform.reset();
        this.setState({modalState: {displayed: vis, contentType: formType}});
    };

    handleForm = (event) => {
        event.preventDefault();
        this.logIn(event.currentTarget);
    };

    logIn = (f) => {
        this.setState({isFetching: true})
        const isLogin = this.state.modalState.contentType === "login";
        let fdata = new FormData(f);
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
        let displayed = this.state.modalState.displayed;

        const registerForm = <form id="regform" className={"centeredform"} onSubmit={this.handleForm}>
            <label htmlFor={"regfirst"}>
                <NameIcon className={"label-i"}/>
                <input id="regfirst" type={"text"} placeholder={"First Name"} name={"firstName"} required autoFocus={true}/>
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
        const loginForm = <form id="logform" className={"centeredform"} onSubmit={this.handleForm}>
            <label htmlFor={"logemail"}>
                <EmailIcon className={"label-i"}/>
                <input id="logemail" type={"email"} placeholder={"Email"} name={"username"} autoFocus={true} required/>
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
                    <div className={"herocontainer"} onClick={(e) => {
                            exitModal(e, displayed, ()=>{this.handleModal(false, "")})
                        }}>
                        <div className={this.state.isFetching ? "display" : "nodisplay"}>
                            <Loading/>
                        </div>
                        <Modal displayed={displayed}>
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
                                <div onClick={() => {this.handleModal(true, "login")}} className={"headerlogin i-hover"}>
                                    <UserIcon className={"i-right"}/>
                                    <span>Login</span>
                                </div>
                                <div onClick={() => {this.handleModal(true, "register")}} className={"headerregister i-hover"}>
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