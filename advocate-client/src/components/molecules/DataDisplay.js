import React from "react";
import Row from "../atoms/Row";
import Col from "../atoms/Col";
import Secondary from "../atoms/table/Secondary";

const DataDisplay = ({labels, data, classes}) => {
  
  return (
    <Row classes={classes} gap={["1rem", 0]} width={"max-content"} >
      <Col classes={"marg-right"}>
        {
          labels.map((label, i) => <p key={`data-disp-left-${i}`}><Secondary>{label}</Secondary></p>)
        }
      </Col>
      <Col>
        {
          data.map((dat, i) => <p key={`data-disp-right-${i}`}>{dat}</p>)
        }
      </Col>
    </Row>
  );
};

export default DataDisplay;