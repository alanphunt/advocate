import React from 'react';
import logo from '../../assets/advocate.png'
import Modal from './components/Modal'
import {Redirect} from "react-router";

class Home extends React.Component{
    constructor(props){
        super(props);
        /*fetch("/api/logout");*/
        this.state = {
            modalState:{
                displayed: false,
                contentType: "",
            },
            loggedIn: false,
            teacher: {}
        };
    }

    handleModal = (vis, formType) => {
        this.setState({modalState: {displayed: vis, contentType: formType}});
    };

    exitModal = (event) => {
        if (this.state.modalState.displayed && event.target.closest(".formmodal") === null && event.target.closest(".promptcontainer") === null)
            this.handleModal(false, "");
    };

    logIn = (f) => {
        let fdata = new FormData(f.currentTarget);
        let url = `/api/${this.state.modalState.contentType === "login" ? "login" : "createuser"}`;

        fetch(url, {method: "POST", body: fdata})
            .then(response => Promise.all([response.ok, response.ok ? response.json() : response.text()]))
            .then(([ok, body]) => {
                if(ok){
                    this.setState({
                        loggedIn: true,
                        teacher: body
                    });
                }else{
                    throw new Error(body);
                }
             })
            .catch(e => alert(e));
    };

    render() {
        return (
            this.state.loggedIn
                ? <Redirect push to={{pathname: "/dashboard/main", state: {teacher: this.state.teacher}}}/>
                : (<div className={"herocontainer"} onClick={this.exitModal}>
                    <Modal modalProps={{modalState: this.state.modalState, callback: this.logIn}}/>
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
                        <p><i className={"fas fa-users i-right"}/>Manage your classroom</p>
                        <p><i className={"fas fa-network-wired i-right"}/>Multiple methods to track progress</p>
                    </div>
                  </div>)
        );
    }
}

export default Home;
