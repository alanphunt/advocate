import React, {useState} from "react";
import CanvasJSReact from "utils/libraries/canvasjs.react";
import {FaChartPie as PieIcon, FaChartBar as BarIcon, FaCircleNotch as DonutIcon} from "react-icons/fa";

const TrialChart = ({dataPoints, options}) => {
  const CanvasJSChart = CanvasJSReact.CanvasJSChart;
  const [chartType, setChartType] = useState("pie");
  const opts = options ? {...options, data: [...options.data, {...options.data[0], type: chartType}]} : {
    width: 275,
    height: 275,
    data: [{
      type: chartType,
      // startAngle: 90,
      explodeOnClick: false,
      // toolTipContent: dataPoints[0].labels ? "<b>Labels {labels}</b>" : null,
      // legendText: "{label}",
      // indexLabel: "{x}/{total}, {y}%",
      // showInLegend: true,
      // indexLabelOrientation: "vertical",
      // indexLabelFontColor: "white",
      // indexLabelPlacement: "outside",
      // indexLabelFontSize: 18,
      dataPoints: dataPoints
    }],
    creditText: ""
  };
  
  
  return (
    <div className={"trialgraphwrapper width-fit"}>
      <div className={"width-100"}>
        <div className={"marg-auto"}>
          <PieIcon className={"i-hover i-right"} onClick={() => setChartType("pie")}/>
          <BarIcon className={"i-hover i-right column-icon"} onClick={() => setChartType("bar")}/>
          <DonutIcon className={"i-hover i-right"} onClick={() => setChartType("doughnut")}/>
          <BarIcon className={"i-hover"} onClick={() => setChartType("column")}/>
        </div>
      </div>
      <CanvasJSChart options = {opts}/>
    </div>
  );
};

export default TrialChart;