import React from "react";
import TableHeaderRow from "components/atoms/table/TableHeaderRow";
import TableBody from "./TableBody";
import TableHeaderCell from "components/atoms/table/TableHeaderCell";
import { FaSearch as SearchIcon } from "react-icons/fa";
import TableRow from "components/atoms/table/TableRow";
import TableCell from "components/atoms/table/TableCell";
import ToolTip from "components/molecules/ToolTip";
import useTableTest from "./useTableTest";

const TableTest = ({columns, data, selectedCallback, selectedId}) => {
  const {
    selectedRowId,
    determineSortingIcon,
    searchInput,
    autoFocusSearch,
    sortedData,
    unfocusSearch,
    handleCallback
  } = useTableTest({data, selectedCallback, selectedId});

  return (
    <div className={"table"}>
      <TableHeaderRow>
        {
          columns?.map(column => {
            const hasSearch = Boolean(column.search);
            const hasSort = Boolean(column.sort);
            const dataIndex = column.dataIndex;
            return (
              <TableHeaderCell key={`col-${dataIndex}`} width={column.width} classes={column.classes} sort={column.sort} search={column.search}>
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
              <TableRow
                key={rowIndex}
                isSelected={selectedRowId === rowObject.id}
                selectable={Boolean(selectedCallback)}
                selectedCallback={() => handleCallback(rowObject, rowIndex)}
              >
                {
                  Object.keys(rowObject).map((rowKey, cellIndex) => {
                    if(rowKey !== "id") {
                      const matchingColumn = columns.find(col => col.dataIndex === rowKey);
                      const render = matchingColumn.render;
                      const width = matchingColumn.width;
                      const content = rowObject[rowKey];
                      return (
                        <TableCell width={width} key={`${rowIndex}-${cellIndex}`} >
                          {render ? render(content, rowIndex) : content}
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