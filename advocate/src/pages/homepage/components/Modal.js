import React from 'react';

const loginForm = () => {
    return (
        <div>
            <form>
                <input type={"text"} placeholder={"Username"} name={"username"} required/>
                <input type={"password"} placeholder={"Password"} name={"password"} required/>
                <button type={"submit"}>Submit</button>
            </form>
        </div>
    )
};

const registerForm = () => {
    return (
        <div>
            <form>
                <input type={"text"} placeholder={"First Name"} name={"firstname"} required/>
                <input type={"text"} placeholder={"Last Name"} name={"lastname"} required/>
                <input type={"email"} placeholder={"Email"} name={"email"} required/>
                <input type={"text"} placeholder={"Username"} name={"username"} required/>
                <input type={"password"} placeholder={"Password"} name={"password"} required/>
                <input type={"password"} placeholder={"Confirm Password"} required/>
                <button type={"submit"}>Submit</button>
            </form>
        </div>
    )
};

const loginDiv = props => {
    return (
        <div className={"headerlogin i-hover"}><i className={"fas fa-user i-right"}/><span>Login</span></div>
    );
};

const registerDiv = props => {
    return (
        <div className={"headerregister i-hover"}><i className={"fas fa-user-plus i-right"}/><span>Register</span></div>
    );
};

const Modal = (props) => {
    return (
        <div className={"formmodal"} style={{display: (props.visibility === true ? 'flex' : 'none')}}>
            {props.formType === "login" ? loginForm() : registerForm()}
        </div>
    );
};

export default Modal;
