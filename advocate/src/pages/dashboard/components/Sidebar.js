import React from "react";
import '../../../css/dashboardstyles.css';
import puzzle from '../../../assets/puzzle.png';
import SidebarLinks from "./SidebarLinks";
import SidebarProfile from "./SidebarProfile";
import {Link} from "react-router-dom";

class Sidebar extends React.Component{

    render(){
        const active = this.props.navHandler.activeCategory;
        const changeActive = this.props.navHandler.updateActiveCategory;
        const teacher = this.props.teacher;
        return(
            <div className={"sidebarwrapper"}>
                <div className={"sidebar"}>
                    <div className={"sidebarheader sidebarpad"}>
                        <Link to={"/"}><img src={puzzle} alt={"logo"}/></Link>
                    </div>
                    <div className={"sidebarmain sidebarpad sideflex"}>
                        <SidebarLinks updateActiveLink={changeActive} activeLink={active}/>
                    </div>
                    <SidebarProfile teacher={teacher} updateActiveLink={changeActive} isActive={active === "profile"}/>
                </div>
            </div>
        )
    }
}

export default Sidebar;