import React from "react";
import FormElement from "components/atoms/FormElement";
import {
    FaAt as EmailIcon,
    FaIdCard as NameIcon,
    FaUserLock as PassIcon
} from "react-icons/fa";
/*
     props:

     state:

*/

const RegisterForm = ({errors, register, updateFormValues}) => {
    

    return(
        <>
            <div className="marg-bot">
                <FormElement
                    label="First Name"
                    value={register.firstName}
                    icon={<NameIcon/>}
                    placeholder={"First Name"}
                    name={"firstName"}
                    errorMessage={errors.registerFirstName}
                    onChange={(e) => {updateFormValues(e, "firstName")}}
                    autoFocus
                    required
                />
            </div>
            <div className="marg-bot">
                <FormElement
                    label="Last Name"
                    value={register.lastName}
                    icon={<NameIcon/>}
                    placeholder={"Last Name"}
                    name={"lastName"}
                    errorMessage={errors.registerLastName}
                    onChange={(e) => {updateFormValues(e, "lastName")}}
                    required
                />
            </div>
            <div className="marg-bot">
                <FormElement
                    label="Email"
                    value={register.username}
                    icon={<EmailIcon/>}
                    placeholder={"Email"}
                    name={"username"}
                    errorMessage={errors.registerUsername}
                    onChange={(e) => {updateFormValues(e, "username")}}
                    required
                />
            </div>
            <div className="marg-bot">
                <FormElement
                    label="Password"
                    onChange={(e) => {updateFormValues(e, "password")}}
                    value={register.password}
                    icon={<PassIcon/>}
                    type={"password"}
                    placeholder={"Password"}
                    name={"password"}
                    errorMessage={errors.registerPassword}
                    required
                />
            </div>
        </>
    );
};

export default RegisterForm;
