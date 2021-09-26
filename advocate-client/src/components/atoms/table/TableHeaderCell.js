import React from "react";

const TableHeaderCell = ({children, classes, width}) => {
  const widthObj = {width: width};
  const flex = {flex: 1};
  return(
    <div className={`th ${classes || ""}`} style={width ? widthObj : flex}>
      {children}
    </div>
  );
};

export default TableHeaderCell;
