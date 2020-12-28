import React from 'react';
import TableRow from 'components/atoms/TableRow';


/*
    Props:
        headers: string array- used for column headers
        subheaders: misc array- used for column subheaders
        data: array of objects- renders into each cell
        selectedCallback: function(object, index)- callback when a user clicks a row
        selectedRowIndexes: int array- determines pre-selected rows when component is rendered
        icons: object- the key will be the key of the column to display the icon in, the value will be the icon
        iconColumn: boolean: optional- adds a class to the first column dedicated for a delete icon
    State:
        
*/

const NewTable = ({iconColumn, headers, subheaders, data, selectedCallback, selectedRowIndex, icons, children}) => {
    const createHeader = (head, i) => {
        return (
            <div key={'classroomth-'+head} className={`th ${iconColumn && !i ? 'td-icon-cell' : ''}`}>
                <h3>{head}</h3>
                    {
                        subheaders
                            ? <p>{subheaders[i]}</p>
                            : <></>
                    }
            </div>
        );
    };
    
    const createRows = () => {
        return data.map((rowObject, ind) => {
            return <TableRow 
                    iconColumn={iconColumn}
                    key={`tableRow-${rowObject[ind]}-${ind}`}
                    rowObject={rowObject}
                    selectedCallback={selectedCallback ? (() => selectedCallback(rowObject, ind)) : null}
                    isSelected={ind === selectedRowIndex} icons={icons}
                    />
        })
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
            {
                children?.length || data 
                ?
                    <div className={"tbody"}>
                        {
                            children
                                ? children
                                : createRows()
                        } 
                    </div>
                : <></>
            }
        </div>
    );
};

export default NewTable;