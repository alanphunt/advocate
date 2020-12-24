import React, { useEffect } from "react";
import SidebarDropdown from "components/molecules/SidebarDropdown";
import {NavLink} from "react-router-dom";
import {FaColumns as ColIcon, FaRegAddressBook as BookIcon, FaRegChartBar as BarIcon, FaRegCompass as CompassIcon} from "react-icons/all";

const SidebarLinks = ({activeLink, updateActiveLink}) => {
    useEffect(() => {
        if(!activeLink)
            updateActiveLink(window.location.pathname.split("/dashboard/")[1]);
    }, []);

    const links = {
        "link1" : {text: "dashboard", islink: true, link: "/dashboard/main", icon: <ColIcon/>},
        "link2" : {text: "classroom", islink: true, link: "/dashboard/classroom", icon: <BookIcon/>},
        "link3" : {text: "progress report", islink: true, link: "/dashboard/progressreport", icon: <BarIcon/>},
        "link4" : {text: "goal center", islink: true, link: "/dashboard/goalcenter", icon: <CompassIcon/>}
        /*             "link4" : {text: "goal center", islink: false,
            menuItems: [
                {"itemtext": "Goal Center", "link": "/dashboard/goalcenter"},
                {"itemtext": "Create Goal", "link": "/dashboard/goalcenter/create"}
            ], icon: <CompassIcon/>} */
    };

    return (
        <div className={"sideitemwrapper"}>
            {
                Object.values(links).map(link => {
                let linktext = link.text.replace(" ", "");
                    return (
                        <div key={link.text} className={"sideitem"}>
                            {   link.islink
                                ?   <NavLink onClick={()=>{updateActiveLink(link.text)}} activeClassName={"active"} to={link.link}>
                                        <div className={"itemmain"}>
                                            <div className={"itemmaininner"}>
                                                {link.icon}
                                                <span>{link.text}</span>
                                            </div>
                                        </div>
                                    </NavLink>
                                : link.menuItems
                                    ? <SidebarDropdown link={link} updateActiveLink={updateActiveLink} isActive={activeLink === linktext}/>
                                    : <div className={"itemmain minmax"}>
                                        <div className={"itemmaininner"}>
                                            {link.icon}
                                            <span>{link.text}</span>
                                        </div>
                                      </div>
                            }
                        </div>
                    )
                })
            }
        </div>
    );

};

export default SidebarLinks;