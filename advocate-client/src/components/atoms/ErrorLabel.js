import React from "react";
const ErrorLabel = ({text}) => text ? <p className="incomp-color">{text}</p> : <></>
export default ErrorLabel;
