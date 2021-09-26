import React from "react";

const H3 = ({margin, children, classes}) => {
  return (
    <h3 className={`${margin ? "marg-bot" : ""}${classes ? ` ${classes}` : ""}`}>{children}</h3>
  );
};

export default H3;