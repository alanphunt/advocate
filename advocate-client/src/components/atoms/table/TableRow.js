import React from "react";

const TableRow = ({children, selectedCallback, isSelected}) => {
    const rowClasses = `tr${selectedCallback ? " selectable" : ""}${isSelected ? " selected-bg" : ""}`;

    return (
        <div
            className={rowClasses}
            onClick={selectedCallback || null}
        >
            {children}
        </div>
    );
};

export default TableRow;