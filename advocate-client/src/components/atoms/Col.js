import React from "react";

const Col = ({children, span = 24, flex = 1}) => {
  const styles = {
    width: `${span/24*100}%`,
  }

  return (
    <div style={styles}>
      {children}
    </div>
  );
};

export default Col;