import React from "react";
import ItemCards from "components/molecules/ItemCards";

const TrialTemplateSelector = ({benchmark, setTemplate}) => {
    return (
        <>
            <div className={"marg-bot"}>
                <h2>Choose a tracking method from these {benchmark.tracking}-based templates</h2>
            </div>
            <ItemCards type={benchmark.tracking} selectedTemplate={setTemplate}/>
        </>
    )
};

export default TrialTemplateSelector;