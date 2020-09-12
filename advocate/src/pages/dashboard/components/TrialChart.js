import React from "react";
import CanvasJSReact from "../../../assets/canvasjs.react";

const TrialChart = (props) => {
    const CanvasJSChart = CanvasJSReact.CanvasJSChart;
    const results = props.trialResults;

    const options = {
        animationDuration: 300,
        animationEnabled: false,
        title: {
            text: "Trial Results"
        },
        width: 300,
        height: 300,
        data: [{
            type: "pie",
            startAngle: 90,
            explodeOnClick: false,
            toolTipContent: "<b>Labels {trialLabels}</b>",
            legendText: "{label}",
            indexLabel: "{amt}/{total}, {y}%",
            showInLegend: true,
            indexLabelOrientation: "vertical",
            indexLabelFontColor: "white",
            indexLabelPlacement: "inside",
            indexLabelFontSize: 18,
            dataPoints: [
                { y: results.accuracy, amt: results.correct, total: results.total, label: "Correct", color: "#51bcda", trialLabels: results.correctLabels},
                { y: results.inaccuracy, amt: results.incorrect, total: results.total, label: "Incorrect", color: "#f44336", trialLabels: results.incorrectLabels}
            ]
        }]
    }


    return (
        <div className={"trialgraphwrapper"}>
            <CanvasJSChart options = {options}/>
        </div>
    );
};

export default TrialChart;