import React from "react";

const Button = ({text, icon, onClick, onKeyPress, className, disabled}) => {
    return (
        <button className={className} onClick={onClick} onKeyPress={onKeyPress || null}>{icon}<span>{text}</span></button>
    )
};

export default Button;