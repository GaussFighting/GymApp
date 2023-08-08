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
        <strong>No.</strong>{" "}
      </Col>
      <Col sm="12" md="2">
        <strong>Date</strong>{" "}
      </Col>
      <Col sm="12" md="1">
        <strong>BW</strong>{" "}
      </Col>
      <Col sm="12" md="1">
        <strong>{thirdCol}</strong>{" "}
      </Col>
      <Col sm="12" md="1">
        <strong>{fourthCol}</strong>{" "}
      </Col>
      <Col sm="12" md="1">
        <strong>{fifthCol}</strong>{" "}
      </Col>
      <Col sm="12" md="1">
        <strong>{sixthCol}</strong>{" "}
      </Col>
      <Col sm="12" md="1">
        <strong>{seventhCol}</strong>{" "}
      </Col>
      <Col sm="12" md="1">
        <strong>{eightCol}</strong>{" "}
      </Col>
      <Col sm="12" md="1">
        <strong>{ninethCol}</strong>{" "}
      </Col>
    </Row>
  );
};

export default ExerciseChartSubHeader;
