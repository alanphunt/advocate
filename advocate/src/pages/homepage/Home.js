import React from 'react';
import logo from '../../assets/advocate.png'
import modal from './components/Modal'

const Home = () => {
    return (
        <div className={"herocontainer"}>
        <header className={"homeheader"}>
            <img src={logo}/>
            <div className={"promptcontainer"}>
                <div onClick={()=> modal(true, "login")} className={"headerlogin i-hover"}><i className={"fas fa-user i-right"}/><span>Login</span></div>
                <div onClick={()=> modal(true, "register")} className={"headerregister i-hover"}><i className={"fas fa-user-plus i-right"}/><span>Register</span></div>
            </div>
        </header>

        <div className={"herotext"}>
            <h3>Advocate through data.</h3>
            <h2>Spend less time administering your data and more time impacting lives.</h2>
            <br/>
            <p><i className={"far fa-chart-bar i-right"}/> Visualize your student's growth</p>
            <p><i className={"fas fa-sync-alt i-right"}/> Create templates to reuse goals</p>
            <p><i className={"fas fa-users i-right"}/>Manage your classroom as a whole</p>
            <p><i className={"fas fa-network-wired i-right"}/>Multiple categories to track progress</p>
        </div>

        </div>
    );
};

export default Home;
