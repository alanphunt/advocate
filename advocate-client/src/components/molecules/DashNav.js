import React from "react";
import {
    Link,
    useLocation
  } from "react-router-dom";
import {FaUserEdit as UserIcon, FaQuestion as QuestionIcon} from "react-icons/fa";
/*
     props:

     state:

*/

const DashNav = ({activeCategory}) => {
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
                <Link to="/dashboard/profile"><UserIcon className={`i-right i-hover${activeCategory === "profile" ? ' active' : ''}`}/></Link>
                <Link to="/dashboard/help"><QuestionIcon className={`i-hover${activeCategory === "help" ? ' active' : ''}`}/></Link>
            </div>
        </nav>
    );
};

export default DashNav;
