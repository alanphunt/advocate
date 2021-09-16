import React, {useEffect, useState} from "react";
import TableHeaderRow from "components/atoms/table/TableHeaderRow";
import TableBody from "./TableBody";
import TableHeaderCell from "components/atoms/table/TableHeaderCell";
import {
  FaSortUp as AscIcon,
  FaSortDown as DscIcon,
  FaSort as SortIcon,
  FaSearch as SearchIcon
} from "react-icons/fa";
import TableRow from "components/atoms/table/TableRow";
import TableCell from "components/atoms/table/TableCell";
import ToolTip from "components/molecules/ToolTip";
import FormElement from "components/atoms/FormElement";

const TableTest = ({columns, data, selectedCallback}) => {
  const unordered = "unordered";
  const sorted = "sorted";
  const reversed = "reversed";

  const [selectedRowId, setSelectedRowId] = useState(-1);
  const [isFiltering, setIsFiltering] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState({});

  const [currentOrder, setCurrentOrder] = useState(unordered);
  const [sortedDataKey, setSortedDataKey] = useState("");

  const handleCallback = (rowObject, rowIndex) => {
    if(Boolean(selectedCallback)) {
      setSelectedRowId(rowObject.id);
      selectedCallback(rowObject);
    }
  };

  const determineOrdering = (dataIndex) => {
    setSortedDataKey(currentOrder === reversed ? "" : dataIndex);
    if(sortedDataKey !== dataIndex){
      setCurrentOrder(sorted);
    }else{
      if(currentOrder === unordered){
        setCurrentOrder(sorted);
      }else if(currentOrder === sorted){
        setCurrentOrder(reversed);
      }else if(currentOrder === reversed){
        setCurrentOrder(unordered)
      }
    }
  };

  const determineSortingIcon = (dataIndex) => {
    const sortIcon = <SortIcon className={"i-right"} onClick={() => determineOrdering(dataIndex)}/>
    if(dataIndex === sortedDataKey)
      return (
        currentOrder === unordered
          ? sortIcon
          : currentOrder === sorted
            ? <AscIcon className={"i-right comp-color"} onClick={() => determineOrdering(dataIndex)}/>
            : <DscIcon className={"i-right comp-color"} onClick={() => determineOrdering(dataIndex)}/>
      )
    else
      return sortIcon
  };

  const ascSort = () => {
    return (isFiltering ? [...filteredData] : [...data]).sort((objA, objB) => {
      const valA = objA[sortedDataKey];
      const valB = objB[sortedDataKey];

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

  const sortedData = currentOrder === unordered ? (isFiltering ? filteredData : data) : currentOrder === sorted ? ascSort() : ascSort().reverse();

  const handleFilter = (event, filterKey) => {
    const value = event.currentTarget.value.toLowerCase();
    const switchingKeys = filterKey !== Object.values(searchValue)[0];
    setIsFiltering(value !== "");
    setSearchValue({[filterKey]: value});
    setFilteredData((switchingKeys ? data : sortedData).filter(obj => obj[filterKey].toString().toLowerCase().includes(value)));
  };

  useEffect(() => {
    if(isFiltering){
      let key = Object.keys(searchValue)[0];
      let val = searchValue[key];
      setFilteredData(data.filter(obj => obj[key].toString().toLowerCase().includes(val)));
    }
  }, [data]);

  const [autoFocus, setAutoFocus] = useState(false);

  const searchInput = (dataIndex) => (
    <FormElement
      autoFocus={autoFocus}
      className={"marg-top"}
      placeholder={`Filter by ${dataIndex}`}
      onChange={event => handleFilter(event, dataIndex)} value={ dataIndex === Object.keys(searchValue)[0] ? searchValue[dataIndex] : ""}
    />
  );

  const autoFocusSearch = () => {
    setAutoFocus(true);
  };

  const unfocusSearch = () => {
    setAutoFocus(false);
  };

  return (
    <div className={"table"}>
      <TableHeaderRow>
        {
          columns?.map(column => {
            const hasSearch = Boolean(column.search);
            const hasSort = Boolean(column.sort);
            const dataIndex = column.dataIndex;
            return (
              <TableHeaderCell width={column.width} classes={column.classes} sort={column.sort} search={column.search}>
                <h4>{column.title}</h4>
                {
                  hasSort || hasSearch ? (
                    <div className="selectable">
                      {
                        hasSort ? (
                          determineSortingIcon(dataIndex)
                        ) : (<></>)
                      }
                      {
                        hasSearch ? (
                          <>
                            <ToolTip text={searchInput(dataIndex)} onMouseOver={autoFocusSearch} onMouseOut={unfocusSearch}>
                              <SearchIcon/>
                            </ToolTip>
                          </>
                        ) : (<></>)
                      }
                    </div>
                  ) : <></>
                }
              </TableHeaderCell>
            );
          })
        }
      </TableHeaderRow>
      <TableBody>
        {
          sortedData?.map((rowObject, rowIndex) => {
            return (
              <TableRow key={rowIndex} isSelected={selectedRowId === rowObject.id} selectedCallback={() => handleCallback(rowObject, rowIndex)}>
                {
                  Object.keys(rowObject).map((rowKey, cellIndex) => {
                    if(rowKey !== "id") {
                      const matchingColumn = columns.find(col => col.dataIndex === rowKey);
                      const render = matchingColumn.render;
                      const width = matchingColumn.width;
                      const content = rowObject[rowKey];
                      return (
                        <TableCell width={width} key={`${rowIndex}-${cellIndex}`} >
                          {render ? render(content) : content}
                        </TableCell>
                      );
                    } else
                        return null;
                  })
                }
              </TableRow>
            );
          })
        }
      </TableBody>
    </div>
  );
};

export default TableTest;