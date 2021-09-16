import React from "react";

/*
     props:

     state:

*/

const TableHeaderRow = ({children}) => {


  return (
    <div className={"theader"}>
      <div className={"tcols tr"}>
        {children}
      </div>
    </div>
  );
};

export default TableHeaderRow;
