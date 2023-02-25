import React from "react";
import { Row, Col } from "react-bootstrap";

const ExerciseChartSubHeader = ({ bestResults }) => {
  let { repetitionMax, repetitionBestSet, distanceMax } = bestResults;
  let thirdCol = "Duration";
  let fourthCol = "";
  let fifthCol = "";
  let sixthCol = "";
  let seventhCol = "";
  let eightCol = "";
  let ninethCol = "";

  if (repetitionMax) {
    thirdCol = "V";
    fourthCol = "V/m";
    fifthCol = "Set1";
    sixthCol = "Set2";
    seventhCol = "Set3";
    eightCol = "Set4";
    ninethCol = "Set5";
  }
  if (!repetitionMax && repetitionBestSet) {
    thirdCol = "Total";
    fourthCol = "Best Set";
    fifthCol = "Set1";
    sixthCol = "Set2";
    seventhCol = "Set3";
    eightCol = "Set4";
    ninethCol = "Set5";
  }
  if (distanceMax) {
    thirdCol = "Distance";
    fourthCol = "Time";
    fifthCol = " ";
    sixthCol = "Speed";
    seventhCol = "Pace";
  }

  return (
    <Row>
      <Col sm="12" md="1">
        No.
      </Col>
      <Col sm="12" md="1">
        Date
      </Col>
      <Col sm="12" md="1">
        BW
      </Col>
      <Col sm="12" md="1">
        {thirdCol}
      </Col>
      <Col sm="12" md="1">
        {fourthCol}
      </Col>
      <Col sm="12" md="1">
        {fifthCol}
      </Col>
      <Col sm="12" md="1">
        {sixthCol}
      </Col>
      <Col sm="12" md="1">
        {seventhCol}
      </Col>
      <Col sm="12" md="1">
        {eightCol}
      </Col>
      <Col sm="12" md="1">
        {ninethCol}
      </Col>
    </Row>
  );
};

export default ExerciseChartSubHeader;
