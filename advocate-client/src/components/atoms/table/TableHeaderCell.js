import React from "react";

/*
     props:

     state:

*/

const TableHeaderCell = ({children, classes}) => {
    return(
        <div className={`th ${classes || ""}`}>
            <h3>{children}</h3>
        </div>
    );
};

export default TableHeaderCell;
