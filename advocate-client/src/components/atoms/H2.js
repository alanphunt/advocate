import React from "react";

const H2 = ({margin, children, classes}) => {
  return (
    <h2 className={`${margin ? "marg-bot" : ""}${classes ? ` ${classes}` : ""}`}>{children}</h2>
  );
};

export default H2;