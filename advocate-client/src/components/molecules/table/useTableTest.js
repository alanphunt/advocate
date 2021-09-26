import React, {useEffect, useState} from "react";
import {FaSort as SortIcon, FaSortDown as DscIcon, FaSortUp as AscIcon} from "react-icons/fa";
import FormElement from "components/atoms/FormElement";

const useTableTest = ({data, selectedCallback, selectedId}) => {
  const unordered = "unordered";
  const sorted = "sorted";
  const reversed = "reversed";

  useEffect(() => {
    if(selectedId && !data.find(obj => obj.id === selectedId))
      setSelectedRowId("");
    else if (selectedId && selectedId !== selectedRowId)
      setSelectedRowId(selectedId);
  }, [selectedId]);

  const [selectedRowId, setSelectedRowId] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState({});

  const [currentOrder, setCurrentOrder] = useState(unordered);
  const [sortedDataKey, setSortedDataKey] = useState("");

  const [autoFocus, setAutoFocus] = useState(false);

  const handleCallback = (rowObject, rowIndex) => {
    if(Boolean(selectedCallback)) {
      setSelectedRowId(rowObject.id);
      selectedCallback(rowObject);
    }
  };

  const _determineOrdering = (dataIndex) => {
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
    const sortIcon = <SortIcon className={"i-right"} onClick={() => _determineOrdering(dataIndex)}/>
    if(dataIndex === sortedDataKey)
      return (
        currentOrder === unordered
          ? sortIcon
          : currentOrder === sorted
          ? <AscIcon className={"i-right comp-color"} onClick={() => _determineOrdering(dataIndex)}/>
          : <DscIcon className={"i-right comp-color"} onClick={() => _determineOrdering(dataIndex)}/>
      )
    else
      return sortIcon
  };

  const _ascSort = () => {
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

  const sortedData = currentOrder === unordered ? (isFiltering ? filteredData : data) : currentOrder === sorted ? _ascSort() : _ascSort().reverse();

  const _handleFilter = (event, filterKey) => {
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

  const searchInput = (dataIndex) => {
    return (
      <FormElement
        autoFocus={autoFocus}
        className={"marg-top"}
        placeholder={`Filter by ${dataIndex}`}
        onChange={event => _handleFilter(event, dataIndex)} value={ dataIndex === Object.keys(searchValue)[0] ? searchValue[dataIndex] : ""}
      />
    )
  };

  const autoFocusSearch = () => {
    setAutoFocus(true);
  };

  const unfocusSearch = () => {
    setAutoFocus(false);
  };

  return ({
    selectedRowId,
    sortedData,
    determineSortingIcon,
    searchInput,
    autoFocusSearch,
    unfocusSearch,
    handleCallback
  });
};

export default useTableTest;