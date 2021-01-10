import React from "react";
import NavItem from "components/atoms/NavItem";
import {FaColumns as ColIcon, FaRegAddressBook as BookIcon, FaRegChartBar as BarIcon, FaRegCompass as CompassIcon} from "react-icons/all";
import {NavLink} from "react-router-dom";

const SidebarLinks = ({expanded}) => {
    const links = [
        {text: "dashboard", link: "/dashboard/main", icon: <ColIcon/>},
        {text: "classroom", link: "/dashboard/classroom", icon: <BookIcon/>},
        {text: "goal center", link: "/dashboard/goalcenter", icon: <CompassIcon/>},
        {text: "progress report", link: "/dashboard/progressreport", icon: <BarIcon/>}
    ];

    return (
        <div className={"sideitemwrapper"}>
            {
                links.map(link => {
                    return (
                        <NavLink activeClassName="active active-border" key={`link-${link.text}`} to={link.link}>
                            <NavItem expanded={expanded} text={link.text} icon={link.icon}/>
                        </NavLink>
                    )
                })
            }
        </div>
    );

};

export default SidebarLinks;