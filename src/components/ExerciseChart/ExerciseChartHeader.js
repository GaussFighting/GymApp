import { Row, Col } from "react-bootstrap";

const ExerciseChartHeader = ({ bestResults }) => {
  let {
    repetitionMax,
    repetitionMaxByWeight,
    bestSetVolume,
    bestTotalVolumeByMass,
    bestTotalVolume,
    volumeBestTotalByWeight,
    repetitionBestSet,
    bestTotalRepetitions,
    distanceMax,
    durationMax,
  } = bestResults;

  if (repetitionMax) {
    return (
      <Row>
        <Col xs="1" md="2">
          RM: <b>{repetitionMax + "kg"}</b>
        </Col>
        <Col xs="1" md="2">
          RM / mass: <b>{repetitionMaxByWeight}</b>
        </Col>
        <Col xs="1" md="2">
          Best Set Volume <b>{bestSetVolume + "kg"}</b>
        </Col>
        <Col xs="1" md="2">
          Best Set Volume/ mass <b>{bestTotalVolumeByMass}</b>
        </Col>
        <Col xs="1" md="2">
          {" "}
          Best Total Volume <b>{bestTotalVolume + "kg"}</b>
        </Col>
        <Col xs="1" md="2">
          Best Total Volume/ mass <b>{volumeBestTotalByWeight}</b>
        </Col>
      </Row>
    );
  }
  if (repetitionBestSet) {
    return (
      <Row>
        {" "}
        <Col xs="1" md="6">
          Repetitions Max: <b>{repetitionBestSet}</b>
        </Col>
        <Col xs="1" md="6">
          {" "}
          Best Total Repetitions <b>{bestTotalRepetitions}</b>
        </Col>
      </Row>
    );
  }
  if (distanceMax) {
    return (
      <Row>
        {" "}
        <Col xs="1" md="6">
          Distance Max: <b>{distanceMax} meteres</b>
        </Col>
      </Row>
    );
  }
  if (durationMax) {
    return (
      <Row>
        <Col xs="1" md="6">
          {" "}
          Duration Max: <b>{durationMax ? durationMax : null}</b>
        </Col>
      </Row>
    );
  }
};

export default ExerciseChartHeader;
