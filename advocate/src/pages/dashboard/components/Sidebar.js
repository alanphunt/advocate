import React from "react";
import '../../../css/dashboardstyles.css';
import puzzle from '../../../assets/puzzle.png';
import SidebarLinks from "./SidebarLinks";
import SidebarProfile from "./SidebarProfile";

class Sidebar extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div className={"sidebarwrapper"}>
                <div className={"sidebar"}>
                    <div className={"sidebarheader sidebarpad"}>
                        <img src={puzzle} alt={"logo"}/>
                    </div>
                    <div className={"sidebarmain sidebarpad sideflex"}>
                        <SidebarLinks/>
                    </div>
                    <SidebarProfile/>
                </div>
            </div>
        )
    }
}

export default Sidebar;