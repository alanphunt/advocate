import React from "react";
import {
    NavLink,
    useLocation
  } from "react-router-dom";
import {FaUserEdit as UserIcon, FaQuestion as QuestionIcon} from "react-icons/fa";
/*
     props:

     state:

*/

const DashNav = () => {
    let location = useLocation();

    const determineCurrentPage = () => {
        let page = location.pathname.split("/");
        let last = page[page.length-1];
        switch(last){
            case "goalcenter":
                return "goal center";
            case "progressreport":
                return "progress report";
            default: return last;
        }
    };

    return (
        <nav className="dash-nav">
            <div className="dash-nav__breadcrumb">Dashboard / {determineCurrentPage()}</div>
            <div className="dash-nav__profile">
                <NavLink activeClassName="active" to="/dashboard/profile"><UserIcon className={`i-right i-hover`}/></NavLink>
                <NavLink activeClassName="active" to="/dashboard/help"><QuestionIcon className={`i-hover`}/></NavLink>
            </div>
        </nav>
    );
};

export default DashNav;
