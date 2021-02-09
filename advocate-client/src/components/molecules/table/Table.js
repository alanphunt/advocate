import React, {useEffect, useState} from 'react';
import TableRow from 'components/atoms/table/TableRow';
import TableHeaderRow from 'components/atoms/table/TableHeaderRow';
import TableCell from 'components/atoms/table/TableCell';
import TableHeaderCell from 'components/atoms/table/TableHeaderCell';
import {FaSortAlphaDown as AscIcon, FaSortAlphaDownAlt as DscIcon, FaUndo as ResetIcon} from "react-icons/fa";

/*

note: the object sent back to the parent will not be the full data model, but only the formatted version passed into this component
    Props:
        headers: string array- used for column headers
        tableData: array of objects- renders into each cell
        dataKeys: string[]: the keys of the object you want to render out
        selectedCallback: function(object, index)- callback when a user clicks a row
        selectedRowIndex: int:optional- determines selected row
        children: if you need more customization in the table header/body
        hideSearchAndSort: boolean: optional- if your tabledata isn't in string form then you want to hide search/sort
    State:
        
*/

const Table = ({
    headers,
    tableData,
    dataKeys,
    selectedCallback,
    selectedRowId,
    children,
    hideSearchAndSort
}) => {

    const [currentOrder, setCurrentOrder] = useState("unordered");
    const [sortKeyIndex, setSortKeyIndex] = useState(-1);

    const tableKeys = children ? [] : dataKeys ? dataKeys : Object.keys(tableData[0] || {})?.filter(key => key !== "id");

    const determineOrdering = (index) => {
        setSortKeyIndex(currentOrder === "reversed" ? -1 : index);
        if(sortKeyIndex !== index){
            setCurrentOrder("sorted");
        }else{
            if(currentOrder === "unordered"){
                setCurrentOrder("sorted");
            }else if(currentOrder === "sorted"){
                setCurrentOrder("reversed");
            }else if(currentOrder === "reversed"){
                setCurrentOrder("unordered")
            }
        }
    };

    const ascSort = () => {
        return (isFiltering ? [...filteredData] : [...tableData]).sort((objA, objB) => {
            const valA = objA[tableKeys[sortKeyIndex]];
            const valB = objB[tableKeys[sortKeyIndex]];

            if(isNaN(valA)){
                if(valA?.toUpperCase() < valB?.toUpperCase())
                    return -1;
                if (valA?.toUpperCase() > valB?.toUpperCase())
                    return 1;

                return 0;
            }else{
                if(parseInt(valA) < parseInt(valB))
                    return -1;
                if(parseInt(valA) > parseInt(valB))
                    return 1;

                return 0;
            }
        });
    };
    const [filteredData, setFilteredData] = useState([]);
    const [isFiltering, setIsFiltering] = useState(false);
    const [inputValues, setInputValues] = useState({});

    const orderIcon = currentOrder === "unordered" ?  <AscIcon className={"i-left"}/> : currentOrder === "sorted" ? <DscIcon className={"i-left"}/> : <ResetIcon className={"i-left"}/>
    const sortedData = currentOrder === "unordered" ? (isFiltering ? filteredData : tableData) : currentOrder === "sorted" ? ascSort() : ascSort().reverse();

    useEffect(() => {
        if(isFiltering){
            let key = Object.keys(inputValues)[0];
            let val = inputValues[key];
            setFilteredData(tableData.filter(obj => obj[key].toString().toLowerCase().includes(val)));
        }
    }, [tableData]);

    const handleFilter = (event, filterKey) => {
        const value = event.currentTarget.value.toLowerCase();
        const switchingKeys = filterKey !== Object.values(inputValues)[0];
        setIsFiltering(value !== "");
        setInputValues({[filterKey]: value});
        setFilteredData((switchingKeys ? tableData : sortedData).filter(obj => obj[filterKey].toString().toLowerCase().includes(value)));
    };

    return(
        <div className={"table"}>
            <TableHeaderRow>
                { headers.map((header, index) =>
                    <TableHeaderCell key={`tableHeaderCell-${index}`}>
                        {
                            hideSearchAndSort ? (
                                header
                            ) : (
                                <>
                                    <span className={"selectable flex-center width-fit"} onClick={() => determineOrdering(index)}>
                                        {header}
                                        {sortKeyIndex === index ? orderIcon : <AscIcon className={"i-left"}/>}
                                    </span>
                                    {   tableKeys.length
                                        ? (
                                            <input
                                                className={"marg-top"}
                                                placeholder={`Filter by ${headers[index]}`}
                                                onChange={event => handleFilter(event, tableKeys[index])} value={ tableKeys[index] === Object.keys(inputValues)[0] ? inputValues[tableKeys[index]] : ""}
                                            />
                                        )
                                        : <></>
                                    }
                                </>
                            )
                        }
                    </TableHeaderCell>)
                }
            </TableHeaderRow>
            <div className={"tbody"}>
                {
                    children ? children :
                        sortedData.map((rowObject, rowIndex) =>
                            <TableRow key={`tableRow-${rowIndex}`} isSelected={(selectedRowId || -1) === rowObject.id} selectedCallback={selectedCallback ? () => selectedCallback(rowObject, rowIndex) : null}>
                                {
                                    tableKeys.filter(key => key !== "id").map((key, ind) => <TableCell key={`tableCell-${ind}-${rowIndex}`}>{rowObject[key]}</TableCell>)
                                }
                            </TableRow>
                        )
                }
            </div>
        </div>
    );
};

export default Table;