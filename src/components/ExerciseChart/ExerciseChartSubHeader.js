import React from "react";
import { Row, Col } from "react-bootstrap";

const ExerciseChartSubHeader = ({ bestResults }) => {
  let { repetitionMax, repetitionBestSet, distanceMax } = bestResults;

  let textPreLastCol = "Duration";
  let textLastCol = "";
  if (repetitionMax) {
    textPreLastCol = "V";
    textLastCol = "V/m";
  }
  if (repetitionBestSet) {
    textLastCol = "set";
  }
  if (distanceMax) {
    textPreLastCol = "Distance";
    textLastCol = "Time";
  }

  return (
    <Row>
      <Col xs="1" md="1">
        No.
      </Col>
      <Col xs="1" md="1">
        Date
      </Col>
      <Col xs="1" md="1">
        BW
      </Col>
      <Col xs="1" md="1">
        {textPreLastCol}
      </Col>
      <Col xs="1" md="1">
        {textLastCol}
      </Col>
    </Row>
  );
};

export default ExerciseChartSubHeader;
