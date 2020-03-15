import React from "react";
import {Link} from 'react-router-dom';


const SideNav = () => {
    let x = 0;
    const links = [
        {
            text: "Dashboard",
            url: "dashboard",
            icon: "far fa-newspaper",
            key: `Dashboard${++x}`
        },
        {
            text: "Classroom",
            url: "classroom",
            icon: "far fa-users",
            key: `Classroom${++x}`
        },
    ];

    return(
      links.map(link => (
        <div className={"sidemenulink"}>
            <Link to={'/'+link.url}>
                <i className={link.icon + " i-gray"}/>
                <p>{link.text}</p>
            </Link>
        </div>
      ))
    );
};

export default SideNav;