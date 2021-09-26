import React from "react";

const HRDiv = ({children, classes}) => {
  
  return (
    <div className={`hr-div${classes ? ` ${classes}` : "" }`}>
      {children}
    </div>
  );
};

export default HRDiv;