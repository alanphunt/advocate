import React from "react";

const TableRow = ({children, selectedCallback, selectable, isSelected}) => {
  const rowClasses = `tr${selectable ? " selectable" : ""}${isSelected ? " selected-bg" : ""}`;

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