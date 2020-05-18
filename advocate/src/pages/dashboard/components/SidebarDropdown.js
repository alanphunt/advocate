import React from "react";
import {NavLink} from "react-router-dom";

class SidebarDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropped: this.props.link.menuItems.filter(item => item.link.includes(window.location.pathname)).length !== 0
        };
    }

    handleClick = (e) => {
        this.setState(state => ({
            dropped: !state.dropped
        }))
    };

    handleActive = (e) => {
        this.props.updateActiveLink(this.props.link.text);
    };

    render() {
        let classes = this.props.isActive ? "itemmain active" : "itemmain";
        let dropped = this.state.dropped
        return (
            <div className={"dropdownwrapper"}>
                <div className={classes} onClickCapture={this.handleClick}>
                    <div className={"itemmaininner"}>
                        <i className={this.props.link.icon}/>
                        <span>{this.props.link.text}</span>
                    </div>
                    <i className={"fas fa-caret-down transition"+(dropped ? " caretflip" : "")}/>
                </div>
                <div className={"dropdown"+(dropped ? " dropdownactive" : "")}>
                    <ul>
                        {
                            Object.values(this.props.link.menuItems).map(item => {
                                return(
                                    <li key={item.itemtext}>
                                        <NavLink onClick={this.handleActive} activeClassName={"active"} to={item.link} exact>
                                            <span>{item.itemtext.split(" ").map(word => word.charAt(0).toUpperCase()).join("")}</span>
                                            <span>{item.itemtext}</span>
                                        </NavLink>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default SidebarDropdown;