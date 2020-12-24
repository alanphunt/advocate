import React from "react";

/*
     props:

     state:

*/

const TableRow = ({iconColumn, rowObject, selectedCallback, isSelected, icons}) => {
    const objectKeys = Object.keys(rowObject);
    const rowClasses = `tr ${selectedCallback ? "selectable" : ""} ${isSelected ? "selected-bg" : ""}`;

    return (
        <div
            className={rowClasses}
            onClick={selectedCallback ? () => {selectedCallback(rowObject)} : null}
        >
            {
                objectKeys.map((key, ind) =>
                    <div key={`tableTD${rowObject[key]}${ind}`} className={`td${iconColumn && !ind ? " td-icon-cell" : ""}`}>
                        {
                            rowObject[key]
                        }
                        {
                            icons && Object.keys(icons).includes(key)
                                ? <>{icons[key]}</>
                                : <></>
                        }
                    </div>
                )
            }
        </div>
    );
};

export default TableRow;
