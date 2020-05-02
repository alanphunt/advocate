import React from 'react';
import logo from '../../assets/advocate-sm.png'
import Modal, {exitModal} from '../Modal'
import {Redirect} from "react-router";

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            modalState:{
                displayed: false,
                contentType: "",
            }
        };
    }

    handleModal = (vis, formType) => {
        this.setState({modalState: {displayed: vis, contentType: formType}});
    };

    handleForm = (event) => {
        event.preventDefault();
        this.logIn(event);
    };

    createForm = (formType) => {
        return (formType === "login" ? this.loginForm() : formType === "register" ? this.registerForm() : "");
    };

    registerForm = () => {
        return (
            <form className={"centeredform"} onSubmit={(e)=>{this.handleForm(e);}}>
                <label htmlFor={"regfirst"}>
                    <i className={"fas fa-id-card label-i"}/>
                    <input id="regfirst" type={"text"} placeholder={"First Name"} name={"firstName"} required autoFocus={true}/>
                </label>

                <label htmlFor={"reglast"}>
                    <i className={"fas fa-id-card label-i"}/>
                    <input id="reglast" type={"text"} placeholder={"Last Name"} name={"lastName"} required/>
                </label>

                <label htmlFor={"regemail"}>
                    <i className={"fas fa-at label-i"}/>
                    <input id="regemail" type={"email"} placeholder={"Email"} name={"email"} required/>
                </label>

                <label htmlFor={"regpass"}>
                    <i className={"fas fa-user-lock label-i"}/>
                    <input id="regpass" type={"password"} placeholder={"Password"} name={"password"} pattern="((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,20})" required/>
                </label>

                <button type={"submit"}>Submit</button>
            </form>
        )
    };

    loginForm = () => {
        return (
            <form className={"centeredform"} onSubmit={(e)=>{this.handleForm(e);}}>
                <label htmlFor={"regemail"}>
                    <i className={"fas fa-at label-i"}/>
                    <input id="regemail" type={"email"} placeholder={"Email"} name={"email"} autoFocus={true} required/>
                </label>

                <label htmlFor={"logpass"}>
                    <i className={"fas fa-user-lock label-i"}/>
                    <input id={"logpass"} type={"password"} placeholder={"Password"} name={"password"} required/>
                </label>

                <button type={"submit"}>Submit</button>
            </form>
        )
    };

    logIn = (f) => {
        let fdata = new FormData(f.currentTarget);
        let url = `/api/${this.state.modalState.contentType === "login" ? "login" : "createuser"}`;

        fetch(url, {method: "POST", body: fdata})
            .then(response => Promise.all([response.ok, response.ok ? response.json() : response.text()]))
            .then(([ok, body]) => {
                if(ok){
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

        return (
            this.props.teacher
                ? <Redirect push to={{pathname: "/dashboard/main"}}/>
                : (
                    <div className={"herocontainer"}
                         onClick={(e) => {
                            exitModal(e, displayed, ()=>{this.handleModal(false, "")})
                        }}
                    >
                    <Modal displayed={displayed}>
                        <div className="formcontainer">
                            <div className={"formheader"}>
                                <h2>{contentType === "login" ? "Welcome back!" : "Let's get you started."}</h2>
                                <hr/>
                            </div>
                            {this.createForm(contentType)}
                        </div>
                    </Modal>
                    <header className={"homeheader"}>
                        <img src={logo} alt={"Advocate logo"}/>
                        <div className={"promptcontainer"}>
                            <div onClick={() => {this.handleModal(true, "login")}} className={"headerlogin i-hover"}>
                                <i className={"fas fa-user i-right"}/>
                                <span>Login</span>
                            </div>
                            <div onClick={() => {this.handleModal(true, "register")}} className={"headerregister i-hover"}>
                                <i className={"fas fa-user-plus i-right"}/>
                                <span>Register</span>
                            </div>
                        </div>
                    </header>
                    <div className={"herotext"}>
                        <h3>Advocate through data.</h3>
                        <h2>Spend less time with data collection and more time impacting lives.</h2>
                        <br/>
                        <p><i className={"far fa-chart-bar i-right"}/> Visualize student growth</p>
                        <p><i className={"fas fa-sync-alt i-right"}/> Create templates to reuse goals</p>
                        <p><i className={"fas fa-users i-right"}/>Manage all of your classrooms</p>
                        <p><i className={"fas fa-network-wired i-right"}/>Multiple methods to track progress</p>
                    </div>
                </div>
                  )
        );
    }
}

export default Home;