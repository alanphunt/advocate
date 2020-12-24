import React from 'react';
import NewTable from "components/molecules/NewTable";
import { BASIC_STUDENT_TABLE_HEADERS } from 'utils/constants';

/*
    Props:
        headers: string array- used for column headers if we don't want to use the default
        keys: string array- if we want to override the default keys to use for cell data
        subheaders: string array- used for column subheaders
        data: object array- should be an array of student objects
        selectedCallback: function- callback when a user clicks a row
        selectedRowIndexes: int array- determines pre-selected rows when component is rendered
        icons: object- the key will be the key of the column to display the icon in, the value will be the icon
    State:
        
*/

const StudentTable = ({subheaders, data, selectedCallback, selectedRowIndex, icons, children}) => {
    const columnHeaders = BASIC_STUDENT_TABLE_HEADERS;
    const keys = ["name", "goalFocus", "eligibility", "skills"];
    const students = data?.map(student => {
        const stu = {};
        keys.forEach(key => {
            Object.assign(stu, {[key]:student[key]});
        });
        return stu;
    });

    return(
        <NewTable
            headers={columnHeaders}
            data={students}
            selectedCallback={selectedCallback}
            selectedRowIndex={selectedRowIndex}
            subheaders={subheaders}
            icons={icons}
            children={children}
        />
    );
};

export default StudentTable;