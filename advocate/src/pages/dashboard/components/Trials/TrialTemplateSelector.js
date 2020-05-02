import React from "react";
import ItemCards from "../ItemCards";

const TrialTemplateSelector = (props) => {
    return (
        <div>
            <div className={"marg-bot-2"}>
                <h2>Create trial for {props.benchmark.label}</h2>
                <p>Tracking type: {props.benchmark.tracking}</p>
            </div>
            <div className={"itemcardhead"}>
                <h2>Choose a tracking method from these templates</h2>
            </div>
            <ItemCards type={props.benchmark.tracking} selectedTemplate={props.setTemplate}/>
        </div>
    )
};

export default TrialTemplateSelector;