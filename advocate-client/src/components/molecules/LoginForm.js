import React from "react";
import {
    FaAt as EmailIcon,
    FaUserLock as PassIcon
} from "react-icons/fa";
import FormElement from "components/atoms/FormElement";
/*
     props:

     state:

*/

const LoginForm = ({login, errors, updateFormValues}) => {
    

    return(
        <>
            <div className="marg-bot">
                <FormElement
                    label="Email"
                    onChange={(e) => updateFormValues(e, "username")}
                    value={login.username}
                    icon={<EmailIcon/>}
                    placeholder={"Email"}
                    name={"username"}
                    autoFocus
                />
            </div>
            <div className="marg-bot">
                <FormElement
                    label="Password"
                    value={login.password}
                    icon={<PassIcon/>}
                    /*type={"password"}*/
                    placeholder={"Password"}
                    name={"password"}
                    onChange={(e) => updateFormValues(e, "password")}
                />
            </div>
            {
                errors
                    ? <p className={"inputerror marg-bot"}>{ errors.login }</p>
                    : <></>
            }
        </>
    );
};

export default LoginForm;
