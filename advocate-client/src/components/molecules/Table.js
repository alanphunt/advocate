import React from 'react';
import TableRow from 'components/atoms/TableRow';
import RequiredField from 'components/atoms/RequiredField';


/*

note: the object sent back to the parent will not be the full data model, but only the formatted version passed into this component
    Props:
        headers: string array- used for column headers
        subheaders: misc array- used for column subheaders
        data: array of objects- renders into each cell
        selectedCallback: function(object, index)- callback when a user clicks a row
        selectedRowIndexes: int array- determines pre-selected rows when component is rendered
        icons: object- {columnKey: icon}
        iconColumn: boolean: optional- adds a class to the first column dedicated for a delete icon
        accordionIndex: number- helps with making keys unique when rendered from the tableaccordiongroup
    State:
        
*/

const Table = ({
    iconColumn,
    headers,
    subheaders,
    data,
    selectedCallback,
    selectedRowIndex,
    icons,
    conditionalIcons,
    children,
    requiredHeaderIndexes,
    includeCountInHeader,
    accordionIndex
}) => {
    
    const createHeader = (head, i) => {
        return (
            <div key={`classroomTH-${accordionIndex || 0}-${head}-${i}`} className={`th ${iconColumn && !i ? 'td-icon-cell' : ''}`}>
                <h3>{requiredHeaderIndexes?.includes(i) ? <RequiredField/> : <></>}{head}{includeCountInHeader ? ` (${data.length})` : <></>}</h3>
                    {
                        subheaders
                            ? <p>{subheaders[i]}</p>
                            : <></>
                    }
            </div>
        );
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
                                : (
                                    data.map((rowObject, ind) => {
                                        return <TableRow 
                                                accordionIndex={accordionIndex}
                                                iconColumn={iconColumn}
                                                key={`tableRow-${accordionIndex || 0}-${rowObject[ind]}-${ind}`}
                                                rowObject={rowObject}
                                                selectedCallback={selectedCallback ? (() => selectedCallback(rowObject, ind)) : null}
                                                isSelected={ind === selectedRowIndex}
                                                icons={icons}
                                                conditionalIcons={conditionalIcons ? conditionalIcons[ind] : null}
                                                />
                                    })
                                )
                        } 
                    </div>
                : <></>
            }
        </div>
    );
};

export default Table;