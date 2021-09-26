import React, {useEffect, useRef} from "react";
import ErrorLabel from "./ErrorLabel";
import RequiredField from "./RequiredField";
import H3 from "./H3";

const FormElement = ({
   label,
   icon,
   name,
   type = "text",
   placeholder,
   required,
   onChange,
   value,
   autoFocus,
   children,
   id,
   onKeyPress = null,
   multiple = null,
   accept,
   errorMessage,
   onFocus
}) => {
  
  const ele = useRef(null);

  const focus = () => {
    if (autoFocus)
      ele.current.focus();
  };
  
  useEffect(focus, []);
  useEffect(focus, [autoFocus]);

  return (
    <div className="form-element-wrapper">
      {
        label
          ? <H3 classes={"i-bottom"}>{label}{required ? <RequiredField/> : ""}</H3>
          : <></>
      }
      <label>
        {
          icon ? (
              <span className={"label-i"}>
                {icon}
              </span>
            )
            : (<></>)
        }
        {
          children
            ? children
            : <input
              id={id}
              type={type}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              name={name}
              ref={ele}
              autoFocus={autoFocus}
              onKeyPress={onKeyPress}
              multiple={multiple}
              accept={accept}
              onFocus={onFocus}
            />
        }
      </label>
      <ErrorLabel text={errorMessage}/>
    </div>
  )
};

export default FormElement;