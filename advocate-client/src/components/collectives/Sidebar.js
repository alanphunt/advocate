import React from "react";
import puzzle from "images/puzzle-sm.png";
import SidebarLinks from "components/collectives/SidebarLinks";
import SidebarProfile from "components/singletons/SidebarProfile";
import {STORAGE} from "utils/constants";

const Sidebar = ({teacher, navHandler, logout}) => {
    const active = navHandler.activeCategory;
    const changeActive = navHandler.updateActiveCategory;

    return(
        <div className={"sidebarwrapper"}>
            <div className={"sidebar"}>
                <div className={"sidebarheader sidebarpad"}>
                    <img
                        src={puzzle}
                        className={"selectable"}
                        alt={"logo"}
                        onClick={() => {
                            fetch("/api/logout")
                                .then(() => {})
                                .then(() => {
                                    STORAGE.clear();
                                    logout();
                                });
                        }}
                    />
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