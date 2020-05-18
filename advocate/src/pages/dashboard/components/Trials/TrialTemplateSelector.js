import React from "react";
import ItemCards from "../ItemCards";

const TrialTemplateSelector = ({benchmark, setTemplate}) => {
    return (
        <>
            <div className={"marg-bot-2"}>
                <h2>Create trial for {benchmark.label}</h2>
                <p>Tracking type: {benchmark.tracking}</p>
            </div>
            <div className={"itemcardhead"}>
                <h2>Choose a tracking method from these templates</h2>
            </div>
            <ItemCards type={benchmark.tracking} selectedTemplate={setTemplate}/>
        </>
    )
};

export default TrialTemplateSelector;