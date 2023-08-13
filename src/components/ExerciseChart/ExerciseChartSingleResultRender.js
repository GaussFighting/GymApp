import { Row, Col } from "react-bootstrap";
import React from "react";

const ExerciseChartSinglestsultRender = ({ shortTrainingSummary }) => {
  let sts = shortTrainingSummary;

  if (sts.totalVolumeOfTraining && sts.totalVolumeOfTrainingByWeight) {
    return (
      <>
        <Col sm="12" md="1" className="text-lowercase results-table">
          {sts.totalVolumeOfTraining} {" kg"}
        </Col>
        <Col sm="12" md="1" className="results-table">
          {sts.totalVolumeOfTrainingByWeight}
        </Col>
      </>
    );
  }
  if (
    !sts.totalVolumeOfTraining &&
    !sts.totalVolumeOfTrainingByWeight &&
    sts.totalRepetitionsOfTraining &&
    sts.maxSetRepetition
  ) {
    return (
      <>
        <Col sm="12" md="1">
          <Row className="center results-table">
            {sts.totalRepetitionsOfTraining}{" "}
          </Row>
        </Col>
        <Col sm="12" md="1">
          <Row className="center results-table">{sts.maxSetRepetition}</Row>
        </Col>
      </>
    );
  }
  if (sts.distanceOfTraining && sts.durationOfTraining) {
    return (
      <>
        <Col sm="12" md="1">
          <Row className="center results-table">{sts.distanceOfTraining}</Row>
        </Col>
        <Col sm="12" md="1">
          <Row className="center results-table">{sts.durationOfTraining}</Row>
        </Col>
      </>
    );
  }
  if (!sts.distanceOfTraining && sts.durationOfTraining) {
    return (
      <>
        <Col sm="12" md="1">
          <Row className="center results-table">{sts.durationOfTraining}</Row>
        </Col>
      </>
    );
  }
};

export default ExerciseChartSinglestsultRender;
