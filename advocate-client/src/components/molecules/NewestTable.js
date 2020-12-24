import TableRow from 'components/atoms/TableRow';
import React from 'react';

/*
    Props:
        headers: string array- used for column headers
        subheaders: any array- used for column subheaders
        data: array of objects- renders into each cell
        selectedCallback: function- callback when a user clicks a row
        selectedRowIndexes: int array- determines pre-selected rows when component is rendered
        icons: object- the key will be the key of the column to display the icon in, the value will be the icon
    State:
        
*/

const NewestTable = ({headers, subheaders, data, selectedCallback, icons, children}) => {
    const [selectedIndex, setSelectedIndex] = useState(999);
    
    const createHeader = (head, i) => {
        return (
            <div key={'classroomth'+i} className={"th"}>
                <h3>{head}</h3>
                    {
                        subheaders
                            ? <p>{subheaders[i]}</p>
                            : <></>
                    }
            </div>
        );
    };

    const callbackWrapper = (rowObject, index) => {
        setSelectedIndex(index);
        selectedCallback(rowObject);
    };

    const createRows = () => {
        return data.map((rowObject, ind) => <TableRow rowObject={rowObject} selectedCallback={() => callbackWrapper(rowObject, ind)} isSelected={ind === selectedIndex} icons={icons}/>)
    };

    return(
        <div className={"table"}>
            <div className={"theader"}>
                <div className={"tcols tr"}>
                    {
                        headers.map((header, index) => createHeader(header, index))
                    }
                </div>
            </div>
            <div className={"tbody"}>
                {
                    children
                        ? children
                        : createRows()
                } 
            </div>
        </div>
    );
};

export default NewestTable;