import React from "react";

class Modal extends React.Component{
    constructor(props){
        super(props);
        this.handleModal = this.handleModal.bind(this);
        this.handleForm = this.handleForm.bind(this);
    }

    handleForm = (event, formType) => {
        event.preventDefault();
        this.props.modalProps.callback();
    };

    handleModal = (formType) => {
        const registerForm = () => {
            return (
                    <form className={"centeredform"} onSubmit={(event) => {this.handleForm(event, formType)}}>
                        <label htmlFor={"regfirst"}>
                            <i className={"fas fa-id-card"}/>
                            <input id="regfirst" type={"text"} placeholder={"First Name"} name={"firstname"} required/>
                        </label>
                        <label htmlFor={"reglast"}>
                            <i className={"fas fa-id-card"}/>
                            <input id="reglast" type={"text"} placeholder={"Last Name"} name={"lastname"} required/>
                        </label>
                        <label htmlFor={"regemail"}>
                            <i className={"fas fa-at"}/>
                            <input id="regemail" type={"email"} placeholder={"Email"} name={"email"} required/>
                        </label>
                        <label htmlFor={"reguser"}>
                            <i className={"fas fa-user"}/>
                            <input id="reguser" type={"text"} placeholder={"Username"} name={"username"} required/>
                        </label>
                        <label htmlFor={"regpass"}>
                            <i className={"fas fa-user-lock"}/>
                            <input id="regpass" type={"password"} placeholder={"Password"} name={"password"} required/>
                        </label>
                        <label htmlFor={"regconf"}>
                            <i className={"fas fa-user-check"}/>
                            <input id={"regconf"} type={"password"} placeholder={"Confirm Password"} required/>
                        </label>
                        <button type={"submit"}>Submit</button>
                    </form>
            )
        };
        const loginForm = () => {
            return (
                    <form className={"centeredform"} onSubmit={(event) => {this.handleForm(event, formType)}}>
                        <label htmlFor={"loguser"}>
                            <i className={"fas fa-user"}/>
                            <input id="loguser" type={"text"} placeholder={"Username"} name={"username"} required/>
                        </label>
                        <label htmlFor={"logpass"}>
                            <i className={"fas fa-user-lock"}/>
                            <input id={"logpass"} type={"password"} placeholder={"Password"} name={"password"} required/>
                        </label>
                        <button type={"submit"}>Submit</button>
                    </form>
            )
        };
        return (formType === "login" ? loginForm() : formType === "register" ? registerForm() : "");
    };

    render(){
        return(
            <div className={`formmodal bubble ${(this.props.modalProps.modalState.displayed ? "display fadein" : "")}`}>
                <div className="formcontainer">
                    <div className={"formheader"}>
                        <h2>{this.props.modalProps.modalState.contentType === "login" ? "Welcome back!" : "Let's get you started."}</h2>
                        <hr/>
                    </div>
                    {this.handleModal(this.props.modalProps.modalState.contentType)}
                </div>
            </div>
        )
    }
}

export default Modal;