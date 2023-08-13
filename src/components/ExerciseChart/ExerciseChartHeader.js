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
            <strong>
              {" "}
              RM: <b className="text-lowercase">{repetitionMax + " kg"}</b>
            </strong>
          </Col>
          <Col sm="12" md="4">
            <strong>
              {" "}
              RM / mass: <b>{repetitionMaxByWeight}</b>
            </strong>
          </Col>
          <Col sm="12" md="4">
            <strong>
              {" "}
              Best Set Volume:{" "}
              <b className="text-lowercase">{bestSetVolume + " kg"}</b>
            </strong>
          </Col>
        </Row>
        <Row>
          <Col sm="12" md="4">
            <strong>
              {" "}
              Best Set Volume/mass: <b>{bestTotalVolumeByMass}</b>
            </strong>
          </Col>
          <Col sm="12" md="4">
            {" "}
            <strong>
              {" "}
              Best Total Volume:{" "}
              <b className="text-lowercase">{bestTotalVolume + " kg"}</b>
            </strong>
          </Col>
          <Col sm="12" md="4">
            <strong>
              {" "}
              Best Total Volume/mass: <b>{volumeBestTotalByWeight}</b>
            </strong>
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
          <strong>
            {" "}
            Repetitions Max: <b>{repetitionBestSet}</b>
          </strong>
        </Col>
        <Col sm="12" md="6">
          {" "}
          <strong>
            {" "}
            Best Total Repetitions: <b>{bestTotalRepetitions}</b>
          </strong>
        </Col>
      </Row>
    );
  }
  if (distanceMax) {
    return (
      <Row>
        {" "}
        <Col sm="12" md="12">
          <strong>
            {" "}
            Distance Max: <b>{distanceMax} meteres</b>
          </strong>
        </Col>
      </Row>
    );
  }
  if (durationMax) {
    return (
      <Row>
        <Col sm="12" md="12">
          {" "}
          <strong>
            {" "}
            Duration Max: <b>{durationMax ? durationMax : null}</b>
          </strong>
        </Col>
      </Row>
    );
  }
};

export default ExerciseChartHeader;
