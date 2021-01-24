import React from "react";

/*
     props:

     state:

*/

const TableCell = ({children, text}) => {
    
    return(
        <div className={`td`}>
            {children || text}
        </div>
    );
};

export default TableCell;
