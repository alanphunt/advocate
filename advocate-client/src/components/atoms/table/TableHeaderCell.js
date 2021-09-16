import React from "react";

const TableHeaderCell = ({children, classes, width, sort, search}) => {
  return(
    <div className={`th ${classes || ""}`} style={{width: width || "auto"}}>
      {children}
    </div>
  );
};

export default TableHeaderCell;
