import React from "react";

/*
     props:

     state:

*/

const TableRow = ({iconColumn, rowObject, selectedCallback, isSelected, icons, conditionalIcons, accordionIndex}) => {
    const objectKeys = Object.keys(rowObject);
    const rowClasses = `tr ${selectedCallback ? "selectable" : ""} ${isSelected ? "selected-bg" : ""}`;

const iconLogic = (key, ind) => {
    if(conditionalIcons && Object.keys(conditionalIcons).includes(key)){
        if(conditionalIcons[ind])
            return conditionalIcons[ind];
        else
            return <></>
    }else if(icons && Object.keys(icons).includes(key)){
        return icons[key];
    }
    return <></>
};

    return (
        <div
            className={rowClasses}
            onClick={selectedCallback ? () => {selectedCallback(rowObject)} : null}
        >
            {
                objectKeys.map((key, ind) =>
                    <div key={`tableTD-${rowObject[key]}-${ind}-${accordionIndex || 0}`} className={`td${iconColumn && !ind ? " td-icon-cell" : ""}`}>
                        {rowObject[key]}
                        {
                            conditionalIcons && Object.keys(conditionalIcons).includes(key) 
                            ? conditionalIcons[ind] ? conditionalIcons[ind] : <></>
                            : icons && Object.keys(icons).includes(key)
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

/* conditionalIcons && Object.keys(conditionalIcons).includes(key) 
? conditionalIcons[ind] ? conditionalIcons[ind] : <></>
: icons && Object.keys(icons).includes(key)
    ? <>{icons[key]}</>
    : <></> */