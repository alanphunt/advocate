import React from "react";

const TableCell = ({children, text, classes, width}) => {
  const widthObj = {width: width};
  const flex = {flex: 1};
  return(
    <div className={`td ${classes || ""}`} style={width ? widthObj : flex}>
      {children || text}
    </div>
  );
};

export default TableCell;
