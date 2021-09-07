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

const RegisterForm = ({errors, register, updateRegistrationValues}) => {
    

    return(
        <>
            <div className="marg-bot">
                <FormElement
                    label="First Name"
                    value={register.firstName}
                    icon={<NameIcon/>}
                    placeholder={"First Name"}
                    name={"firstName"}
                    errorMessage={errors.firstName}
                    onChange={(e) => {updateRegistrationValues(e, "firstName")}}
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
                    errorMessage={errors.lastName}
                    onChange={(e) => {updateRegistrationValues(e, "lastName")}}
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
                    errorMessage={errors.username}
                    onChange={(e) => {updateRegistrationValues(e, "username")}}
                    required
                />
            </div>
            <div className="marg-bot">
                <FormElement
                    label="Password"
                    onChange={(e) => {updateRegistrationValues(e, "password")}}
                    value={register.password}
                    icon={<PassIcon/>}
                    type={"password"}
                    placeholder={"Password"}
                    name={"password"}
                    errorMessage={errors.password}
                    required
                />
            </div>
        </>
    );
};

export default RegisterForm;
