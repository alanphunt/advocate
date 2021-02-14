import React from "react";

/*
     props:

     state:

*/

const TableCell = ({children, text, classes}) => {
    
    return(
        <div className={`td ${classes || ""}`}>
            {children || text}
        </div>
    );
};

export default TableCell;
