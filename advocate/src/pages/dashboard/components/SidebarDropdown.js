import React from "react";
import {NavLink} from "react-router-dom";

class SidebarDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropped: false,
            active: (window.location.pathname === this.props.link.menuItems.item1.link)
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleActive = this.handleActive.bind(this);
    }

    handleClick(){
        this.setState(state => ({
            dropped: !state.dropped
        }))
    }

    handleActive(){
        this.props.updateActiveLink(this.props.link.text);
        this.setState({active: this.props.isActive});
    };

    render() {
        let classes = this.props.isActive ? "itemmain active" : "itemmain";
        return (
            <div className={"dropdownwrapper"}>
                <div className={classes} onClick={this.handleClick}>
                    <div className={"itemmaininner"}>
                        <i className={this.props.link.icon}/>
                        <span>{this.props.link.text}</span>
                    </div>
                    <i className={"fas fa-caret-down menucaret"+(this.state.dropped ? " caretflip" : "")}/>
                </div>
                <div className={"dropdown"+(this.state.dropped ? " dropdownactive" : "")}>
                    <ul>
                {
                    Object.values(this.props.link.menuItems).map(item => {
                        return(
                                <li key={item.itemtext}>
                                    <NavLink onClick={this.handleActive} activeClassName={"active"} to={item.link}>
                                        <span>{item.itemtext.charAt(0).toUpperCase()}</span>
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