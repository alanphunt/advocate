import React, {useState} from 'react';
import TableTest from "../../molecules/table/TableTest";
import {mapStudentGoalMeta} from "../../../utils/functions/functions";
import {useAuth} from "../../../utils/auth/AuthHooks";
import {FaPlus as PlusIcon, FaMinus as MinusIcon, FaRegTrashAlt as TrashIcon, FaRegEdit as EditIcon, FaCheck as CheckIcon} from "react-icons/fa";
/*
    Props:
        
    State:
        
*/
const Test = () => {
  const {teacher} = useAuth();
  const {students} = teacher;

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: "20%",
      sort: () => {},
      search: () => {}
    },
    {
      title: "Age",
      dataIndex: "age",
      width: "30%",
      sort: () => {},
      search: () => {}
    },
    {
      title: "Grade",
      dataIndex: "grade",
      width: "30%",
      sort: () => {},
      search: () => {}
    },
    {
      title: "Actions",
      dataIndex: "actions",
      width: "20%",
      render: (id) => {return <><TrashIcon className={"i-right i-hover"} onClick={(e) => iconClick(e, id)}/><EditIcon className={"i-hover"} onClick={(e) => iconClick(e, id)}/></>}
    }];

  const iconClick = (e, id) => {
    e.stopPropagation();
    alert(id);
  };
  const data = Object.values(students).map(stu => ({id: stu.id, name: stu.name, age: stu.age, grade: stu.grade, actions: stu.id}))

    return(
      <TableTest
        columns={columns}
        data={data}
        selectedCallback={(obj) => alert(obj.id)}
      />
    );
};

export default Test;