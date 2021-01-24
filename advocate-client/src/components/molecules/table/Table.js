import React from 'react';
import TableRow from 'components/atoms/table/TableRow';
import TableHeaderRow from 'components/atoms/table/TableHeaderRow';
import TableCell from 'components/atoms/table/TableCell';
import TableHeaderCell from 'components/atoms/table/TableHeaderCell';

/*

note: the object sent back to the parent will not be the full data model, but only the formatted version passed into this component
    Props:
        headers: string array- used for column headers
        tableData: array of objects- renders into each cell
        dataKeys: string[]: the keys of the object you want to render out
        selectedCallback: function(object, index)- callback when a user clicks a row
        selectedRowIndex: int:optional- determines selected row
        children: if you need more customization in the table header/body
    State:
        
*/

const Table = ({
    headers,
    tableData,
    dataKeys,
    selectedCallback,
    selectedRowIndex,
    children
}) => {

    return(
        <div className={"table"}>
            <TableHeaderRow>  { headers.map((header, index) => <TableHeaderCell key={`tableHeaderCell-${index}`}>{header}</TableHeaderCell>) } </TableHeaderRow>
            <div className={"tbody"}>
                {
                    children ? children :
                    tableData.map((rowObject, ind) =>
                        <TableRow key={`tableRow-${ind}`} isSelected={selectedRowIndex === ind} selectedCallback={selectedCallback ? () => selectedCallback(rowObject, ind) : null}>
                            {
                                (dataKeys ? dataKeys : Object.keys(rowObject)).filter(key => key !== "id").map((key, ind) => <TableCell key={`tableCell-${ind}-${rowObject[key]}`}>{rowObject[key]}</TableCell>)
                            }
                        </TableRow>
                    )
                }
            </div>
        </div>
    );
};

export default Table;