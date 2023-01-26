import React from "react";
import ExerciseChartSubHeader from "./ExerciseChartSubHeader";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

const ExerciseChartResultRender = ({ results, bestResults, exerciseId }) => {
  const format = "YYYY-MM-DD";
  const moment = require("moment");
  let renderedResults = results.map((ex, index) => {
    return (
      <React.Fragment key={"mainRow" + index}>
        {index === 0 && <ExerciseChartSubHeader bestResults={bestResults} />}
        <div key={"exerciseLink" + index}>
          <Link
            className="template-link-chart"
            to={`/results/${results[index].id}`}>
            <Row className="template-link-chart">
              <Col xs="1" md="1">
                {index + 1}
              </Col>
              <Col xs="1" md="1">
                {moment(ex.date).format(format)}
              </Col>
              <Col xs="1" md="1">
                {ex.bodyWeight.toFixed(1)}
                {" kg"}
              </Col>
              <Col xs="1" md="1">
                {ex.templateExercises
                  .filter((exercise) => {
                    return exercise.id === exerciseId;
                  })
                  .map((element, index) => {
                    let totalVolume = 0;
                    let totalRepetitions = 0;
                    let distance = 0;

                    for (let i = 0; i < element.addedResults.length; i++) {
                      totalVolume +=
                        element.addedResults[i].setWeight *
                        (element.addedResults[i].setRepetition
                          ? element.addedResults[i].setRepetition
                          : 0);

                      totalRepetitions += element.addedResults[i].setRepetition;

                      distance = element.addedResults[0].setDistance;
                    }

                    return (
                      <Row key={"noTotalVolume" + index}>
                        {isNaN(totalVolume.toFixed(1))
                          ? totalRepetitions
                            ? totalRepetitions
                            : distance
                          : totalVolume.toFixed(1)}{" "}
                      </Row>
                    );
                  })}
              </Col>
              <Col xs="6" md="1">
                {ex.templateExercises
                  .filter((asdf) => {
                    return asdf.id === exerciseId;
                  })
                  .map((element, index) => {
                    let totalVolume = 0;
                    let totalVolumeDivideBymass = 0;
                    let allRepetitions = [];
                    let sortedAllRepetitions = [];
                    let time = 0;
                    for (let i = 0; i < element.addedResults.length; i++) {
                      totalVolume +=
                        element.addedResults[i].setWeight *
                        (element.addedResults[i].setRepetition
                          ? element.addedResults[i].setRepetition
                          : 0);
                      totalVolumeDivideBymass = totalVolume / ex.bodyWeight;
                      allRepetitions = [
                        ...allRepetitions,
                        element.addedResults[i].setRepetition,
                      ];
                      sortedAllRepetitions = allRepetitions.sort().reverse();
                      time = element.addedResults[0].setTime;
                    }

                    return (
                      <Row key={"noVolumeByMass" + index}>
                        {isNaN(totalVolumeDivideBymass.toFixed(2))
                          ? sortedAllRepetitions[0]
                            ? sortedAllRepetitions[0]
                            : time
                          : totalVolumeDivideBymass.toFixed(2)}
                      </Row>
                    );
                  })}
              </Col>
              <Col>
                {ex.templateExercises
                  .filter((asdf) => {
                    return asdf.id === exerciseId;
                  })
                  .map((element, index) => {
                    let exResults = element.addedResults.map(
                      (element2, idx) => {
                        if (element2.setDistance) {
                          let arrayTime = element2.setTime.split(":");
                          let timeInSeconds =
                            parseInt(arrayTime[0], 10) * 3600 +
                            parseInt(arrayTime[1], 10) * 60 +
                            parseInt(arrayTime[2], 10);

                          // let distanceInMeters =
                          //   element2.setDistance;

                          let velocity =
                            Math.round(
                              100 *
                                (element2.setDistance /
                                  1000 /
                                  (timeInSeconds / 3600))
                            ) / 100;
                          let paceAsANumber =
                            timeInSeconds / 60 / (element2.setDistance / 1000);

                          let paceMinutes = Math.floor(paceAsANumber);
                          let paceSeconds = Math.ceil(
                            (Math.round(100 * paceAsANumber) / 100 -
                              paceMinutes) *
                              60
                          );
                          let arrayPace = [
                            paceMinutes.toString(),
                            paceSeconds.toString(),
                          ];

                          let paceAsString = arrayPace.join(":");

                          return (
                            idx < element.addedResults.length &&
                            idx > element.addedResults.length - 6 && (
                              <Col
                                key={"exerciseResults" + idx}
                                xs="6"
                                md="6"
                                style={{
                                  textTransform: "lowercase",
                                }}>
                                {" "}
                                {velocity}
                                {" km/h "}
                                {paceAsString}
                                {" min/km"}
                              </Col>
                            )
                          );
                        } else {
                          return (
                            idx < element.addedResults.length &&
                            idx > element.addedResults.length - 6 && (
                              <Col
                                key={"exerciseResults" + idx}
                                xs="6"
                                md="2"
                                style={{
                                  textTransform: "lowercase",
                                }}>
                                {" "}
                                {element2.setWeight
                                  ? element2.setWeight.toFixed(1) +
                                    "kg x " +
                                    element2.setRepetition
                                  : element2.setRepetition
                                  ? element2.setRepetition
                                  : element2.setDistance /
                                    element2.setTime}{" "}
                              </Col>
                            )
                          );
                        }
                      }
                    );
                    return <Row key={"result" + index}>{exResults}</Row>;
                  })}
              </Col>
            </Row>
          </Link>
        </div>{" "}
      </React.Fragment>
    );
  });
  return renderedResults;
};

export default ExerciseChartResultRender;
