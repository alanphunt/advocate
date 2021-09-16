import React from "react";

const TableCell = ({children, text, classes, width = "auto"}) => {
    return(
        <div className={`td ${classes || ""}`} style={{width: width}}>
            {children || text}
        </div>
    );
};

export default TableCell;
