import AccordionItem from "components/atoms/AccordionItem";
import React, {useState} from "react";
import NewTable from "./NewTable";

/*
     props:
        accordionHeaders: string array- for the headers on each accordion item
        tableData: array of object arrays- each object array corresponds to the data that will be rendered in the table- should be preformatted
        tableHeaders: string array- used for the column headers of the table
        allOpen: boolean: optional- to render each accordion item opened or not
        openIndex: number: optional- the specific accordion item to render open
        accordionIcons: object: optional- adds icons to the accordion item header
        tableIcons: object: optional- the key will be the key of the column to display the icon in, the value will be the <IconComponent/>
        tableSubheaders:  misc array: optional- used for column subheaders 
        selectedRowCallback: function(object, accordionIndex, rowIndex): optional- 
        accordionIconCallback: function(key, accordionIndex): optional- 
        children: object array: optional- if you need to use a different kind of table just render them as children
     state:

*/

const TableAccordionGroup = ({accordionHeaders, tableData, tableHeaders, allOpen, openIndex, accordionIcons, accordionIconCallback, tableIcons, tableSubheaders, selectedRowCallback, children}) => {
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
                            key={`accordionItem-${header}`}
                            header={header}
                            icons={accordionIcons || null}
                            open={allOpen || openIndex === accordionIndex}
                            index={accordionIndex}
                            sendIndexUp={accordionIconCallback}
                            >
                                {
                                    children 
                                        ? children[accordionIndex]
                                        : <NewTable
                                            headers={tableHeaders}
                                            subheaders={tableSubheaders}
                                            data={tableData[accordionIndex]}
                                            selectedCallback={selectedRowCallback ? (object, index) => callbackWrapper(object, index, accordionIndex) : null}
                                            selectedRowIndex={indexes.accordionIndex === accordionIndex ? indexes.rowIndex : 999}
                                            icons={tableIcons || null}
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
