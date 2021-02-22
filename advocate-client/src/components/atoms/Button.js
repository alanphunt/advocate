import React from "react";
import {FaSyncAlt as LoadingIcon} from "react-icons/fa";
/*
     props:
        text: string- the button text
        icon: component- the icon on the button
        onClick: function- the callback function after click
        onKeyPress: function: optional- perform a function on pressing a key
        className: string: optional- additional classes for the button
        type: string: optional- the button type, defaults to button, can be submit or reset
     state:

*/

const Button = ({text, icon, onClick, onKeyPress, className, type, isLoading, disabled}) => {
    return (
        <button 
            className={`${className}${disabled ? " disabled" : ""}`}
            onClick={onClick}
            onKeyPress={e => {
                e.preventDefault();
                if(onKeyPress && !isLoading)
                    onKeyPress(e);
            }}
            tabIndex={0}
            type={type ? type : "button"}
            disabled={disabled || isLoading}
        >
            {
                isLoading
                    ? <span className={"loadingSpinner i-right"}><LoadingIcon/></span>
                    : <span className="i-right">{icon}</span>

            }
            <span>
                {text}
            </span>
        </button>
    )
};

export default Button;