import { Row, Col } from "react-bootstrap";
import React from "react";

const ExerciseChartSinglestsultRender = ({ shortTrainingSummary }) => {
  let sts = shortTrainingSummary;

  if (sts.totalVolumeOfTraining && sts.totalVolumeOfTrainingByWeight) {
    return (
      <>
        <Col xs="1" md="1">
          {sts.totalVolumeOfTraining}
        </Col>
        <Col xs="1" md="1">
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
        <Col xs="1" md="1">
          <Row>{sts.totalRepetitionsOfTraining}</Row>
        </Col>
        <Col xs="1" md="1">
          <Row>{sts.maxSetRepetition}</Row>
        </Col>
      </>
    );
  }
  if (sts.distanceOfTraining && sts.durationOfTraining) {
    return (
      <>
        <Col xs="1" md="1">
          <Row>{sts.distanceOfTraining}</Row>
        </Col>
        <Col xs="1" md="1">
          <Row>{sts.durationOfTraining}</Row>
        </Col>
      </>
    );
  }
  if (!sts.distanceOfTraining && sts.durationOfTraining) {
    return (
      <>
        <Col xs="1" md="1">
          <Row>{sts.durationOfTraining}</Row>
        </Col>
      </>
    );
  }
};

export default ExerciseChartSinglestsultRender;
