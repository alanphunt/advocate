import React from "react";

const Secondary = ({children, classes = ""}) => {
  
  return (
    <span className={`secondary ${classes}`}>
      {children}
    </span>
  );
};

export default Secondary;