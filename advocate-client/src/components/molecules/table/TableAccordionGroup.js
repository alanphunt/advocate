import AccordionItem from "components/atoms/AccordionItem";
import React, {useState} from "react";
import Table from "./Table";

/*
     props:
        allOpen: boolean: optional- to render each accordion item opened or not
        openIndex: number: optional- the specific accordion item to render open
        children: object array: optional- if you need to use a different kind of table just render them as children
        accordionHeaders: string array- for the headers on each accordion item
        tableHeaders: string array- used for the column headers of the table
        tableData: array of object arrays- each object array corresponds to the data that will be rendered in the table- should be preformatted
        dataKeys: array of strings: optional- specifies which keys of the object you want to render into the table
        accordionIcons: object: optional- adds icons to the accordion item header
        selectedCallback: function(object, accordionIndex, rowIndex): optional-
        tableChildren: object array: optional- in case you need more customization on the table
        iconClickedCallback: function(key, accordionIndex): optional- when you click on an accordion header icon
     state:

*/

const TableAccordionGroup = ({allOpen, openIndex, children, accordionHeaders, tableHeaders, tableData, dataKeys, accordionIcons, selectedCallback, tableChildren, iconClickedCallback}) => {

  const [selectedRowId, setSelectedRowId] = useState("");
  const [selectedAccordionIndex, setSelectedAccordionIndex] = useState(-1);

  const callbackWrapper = (object, rowIndex, accordionIndex) => {
    setSelectedRowId(object.id);
    setSelectedAccordionIndex(accordionIndex);
    selectedCallback(object, rowIndex, accordionIndex);
  };

  return (
    <div className="accordion">
      {
        children ? (
          children
        ) : (
          accordionHeaders.map((header, accordionIndex) => {
            return (
              <AccordionItem
                key={`accordionHeader-${accordionIndex}`}
                iconClickedCallback={iconClickedCallback}
                preOpened={allOpen || openIndex === accordionIndex}
                header={header}
                cons={accordionIcons}
              >
                <Table
                  tableData={tableChildren ? null : tableData[accordionIndex]}
                  headers={tableHeaders}
                  dataKeys={dataKeys}
                  selectedCallback={(rowObject, rowIndex) => callbackWrapper(rowObject, rowIndex, accordionIndex)}
                  selectedRowId={ selectedAccordionIndex === accordionIndex ? selectedRowId : ""}
                >
                  {tableChildren ? tableChildren : null}
                </Table>
              </AccordionItem>
            )
          })
        )
      }
    </div>
  );
};

export default TableAccordionGroup;

/*
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
*/