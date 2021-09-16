import React, {useState} from "react";

const ToolTip = ({text, classes, placement = "top", children, onMouseOver = () => {}, onMouseOut = () => {}}) => {
  const [hovered, setHovered] = useState(false);
  const tooltipDisplayed = hovered ? "flex" : "";
  const tooltipPosition = {
    "tl": "",
    "top": {
      bottom: "calc(100% + 10px)",
      right: "50%",
      "transform": "translate(50%, 0)"
    },
    "tr": "",
    "rt": "",
    "right": "",
    "rb": "",
    "br": "",
    "bottom": "",
    "bl": "",
    "lb": "",
    "left": "",
    "lt": ""
  }[placement];

  const arrowPosition = {
    "tl": "",
    "top": {
      bottom: "-20px",
      "left": "50%",
      "transform": "translate(-50%, 0)",
      "border-left": "10px solid transparent",
      "border-right": "10px solid transparent",
      "border-bottom": "10px solid transparent",
    },
    "tr": "",
    "rt": "",
    "right": "",
    "rb": "",
    "br": "",
    "bottom": "",
    "bl": "",
    "lb": "",
    "left": "",
    "lt": ""
  }[placement];

  const handleMouseOver = () => {
    setHovered(true)
    onMouseOver()
  };

  const handleMouseOut = () => {
    setHovered(false);
    onMouseOut();
  };

  return (
    <div className={"tooltip-wrapper"}
         onMouseOver={handleMouseOver}
         onMouseOut={handleMouseOut}>
      <div
        style={{display: tooltipDisplayed, ...tooltipPosition}}
        className="tooltip-inner">
        <div className={`tooltip`}>
          {text}
        </div>
        <div style={arrowPosition} className={`arrow-div`}/>
      </div>
      {children}
    </div>
  );
};

export default ToolTip;