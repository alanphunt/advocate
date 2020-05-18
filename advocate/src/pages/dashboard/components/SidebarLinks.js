import React from "react";
import SidebarDropdown from "./SidebarDropdown";
import {NavLink} from "react-router-dom";

class SidebarLinks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {activeLink: (window.location.pathname.split("/dashboard/")[1])};
    }

    render() {
        const links = {
            "link1" : {text: "dashboard", islink: true, link: "/dashboard/main", icon: "fas fa-columns"},
            "link2" : {text: "classroom", islink: false,
                menuItems: [
                    {"itemtext": "Classroom", "link": "/dashboard/classroom"},
                    {"itemtext": "Create Classroom", "link": "/dashboard/classroom/create"}
                ], icon: "far fa-address-book"},
            "link3" : {text: "charts", islink: false,
                menuItems: [
                    {"itemtext": "Charts", "link": "/dashboard/charts"}
                ], icon: "far fa-chart-bar"},
            "link4" : {text: "goal center", islink: false,
                menuItems: [
                    {"itemtext": "Goal Center", "link": "/dashboard/goalcenter"},
                    {"itemtext": "Create Goal", "link": "/dashboard/goalcenter/create"}
                ], icon: "far fa-compass"}
        };
//            "link5" : {text: "minimize", islink: false, icon: "far fa-hand-point-left"}
        return (
            <div className={"sideitemwrapper"}>
                {
                    Object.values(links).map(link => {
                    let linktext = link.text.replace(" ", "");
                        return (
                            <div key={link.text} className={"sideitem"}>
                            {   link.islink
                                ?   <NavLink onClick={()=>{this.props.updateActiveLink(link.text)}} activeClassName={"active"} to={link.link}>
                                        <div className={"itemmain"}>
                                            <div className={"itemmaininner"}>
                                                <i className={link.icon}/>
                                                <span>{link.text}</span>
                                            </div>
                                        </div>
                                    </NavLink>
                                : link.menuItems
                                    ? <SidebarDropdown link={link} updateActiveLink={this.props.updateActiveLink} isActive={this.props.activeLink === linktext}/>
                                    : <div className={"itemmain minmax"}>
                                        <div className={"itemmaininner"}>
                                            <i className={link.icon}/>
                                            <span>{link.text}</span>
                                        </div>
                                      </div>
                            }
                            </div>
                        )
                })}
            </div>
        );
    }
}

export default SidebarLinks;