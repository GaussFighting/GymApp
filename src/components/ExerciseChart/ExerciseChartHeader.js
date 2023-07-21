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
      <>
        <Row>
          <Col sm="12" md="4">
            RM: <b className="text-lowercase">{repetitionMax + " kg"}</b>
          </Col>
          <Col sm="12" md="4">
            RM / mass: <b>{repetitionMaxByWeight}</b>
          </Col>
          <Col sm="12" md="4">
            Best Set Volume:{" "}
            <b className="text-lowercase">{bestSetVolume + " kg"}</b>
          </Col>
        </Row>
        <Row>
          <Col sm="12" md="4">
            Best Set Volume/mass: <b>{bestTotalVolumeByMass}</b>
          </Col>
          <Col sm="12" md="4">
            {" "}
            Best Total Volume:{" "}
            <b className="text-lowercase">{bestTotalVolume + " kg"}</b>
          </Col>
          <Col sm="12" md="4">
            Best Total Volume/mass: <b>{volumeBestTotalByWeight}</b>
          </Col>
        </Row>
      </>
    );
  }
  if (repetitionBestSet) {
    return (
      <Row>
        {" "}
        <Col sm="12" md="6">
          Repetitions Max: <b>{repetitionBestSet}</b>
        </Col>
        <Col sm="12" md="6">
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
        <Col sm="12" md="12">
          Distance Max: <b>{distanceMax} meteres</b>
        </Col>
      </Row>
    );
  }
  if (durationMax) {
    return (
      <Row>
        <Col sm="12" md="12">
          {" "}
          Duration Max: <b>{durationMax ? durationMax : null}</b>
        </Col>
      </Row>
    );
  }
};

export default ExerciseChartHeader;
