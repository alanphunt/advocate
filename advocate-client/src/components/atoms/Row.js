import React from "react";

const Row = ({classes = "", vertical, horizontal, gap = [0,0], wrap = true, children, width = "100%", height = "auto"}) => {
  const styles = {
    display: "flex",
    "flexFlow": `row ${wrap ? "wrap" : "nowrap"}`,
    "alignItems": vertical || "top",
    "justifyContent": horizontal || "start",
    "rowGap": `${typeof gap[0] === "number" ? `${gap[0]}px` : gap[0]}`,
    "columnGap": `${typeof gap[1] === "number" ? `${gap[1]}px` : gap[1]}`,
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