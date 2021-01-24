import React from "react";

/*
     props:

     state:

*/

const TableHeaderCell = ({children}) => {
    return(
        <div className={`th`}>
            {children}
        </div>
    );
};

export default TableHeaderCell;
