import React from "react";
import ItemCards from "components/molecules/ItemCards";

const TrialTemplateSelector = ({trackingType, setTemplate}) => {
    return <ItemCards trackingType={trackingType} selectedTemplate={setTemplate}/>
};

export default TrialTemplateSelector;