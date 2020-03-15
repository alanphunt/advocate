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
                item1: {"itemtext": "Classroom", "link": "/dashboard/classroom"},
                item2: {"itemtext": "Example Two", "link": "/dashboard/classroom/somethingelse"},
                item3: {"itemtext": "Example Three", "link": "/dashboard/classroom/somethingotherthan"}
                    }, icon: "far fa-address-book"},
            "link3" : {text: "CHARTS", islink: false, menuItems: {
                    item1: {"itemtext": "Charts", "link": "/dashboard/charts"},
                    item2: {"itemtext": "Example Two", "link": "/dashboard/charts/somethingelse"},
                    item3: {"itemtext": "Example Three", "link": "/dashboard/charts/somethingotherthan"}
                }, icon: "far fa-chart-bar"},
            "link4" : {text: "GOAL CENTER", islink: false, menuItems: {
                    item1: {"itemtext": "Goal Center", "link": "/dashboard/goalcenter"},
                    item2: {"itemtext": "Example Two", "link": "/dashboard/goalcenter/somethingelse"},
                    item3: {"itemtext": "Example Three", "link": "/dashboard/goalcenter/somethingotherthan"}
                }, icon: "far fa-compass"},
        };

        return (
            <div className={"sideitemwrapper"}>
                {Object.values(links).map(link => {
                    let linktext = link.text.replace(" ", "");
                        return (
                            <div key={link.text} className={"sideitem"}>
                            {   link.islink
                                ?   <NavLink onClick={()=>{this.handleChange(link.text)}} className={this.state.current === linktext ? "active" : ""} to={link.link}>
                                        <div className={"itemmain"}>
                                            <div className={"itemmaininner"}>
                                                <i className={link.icon}/>
                                                <span>{link.text}</span>
                                            </div>
                                        </div>
                                    </NavLink>
                                : <SidebarDropdown link={link} updateActiveLink={this.handleChange} isActive={this.state.current === linktext}/>
                            }
                            </div>
                        )
                })}
            </div>
        );
    }
}

export default SidebarLinks;