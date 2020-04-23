import React from "react";
import '../../../css/dashboardstyles.css';
import puzzle from '../../../assets/puzzle-sm.png';
import SidebarLinks from "./SidebarLinks";
import SidebarProfile from "./SidebarProfile";
import {Link} from "react-router-dom";

const Sidebar = (props) => {
    const active = props.navHandler.activeCategory;
    const changeActive = props.navHandler.updateActiveCategory;
    const teacher = props.teacher;
    return(
        <div className={"sidebarwrapper"}>
            <div className={"sidebar"}>
                <div className={"sidebarheader sidebarpad"}>
                    <Link to={"/"} onClick={() => {fetch("/api/logout");}}><img src={puzzle} alt={"logo"}/></Link>
                </div>
                <div className={"sidebarmain sidebarpad sideflex"}>
                    <SidebarLinks updateActiveLink={changeActive} activeLink={active}/>
                </div>
                <SidebarProfile teacher={teacher} updateActiveLink={changeActive} isActive={active === "profile"}/>
            </div>
        </div>
    )
};

export default Sidebar;