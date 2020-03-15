import React from 'react';
import logo from '../../../assets/advocate.png';
import SideNav from './SideNav';

const Header = () => {
    return (
        <header className={"sidemenu"}>
            <div className={"sidemenuinner"}>
                <div className={"sidemenuheader"}>
                    <img className="sidemenulogo" src={logo}/>
                </div>
                <div className={"sidemenuuser"}>

                </div>
                <div className={"sidemenunav"}>
                    <SideNav/>
                </div>
            </div>
        </header>
    );
};

export default Header;
