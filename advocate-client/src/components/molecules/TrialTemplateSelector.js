import React from "react";
import ItemCards from "components/molecules/ItemCards";

const TrialTemplateSelector = ({trackingType, setTrialTemplate}) => {
    return <ItemCards trackingType={trackingType} setTrialTemplate={setTrialTemplate}/>
};

export default TrialTemplateSelector;