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
                        <label htmlFor={"loginfirstname"}>
                            <i className={"fas fa-id-card"}/>
                            <input id="loginfirstname" type={"text"} placeholder={"First Name"} name={"firstname"} required/>
                        </label>
                        <label htmlFor={"loginfirstname"}>
                            <i className={"fas fa-id-card"}/>
                            <input type={"text"} placeholder={"Last Name"} name={"lastname"} required/>
                        </label>
                        <label htmlFor={"loginfirstname"}>
                            <i className={"fas fa-at"}/>
                            <input type={"email"} placeholder={"Email"} name={"email"} required/>
                        </label>
                        <label htmlFor={"loginfirstname"}>
                            <i className={"fas fa-user"}/>
                            <input type={"text"} placeholder={"Username"} name={"username"} required/>
                        </label>
                        <label htmlFor={"loginfirstname"}>
                            <i className={"fas fa-user-lock"}/>
                            <input type={"password"} placeholder={"Password"} name={"password"} required/>
                        </label>
                        <label htmlFor={"loginfirstname"}>
                            <i className={"fas fa-user-check"}/>
                            <input type={"password"} placeholder={"Confirm Password"} required/>
                        </label>
                        <button type={"submit"}>Submit</button>
                    </form>
            )
        };
        const loginForm = () => {
            return (
                    <form className={"centeredform"} onSubmit={(event) => {this.handleForm(event, formType)}}>
                        <label htmlFor={"loginfirstname"}>
                            <i className={"fas fa-user"}/>
                            <input type={"text"} placeholder={"Username"} name={"username"} required/>
                        </label>
                        <label htmlFor={"loginfirstname"}>
                            <i className={"fas fa-user-lock"}/>
                            <input type={"password"} placeholder={"Password"} name={"password"} required/>
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