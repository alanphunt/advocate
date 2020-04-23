import React from "react";
import imgph from "../../../assets/imgph.png";
import {NavLink} from "react-router-dom";

class SidebarProfile extends React.Component {
    render() {
        let teacher = this.props.teacher;
        return (
            <div className={"sidebarfooter sidebarpad"}>
                <NavLink onClick={()=>{this.props.updateActiveLink("profile")}} activeClassName={"active"} to={"/dashboard/profile"}>
                    <div className={"itemmain"}>
                        <div className={"itemmaininner"}>
                            <img className={"sidebar-default-pic marg-right"} src={imgph} alt={"user"}/>
                            <p>{`${teacher.firstName} ${teacher.lastName.charAt(0)}.`}</p>
                        </div>
                        <i className={"fas fa-caret-right transition"}/>
                    </div>
                </NavLink>
            </div>
        )
    }
}

export default SidebarProfile;