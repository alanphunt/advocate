import React from "react";

const Row = ({classes = "", vertical, horizontal, gap = [0,0], wrap = true, children, width = "100%", height = "auto"}) => {
  const styles = {
    display: "flex",
    "flex-flow": `row ${wrap ? "wrap" : "nowrap"}`,
    "align-items": vertical || "top",
    "justify-content": horizontal || "start",
    "row-gap": `${typeof gap[0] === "number" ? `${gap[0]}px` : gap[0]}`,
    "column-gap": `${typeof gap[1] === "number" ? `${gap[1]}px` : gap[1]}`,
    width: width,
    height: height
  }
  
  return (
    <div className={classes} style={styles}>
      {children}
    </div>
  );
};

export default Row;