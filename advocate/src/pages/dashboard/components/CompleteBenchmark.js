import React from "react";

const CompleteBenchmark = (props) => {
    console.log(props);
    return (
        <div className={"completebenchmarkwrapper"}>
            <div className={"marg-bot-2"}>
                <h2>Complete {props.label}?</h2>
                <p><strong>Projected mastery date:</strong> {props.masteryDate}</p>
                <p><strong>Today's date:</strong> {new Date().toLocaleDateString()}</p>
            </div>
            <div>
                <button className={"marg-right"}>Complete</button>
                <button>Cancel</button>
            </div>
        </div>
    );
};

export default CompleteBenchmark;