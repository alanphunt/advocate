import React, {useEffect, useRef} from "react";

const FormElement = props => {
    const {
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
        id
    } = {...props};

    const ele = useRef(null);
    useEffect(() => {
        if (autoFocus)
            ele.current.focus();
    }, []);

    return (
        <div>
            {
                label
                    ? <h3 className={"i-bottom"}>{required ? <span className="incomp-color">*</span> : ""}{label}</h3>
                    : <></>
            }
            <label>
                <span className={"label-i"}>
                    {icon}
                </span>
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
                        />
                }
            </label>
            {
                props.errorMessage !== null || props.errorMessage !== ""
                    ? <p className={"inputerror"}>{props.errorMessage}</p>
                    : <></>
            }
        </div>
    )
};

export default FormElement;