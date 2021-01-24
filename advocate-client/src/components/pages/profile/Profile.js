import React from "react";
import ProfileCard from "components/atoms/ProfileCard";
import DashCard from "components/molecules/DashCard";
import DashWidget from "components/molecules/DashWidget";
import {
    FaAt as EmailIcon,
    FaUserLock as PassIcon,
    FaIdCard as NameIcon,
    FaUserCheck as CheckIcon,
    FaCommentDots as DotsIcon
} from "react-icons/fa";
import { useAuth } from "utils/auth/AuthHooks";

const Profile = () => {
    const {teacher} = useAuth();

    return (
        <DashCard>
            <div className={"cardwrapperrow"}>
                <DashWidget flexSize={1}>
                    <ProfileCard editable={true} teacher={teacher.teacher}/>
                </DashWidget>
                <DashWidget className="infocard" flexSize={1}>
                    <h2>Edit Profile</h2>
                    <form>
                        <label htmlFor={"regfirst"}>
                            <NameIcon className={"label-i"}/>
                            <input id="regfirst" type={"text"} placeholder={"First Name"} name={"firstname"}/>
                        </label>
                        <label htmlFor={"reglast"}>
                            <NameIcon className={"label-i"}/>
                            <input id="reglast" type={"text"} placeholder={"Last Name"} name={"lastname"}/>
                        </label>
                        <label htmlFor={"regemail"}>
                            <EmailIcon className={"label-i"}/>
                            <input id="regemail" type={"email"} placeholder={"Email"} name={"email"}/>
                        </label>
                        <label htmlFor={"regpass"}>
                            <PassIcon className={"label-i"}/>
                            <input id="regpass" type={"password"} placeholder={"Password"} name={"password"}/>
                        </label>
                        <label htmlFor={"regconf"}>
                            <CheckIcon className={"label-i"}/>
                            <input id={"regconf"} type={"password"} placeholder={"Confirm Password"}/>
                        </label>
                        <label className={"labelblock"} htmlFor={"regdesc"}>
                            <DotsIcon className={"label-i"}/>
                            <input id={"regdesc"} type={"text"} placeholder={"Tell us about yourself"}/>
                        </label>
                    </form>
                </DashWidget>
            </div>
        </DashCard>
    )
};

export default Profile;