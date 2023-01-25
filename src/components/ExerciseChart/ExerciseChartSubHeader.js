import React from "react";
import { Row, Col } from "react-bootstrap";

const ExerciseChartSubHeader = ({ bestResults }) => {
  let { repetitionMax, repetitionBestSet, distanceMax } = bestResults;

  if (repetitionMax) {
    return (
      <React.Fragment>
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
            V
          </Col>
          <Col xs="1" md="1">
            V/m
          </Col>
        </Row>
      </React.Fragment>
    );
  }
  if (repetitionBestSet) {
    return (
      <React.Fragment>
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
            V
          </Col>
          <Col xs="1" md="1">
            set
          </Col>
        </Row>
      </React.Fragment>
    );
  }
  if (distanceMax) {
    return (
      <React.Fragment>
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
            Distance
          </Col>
          <Col xs="1" md="1">
            Time
          </Col>
        </Row>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
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
            Duration
          </Col>
        </Row>
      </React.Fragment>
    );
  }
};

export default ExerciseChartSubHeader;
