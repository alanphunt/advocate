import React from "react";
import puzzle from "images/puzzle-sm.png";
import SidebarLinks from "components/molecules/SidebarLinks";
import { FaArrowLeft as LeftArrowIcon, FaArrowRight as RightArrowIcon } from "react-icons/fa";
import NavItem from "components/atoms/NavItem";

const Sidebar = ({expanded, setExpanded, teacher, navHandler, logout}) => {
    const active = navHandler.activeCategory;
    const changeActive = navHandler.updateActiveCategory;

    return(
        <div className={`sidebarwrapper${expanded ? " sidebarexpanded" : ""}`}>
            <div className={"sidebar"}>
                <div className={"sidebarheader"}>
                    <img
                        src={puzzle}
                        className={"selectable"}
                        alt={"logo"}
                        onClick={() => {
                            fetch("/api/logout")
                                .then(() => {})
                                .then(() => {
                                    logout();
                                });
                        }}
                    />
                </div>
                <div className={"sidebarmain"}>
                    <SidebarLinks expanded={expanded} updateActiveLink={changeActive} activeLink={active}/>
                </div>
                <div className="sidebarfooter" onClick={() => setExpanded(prev => !prev)}>
                    <NavItem className="selectable" icon={expanded ? <LeftArrowIcon/> : <RightArrowIcon/>} text={"Shrink Sidebar"} expanded={expanded}/>
                </div>
            </div>
        </div>
    )
};

export default Sidebar;