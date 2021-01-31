import React from "react";

/*
     props:

     state:

*/

const TableHeaderCell = ({children}) => {
    return(
        <div className={`th`}>
            <h3>{children}</h3>
        </div>
    );
};

export default TableHeaderCell;
