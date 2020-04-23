import React from "react";
import ProfileCard from "./components/ProfileCard";

const Profile = (props) => {
    let teacher = props.teacher;

    return (
        <div className={"dash-main-inner"}>
            <div className={"cardwrapperrow"}>
                <ProfileCard editable={true} teacher={teacher}/>
                <div className={"card infocard"}>
                    <h2>Edit Profile</h2>
                    <form>
                        <label htmlFor={"regfirst"}>
                            <i className={"fas fa-id-card label-i"}/>
                            <input id="regfirst" type={"text"} placeholder={"First Name"} name={"firstname"}/>
                        </label>
                        <label htmlFor={"reglast"}>
                            <i className={"fas fa-id-card label-i"}/>
                            <input id="reglast" type={"text"} placeholder={"Last Name"} name={"lastname"}/>
                        </label>
                        <label htmlFor={"regemail"}>
                            <i className={"fas fa-at label-i"}/>
                            <input id="regemail" type={"email"} placeholder={"Email"} name={"email"}/>
                        </label>
                        <label htmlFor={"regpass"}>
                            <i className={"fas fa-user-lock label-i"}/>
                            <input id="regpass" type={"password"} placeholder={"Password"} name={"password"}/>
                        </label>
                        <label htmlFor={"regconf"}>
                            <i className={"fas fa-user-check label-i"}/>
                            <input id={"regconf"} type={"password"} placeholder={"Confirm Password"}/>
                        </label>
                        <label className={"labelblock"} htmlFor={"regdesc"}>
                            <i className={"fas fa-comment-dots label-i"}/>
                            <input id={"regdesc"} type={"text"} placeholder={"Tell us about yourself"}/>
                        </label>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default Profile;