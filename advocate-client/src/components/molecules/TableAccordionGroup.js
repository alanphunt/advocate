import AccordionItem from "components/atoms/AccordionItem";
import React, {useState} from "react";
import Table from "./Table";

/*
     props:
        accordionHeaders: string array- for the headers on each accordion item
        tableData: array of object arrays- each object array corresponds to the data that will be rendered in the table- should be preformatted
        tableHeaders: string array- used for the column headers of the table
        allOpen: boolean: optional- to render each accordion item opened or not
        openIndex: number: optional- the specific accordion item to render open
        accordionIcons: object: optional- adds icons to the accordion item header
        tableIcons: object: optional-{columnKey: <IconComponent/>}, displays in all columns with the specified key
        accordionIconCallback: function(key, accordionIndex): optional- 
        tableSubheaders:  misc array: optional- used for column subheaders 
        selectedRowCallback: function(object, accordionIndex, rowIndex): optional- 
        children: object array: optional- if you need to use a different kind of table just render them as children
        conditionalIcons: {columnKey: [array of either icons or null values]} - icons rendered in specified columns
        based on condtionals in the parent component. also a great way to attach callbacks to icons.
        includeCountInTableHeader: boolean:optional - includes the row count of the table in the table header
        includeCountInAccordionHeader: boolean:optional - includes the table count of the accordion group in the accordion header
        noTable: boolean: optional- hide the table if you're rendering your own as children
     state:

*/

const TableAccordionGroup = ({
    accordionHeaders,
    tableData,
    tableHeaders,
    allOpen,
    openIndex,
    accordionIcons,
    accordionIconCallback,
    tableIcons,
    conditionalIcons,
    tableSubheaders,
    selectedRowCallback,
    children,
    includeCountInTableHeader,
    includeCountInAccordionHeader,
    noTable
}) => {
    const [indexes, setIndexes] = useState({accordionIndex: 999, rowIndex: 999});
    const callbackWrapper = (object, rowIndex, accordionIndex) => {
        setIndexes({accordionIndex: accordionIndex, rowIndex: rowIndex});
        selectedRowCallback(object, accordionIndex, rowIndex);
    };

    return (
        <div className="accordion">
            {            
                accordionHeaders.map((header, accordionIndex) => {
                    return (
                        <AccordionItem
                            key={`accordionItem-${header}-${accordionIndex}`}
                            header={`${header}${includeCountInAccordionHeader ? ` (${tableData[accordionIndex].length})` : ''}`}
                            icons={accordionIcons || null}
                            open={allOpen || openIndex === accordionIndex}
                            index={accordionIndex}
                            sendIndexUp={accordionIconCallback}
                            >
                                {
                                    children ? children[accordionIndex] : <></>
                                }
                                {
                                    noTable 
                                    ?<></>
                                    : 
                                    <Table
                                    accordionIndex={accordionIndex}
                                    headers={tableHeaders}
                                    subheaders={tableSubheaders}
                                    data={tableData[accordionIndex]}
                                    selectedCallback={selectedRowCallback ? (object, index) => callbackWrapper(object, index, accordionIndex) : null}
                                    selectedRowIndex={indexes.accordionIndex === accordionIndex ? indexes.rowIndex : 999}
                                    icons={tableIcons || null}
                                    conditionalIcons={conditionalIcons}
                                    includeCountInHeader={includeCountInTableHeader}
                                />
                                }
                        </AccordionItem>
                    )
                })
            }
        </div>
    );
};

export default TableAccordionGroup;

/*
                                {
                                    children 
                                        ? children[accordionIndex]
                                        : <Table
                                            headers={tableHeaders}
                                            subheaders={tableSubheaders}
                                            data={tableData[accordionIndex]}
                                            selectedCallback={selectedRowCallback ? (object, index) => callbackWrapper(object, index, accordionIndex) : null}
                                            selectedRowIndex={indexes.accordionIndex === accordionIndex ? indexes.rowIndex : 999}
                                            icons={tableIcons || null}
                                          />
                                }
*/