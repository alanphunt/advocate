import React from "react";
import SidebarDropdown from "./SidebarDropdown";
import {NavLink} from "react-router-dom";

class SidebarLinks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {current: (window.location.pathname.split("/dashboard/")[1].toUpperCase())};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        this.setState({current: (e.replace(" ", ""))});
    }

    render() {
        const links = {
            "link1" : {text: "DASHBOARD", islink: true, link: "/dashboard/main", icon: "fas fa-columns"},
            "link2" : {text: "CLASSROOM", islink: false, menuItems: {
                item1: {"itemtext": "Classroom", "link": "/dashboard/classroom"}
                    }, icon: "far fa-address-book"},
            "link3" : {text: "CHARTS", islink: false, menuItems: {
                    item1: {"itemtext": "Charts", "link": "/dashboard/charts"}
                }, icon: "far fa-chart-bar"},
            "link4" : {text: "GOAL CENTER", islink: false, menuItems: {
                    item1: {"itemtext": "Goal Center", "link": "/dashboard/goalcenter"}
                }, icon: "far fa-compass"},
            "link5" : {text: "MINIMIZE", islink: false, icon: "far fa-hand-point-left"}
        };

        return (
            <div className={"sideitemwrapper"}>
                {Object.values(links).map(link => {
                    let linktext = link.text.replace(" ", "");
                        return (
                            <div key={link.text} className={"sideitem"}>
                            {   link.islink
                                ?   <NavLink onClick={()=>{this.props.updateActiveLink(link.text)}} className={this.props.activeLink === linktext ? "active" : ""} to={link.link}>
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