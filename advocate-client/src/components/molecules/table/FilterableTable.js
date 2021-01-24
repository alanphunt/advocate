import React, {useState, useEffect} from 'react';
import Table from "components/molecules/table/Table";

const FilterableTable = ({headers, selectedCallback, tableData, dataKeys, selectedRowIndex}) => {
    const keys = Object.keys(tableData[0] || {});
    const [filteredData, setFilteredData] = useState([]);
    const [isFiltering, setIsFiltering] = useState(false);
    const [inputValues, setInputValues] = useState({});

    useEffect(() => {
        const inputValueObject = {};
        keys.forEach(key => Object.assign(inputValueObject, {[key]: ""}))
        setInputValues(inputValueObject);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleFilter = (event, filterKey) => {
        const value = event.currentTarget.value.toLowerCase();
        setIsFiltering(value !== "");
        setInputValues(() => {
            const newObj = {};
            Object.keys(inputValues).forEach((key, i) => {
                Object.assign(newObj, {[key]: ""})
            });
            return {...newObj, [filterKey]: value}
        });
        setFilteredData(tableData.filter(obj => obj[filterKey].toLowerCase().includes(value))) 
    };

    const createSearchFields = () => {
        const inputArray = dataKeys.map((key, ind) => {
            return (
                <>
                    <p>{headers[ind]}</p>
                    <input placeholder={`Filter by ${headers[ind]}`} onChange={(event) => {handleFilter(event, key)}} value={inputValues[key] || ""}/>
                </>
            )
        });

        return inputArray;
    };
    
    return(
        <Table
            headers={createSearchFields()}
            tableData={isFiltering ? filteredData : tableData}
            selectedCallback={selectedCallback}
            selectedRowIndex={selectedRowIndex}
            dataKeys={dataKeys}
        />
    );
};

export default FilterableTable;