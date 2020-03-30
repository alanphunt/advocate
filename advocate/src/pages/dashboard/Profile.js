import React from "react";
import imgph from "../../assets/imgph.png";

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            picHovered: false
        };
        this.picHover = this.picHover.bind(this);
    }

    picHover(){
        this.setState(state => ({picHovered: !state.picHovered}))
    }

    render() {
        return (
            <div className={"dash-main-inner"}>
                <div className={"cardwrapperrow"}>
                    <div className={"card piccard"}>
                        <div className={"piccardheader"}>
                            <div onMouseEnter={this.picHover} onMouseLeave={this.picHover} className={"cropped"}>
                                <img src={imgph} alt={"user"}/>
                                <label  htmlFor={"file"} className={"addpic"+(this.state.picHovered ? " display" : "")}>
                                    <i className="fas fa-plus"/>
                                </label>
                                <input id="file" type="file" name="file" accept="image/*" style={{display: 'none'}}/>
                            </div>
                            <h2>Allison S.</h2>
                        </div>
                        <div className={"piccardinfo"}>
                            <p className={"quote"}>"There are a few things I don't like..two of which are coffee and D62"</p>
                            <p>Member since Jan. 17 2020</p>
                        </div>
                    </div>

                    <div className={"card infocard"}>
                        <h2>Edit Profile</h2>
                        <form>
                            <label htmlFor={"regfirst"}>
                                <i className={"fas fa-id-card"}/>
                                <input id="regfirst" type={"text"} placeholder={"First Name"} name={"firstname"}/>
                            </label>
                            <label htmlFor={"reglast"}>
                                <i className={"fas fa-id-card"}/>
                                <input id="reglast" type={"text"} placeholder={"Last Name"} name={"lastname"}/>
                            </label>
                            <label htmlFor={"regemail"}>
                                <i className={"fas fa-at"}/>
                                <input id="regemail" type={"email"} placeholder={"Email"} name={"email"}/>
                            </label>
                            <label htmlFor={"reguser"}>
                                <i className={"fas fa-user"}/>
                                <input id="reguser" type={"text"} placeholder={"Username"} name={"username"}/>
                            </label>
                            <label htmlFor={"regpass"}>
                                <i className={"fas fa-user-lock"}/>
                                <input id="regpass" type={"password"} placeholder={"Password"} name={"password"}/>
                            </label>
                            <label htmlFor={"regconf"}>
                                <i className={"fas fa-user-check"}/>
                                <input id={"regconf"} type={"password"} placeholder={"Confirm Password"}/>
                            </label>
                            <label className={"labelblock"} htmlFor={"regdesc"}>
                                <i className={"fas fa-comment-dots"}/>
                                <input id={"regdesc"} type={"text"} placeholder={"Tell us about yourself"}/>
                            </label>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;