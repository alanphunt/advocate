import React, {useState, useEffect} from 'react';
import Table from "components/molecules/Table";

const FilterableTable = ({headers, selectedCallback, data, icons, selectedRowIndex}) => {
    const keys = Object.keys(data[0] || {});
    const [filteredData, setFilteredData] = useState([]);
    const [isFiltering, setIsFiltering] = useState(false);
    const [inputValues, setInputValues] = useState({});

    useEffect(() => {
        const inputValueObject = {};
        keys.forEach(key => Object.assign(inputValueObject, {[key]: ""}))
        setInputValues(inputValueObject);
        return () => {
        }
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
        setFilteredData(data.filter(obj => obj[filterKey].toLowerCase().includes(value))) 
    };

    const createSearchFields = () => {
        const inputArray = [];
        keys.forEach((key, ind) => {
            inputArray.push(<input placeholder={`Filter by ${headers[ind]}`} onChange={(event) => {handleFilter(event, key)}} value={inputValues[key] || ""}/>)
        });

        return inputArray;
    };
    
    return(
        <Table
            headers={headers}
            subheaders={createSearchFields()}
            data={isFiltering ? filteredData : data}
            icons={icons}
            selectedCallback={selectedCallback}
            selectedRowIndex={selectedRowIndex}
        />
    );
};

export default FilterableTable;