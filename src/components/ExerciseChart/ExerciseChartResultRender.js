import React from "react";
import ExerciseChartSubHeader from "./ExerciseChartSubHeader";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import ExerciseChartSingleResultRender from "./ExerciseChartSingleResultRender";
import ExerciseChartsTrainingShortcut from "./ExerciseChartTrainingShortcut";
import twoColResRend from "../../utils/twoColResRend";
import singleTrainingResults from "../../utils/singleTrainingResults";
import moment from "moment";

const ExerciseChartResultRender = ({ results, bestResults, exerciseId }) => {
  const format = "YYYY-MM-DD";

  let renderedResults = results.map((ex, index) => {
    const shortTrainingSummary = twoColResRend(ex, exerciseId);
    const singleTrainRes = singleTrainingResults(ex, exerciseId);
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
              <ExerciseChartSingleResultRender
                shortTrainingSummary={shortTrainingSummary}
              />
              <Col>
                <ExerciseChartsTrainingShortcut
                  singleTrainRes={singleTrainRes}
                />
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
