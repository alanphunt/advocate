import React from "react";

const Col = ({children, span, classes = ""}) => {
  const spanIsNull = span === null || span === undefined;
  const width = {width: spanIsNull ? "max-content" : `${span / 24 * 100}%`};

  const styles = {
    overflow: "auto",
      ...width
  }

  return (
    <div className={classes} style={styles}>
      {children}
    </div>
  );
};

export default Col;