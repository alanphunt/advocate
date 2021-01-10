import React, {useEffect, useRef} from "react";
import RequiredField from "./RequiredField";

const FormElement = ({
    label, 
    icon, 
    name, 
    type, 
    placeholder, 
    required, 
    onChange, 
    value, 
    autoFocus, 
    children, 
    id, 
    onKeyPress, 
    multiple,
    accept,
    errorMessage
}) => {
    const ele = useRef(null);
    useEffect(() => {
        if (!!autoFocus)
            ele.current.focus();
    }, [autoFocus]);

    return (
        <div className="form-element-wrapper">
            {
                label
                    ? <h3 className={"i-bottom"}>{required ? <RequiredField/> : ""}{label}</h3>
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
                            id={id || undefined}
                            type={type || "text"}
                            placeholder={placeholder}
                            value={value || ''}
                            onChange={onChange}
                            name={name}
                            ref={ele}
                            autoFocus
                            onKeyPress={onKeyPress || null}
                            multiple={multiple || false}
                            accept={accept}
                        />
                }
            </label>
            {
                errorMessage
                    ? <p className={"inputerror"}>{errorMessage}</p>
                    : <></>
            }
        </div>
    )
};

export default FormElement;