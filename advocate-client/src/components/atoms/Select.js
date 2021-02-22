import React from "react";
import RequiredField from "components/atoms/RequiredField";

/*
     props:
      mapping: object: {Label: value}
     state:

*/

const Select = ({mapping, onChange, value, icon, label, required}) => {
  
  return (
    <div className="form-element-wrapper">
      {
        label ? (
          <h3 className={"i-bottom"}>{required ? <RequiredField/> : ""}{label}</h3>
        ) : <></>
      }
      <label>
        {
          icon ? (
            <span className={"label-i"}>
              {icon}
            </span>
          ) : <></>
        }
        <select onChange={onChange} value={value}>
          <option value={""}>Select an option..</option>
          {
            Object.keys(mapping).map(key => <option key={mapping[key]} value={mapping[key]}>{key}</option>)
          }
        </select>
      </label>
    </div>
  );
};

export default Select;
