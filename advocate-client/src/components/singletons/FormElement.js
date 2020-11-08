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
        if(autoFocus)
            ele.current.focus();
    }, [props]);

    return (
        <div className={"marg-bot"}>
            {
                label
                    ? <h3 className={"i-bottom"}>{label}</h3>
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
                            value={value || undefined}
                            onChange={onChange}
                            required={required || false}
                            name={name}
                            ref={ele}
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