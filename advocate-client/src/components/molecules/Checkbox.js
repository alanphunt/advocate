import React from "react";
import FormElement from "components/atoms/FormElement";
import {FaRegCheckSquare as CheckedIcon, FaRegSquare as UncheckedIcon} from "react-icons/fa";

const Checkbox = ({text, condition, updateCondition}) => {

    return (
        <FormElement>
            <h3 className={"i-bottom flex-center-vert"}>
                {text}
                {
                    condition ? (
                        <CheckedIcon
                            tabIndex={0}
                            className={"i-left selectable"}
                            onClick={() => updateCondition(false)}
                            onKeyPress={(e) => {
                                if (e.key === "Enter")
                                    updateCondition(false)
                            }}
                        />
                        ) : (
                            <UncheckedIcon
                                tabIndex={0}
                                className={"i-left selectable"}
                                onClick={() => updateCondition(true)}
                                onKeyPress={(e) => {
                                    if (e.key === "Enter")
                                        updateCondition(true)
                                }}
                            />
                        )
                }
            </h3>
        </FormElement>
    );
};

export default Checkbox;
