import React from "react";

/*
     props:

     state:

*/

const NavItem = ({text, icon, expanded, active, className}) => {
    
    return(
        <div className={`sideitem${active ? ' active active-border' : ''}${className ? ` ${className}` : ""}`}>
            <div className={"itemmain"}>
                <div className={`itemmaininner`}>
                    <span className={`${expanded ? 'i-bottom' : ''}`}>{icon}</span>
                    {
                        expanded 
                        ? <span>{text}</span>
                        : <></>
                    }
                </div>
            </div>
        </div>
    );
};

export default NavItem;
