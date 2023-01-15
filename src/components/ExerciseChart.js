import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import Chart from "./Chart";

const ExerciseCharts = (props) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  const format = "YYYY-MM-DD";
  const moment = require("moment");

  useEffect(() => {
    const fetchResults = async () => {
      let response = "";
      try {
        setLoading(true);
        response = props.exerciseId
          ? await fetch(
              `/.netlify/functions/resultRead?exerciseId=${props.exerciseId}`
            )
          : await fetch(`/.netlify/functions/resultRead`);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setIsError("server error");
        console.log(error);
      }
      if (!(200 <= response.status && response.status < 300)) {
        setIsError("error - status is not 2XX");
        console.log("error", response);
      } else {
        const responseData = await response.json();
        const loadedResults = [];

        const resultArr = responseData.data.results;

        for (const key in resultArr) {
          loadedResults.push({
            id: resultArr[key]._id,
            templateName: resultArr[key].templateName,
            descritpion: resultArr[key].description,
            bodyWeight: resultArr[key].bodyWeight,
            date: resultArr[key].date,
            templateExercises: resultArr[key].templateExercises,
          });
        }
        setResults(loadedResults);
      }
    };

    fetchResults();
  }, [props.exerciseId]);

  if (isError) {
    return <div>{isError}</div>;
  }

  if (loading)
    return (
      <div className="d-flex spinner">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );

  let repMax = Math.max(
    ...results
      .map((training) => {
        let bestWeightFromSet = training.templateExercises
          .filter((exercises) => {
            return exercises.id === props.exerciseId;
          })
          .map((element) => {
            let arrayOfAllSetWeights = element.addedResults.map((score) => {
              return score.setWeight;
            });
            return Math.max(...arrayOfAllSetWeights);
          });
        return [...bestWeightFromSet];
      })
      .flat()
  );
  let repMaxByMass = Math.max(
    ...results
      .map((training) => {
        let bestWeightFromSet = training.templateExercises
          .filter((exercises) => {
            return exercises.id === props.exerciseId;
          })
          .map((element) => {
            let arrayOfAllSetWeights = element.addedResults.map((score) => {
              return score.setWeight / training.bodyWeight;
            });
            return Math.max(...arrayOfAllSetWeights);
          });
        return [...bestWeightFromSet];
      })
      .flat()
  );

  let bestSetVolume = Math.max(
    ...results
      .map((training) => {
        let bestWeightFromSet = training.templateExercises
          .filter((exercises) => {
            return exercises.id === props.exerciseId;
          })
          .map((element) => {
            let arrayOfAllSetWeights = element.addedResults.map((score) => {
              return (
                score.setWeight *
                (score.setRepetition ? score.setRepetition : 0)
              );
            });
            return Math.max(...arrayOfAllSetWeights);
          });
        return [...bestWeightFromSet];
      })
      .flat()
  );

  let bestSetVolumeByMass = Math.max(
    ...results
      .map((training, index) => {
        let bestWeightFromSet = training.templateExercises
          .filter((exercises) => {
            return exercises.id === props.exerciseId;
          })
          .map((element) => {
            let arrayOfAllSetWeights = element.addedResults.map((score) => {
              return (
                (score.setWeight *
                  (score.setRepetition ? score.setRepetition : 0)) /
                training.bodyWeight
              );
            });
            return Math.max(...arrayOfAllSetWeights);
          });
        return [...bestWeightFromSet];
      })
      .flat()
  );

  let bestTotalSetVolumeByMass = Math.max(
    ...results
      .map((training, index) => {
        let bestWeightFromSet = training.templateExercises
          .filter((exercises) => {
            return exercises.id === props.exerciseId;
          })
          .map((element) => {
            let totalVolume = 0;
            let arrayOfAllSetWeights = element.addedResults.map((score) => {
              return (totalVolume +=
                score.setWeight *
                (score.setRepetition ? score.setRepetition : 0));
            });
            return Math.max(...arrayOfAllSetWeights);
          });
        return [...bestWeightFromSet];
      })
      .flat()
  );

  let bestTotalSetVolumeByMassByMass = Math.max(
    ...results
      .map((training, index) => {
        let bestWeightFromSet = training.templateExercises
          .filter((exercises) => {
            return exercises.id === props.exerciseId;
          })
          .map((element) => {
            let totalVolume = 0;
            let arrayOfAllSetWeights = element.addedResults.map((score) => {
              return (
                (totalVolume +=
                  score.setWeight *
                  (score.setRepetition ? score.setRepetition : 0)) /
                training.bodyWeight
              );
            });
            return Math.max(...arrayOfAllSetWeights);
          });
        return [...bestWeightFromSet];
      })
      .flat()
  );

  let setRepMax = Math.max(
    ...results
      .map((training) => {
        let highestNumberOfRepetitionFromSet = training.templateExercises
          .filter((exercises) => {
            return exercises.id === props.exerciseId;
          })
          .map((element) => {
            let arrayOfAllRepetition = element.addedResults.map(
              (repetition) => {
                return repetition.setRepetition;
              }
            );
            return Math.max(...arrayOfAllRepetition);
          });
        return [...highestNumberOfRepetitionFromSet];
      })
      .flat()
  );

  let distanceMax = Math.max(
    ...results
      .map((training) => {
        console.log("traingi", training);
        let distance = training.templateExercises
          .filter((exercises) => {
            return exercises.id === props.exerciseId;
          })
          .map((element) => {
            let arrayOfAllRepetition = element.addedResults.map(
              (repetition) => {
                return repetition.setDistance;
              }
            );
            return Math.max(...arrayOfAllRepetition);
          });
        return [...distance];
      })
      .flat()
  );

  console.log("distanceMax", distanceMax);

  let totalRepetitions = Math.max(
    ...results
      .map((training, index) => {
        let bestWeightFromSet = training.templateExercises
          .filter((exercises) => {
            return exercises.id === props.exerciseId;
          })
          .map((set) => {
            let totalRepetitions = 0;

            let arrayOfAllSetWeights = set.addedResults.map((repetition) => {
              return (totalRepetitions += repetition.setRepetition
                ? repetition.setRepetition
                : repetition.setDistance);
            });
            return Math.max(...arrayOfAllSetWeights);
          });
        return [...bestWeightFromSet];
      })
      .flat()
  );
  console.log(results);
  if (results.length) {
    return (
      <div>
        <Chart results={results} exerciseId={props.exerciseId} />
        <Row className="top-row">
          <Row>
            <Col xs="12" md="12">
              {repMax ? (
                <Row>
                  <Col xs="1" md="2">
                    RM: <b>{repMax}</b> kg
                  </Col>
                  <Col xs="1" md="2">
                    RM / mass: <b>{repMaxByMass.toFixed(2)}</b>
                  </Col>
                  <Col xs="1" md="2">
                    Best Set Volume <b>{bestSetVolume.toFixed(0)}</b>
                  </Col>
                  <Col xs="1" md="2">
                    Best Set Volume/ mass{" "}
                    <b>{bestSetVolumeByMass.toFixed(2)}</b>
                  </Col>
                  <Col xs="1" md="2">
                    {" "}
                    Best Total Volume{" "}
                    <b>{bestTotalSetVolumeByMass.toFixed(0)}</b>
                  </Col>
                  <Col xs="1" md="2">
                    Best Total Volume/ mass{" "}
                    <b>{bestTotalSetVolumeByMassByMass.toFixed(2)}</b>
                  </Col>
                </Row>
              ) : setRepMax ? (
                <Row>
                  {" "}
                  <Col xs="1" md="6">
                    Repetitions Max: <b>{setRepMax}</b>
                  </Col>
                  <Col xs="1" md="6">
                    {" "}
                    Best Total Repetitions <b>{totalRepetitions.toFixed(0)}</b>
                  </Col>
                </Row>
              ) : (
                <Row>
                  {" "}
                  <Col xs="1" md="6">
                    Distance Max: <b>{distanceMax} meteres</b>
                  </Col>
                  <Col xs="1" md="6">
                    {" "}
                    Total Distance: <b>{totalRepetitions.toFixed(0)} meters</b>
                  </Col>
                </Row>
              )}
              {results.map((ex, index) => {
                return (
                  <React.Fragment key={"mainRow" + index}>
                    {index === 0 && (
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
                        </Row>
                      </React.Fragment>
                    )}
                    <div key={"exerciseLink" + index}>
                      <Link
                        className="template-link-chart"
                        to={`/results/${results[index].id}`}
                      >
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
                                return exercise.id === props.exerciseId;
                              })
                              .map((element, index) => {
                                let totalVolume = 0;
                                let totalRepetitions = 0;
                                let distance = 0;

                                for (
                                  let i = 0;
                                  i < element.addedResults.length;
                                  i++
                                ) {
                                  totalVolume +=
                                    element.addedResults[i].setWeight *
                                    (element.addedResults[i].setRepetition
                                      ? element.addedResults[i].setRepetition
                                      : 0);

                                  totalRepetitions +=
                                    element.addedResults[i].setRepetition;

                                  distance =
                                    element.addedResults[0].setDistance;
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
                                return asdf.id === props.exerciseId;
                              })
                              .map((element, index) => {
                                let totalVolume = 0;
                                let totalVolumeDivideBymass = 0;
                                let allRepetitions = [];
                                let sortedAllRepetitions = [];
                                let time = 0;
                                for (
                                  let i = 0;
                                  i < element.addedResults.length;
                                  i++
                                ) {
                                  totalVolume +=
                                    element.addedResults[i].setWeight *
                                    (element.addedResults[i].setRepetition
                                      ? element.addedResults[i].setRepetition
                                      : 0);
                                  totalVolumeDivideBymass =
                                    totalVolume / ex.bodyWeight;
                                  allRepetitions = [
                                    ...allRepetitions,
                                    element.addedResults[i].setRepetition,
                                  ];
                                  sortedAllRepetitions = allRepetitions
                                    .sort()
                                    .reverse();
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
                                return asdf.id === props.exerciseId;
                              })
                              .map((element, index) => {
                                let exResults = element.addedResults.map(
                                  (element2, idx) => {
                                    if (element2.setTime) {
                                      let arrayTime =
                                        element2.setTime.split(":");
                                      let timeInSeconds =
                                        parseInt(arrayTime[0], 10) * 3600 +
                                        parseInt(arrayTime[1], 10) * 60 +
                                        parseInt(arrayTime[2], 10);

                                      let distanceInMeters =
                                        element2.setDistance;

                                      let velocity =
                                        Math.round(
                                          100 *
                                            (element2.setDistance /
                                              1000 /
                                              (timeInSeconds / 3600))
                                        ) / 100;
                                      let paceAsANumber =
                                        timeInSeconds /
                                        60 /
                                        (element2.setDistance / 1000);

                                      let paceMinutes =
                                        Math.floor(paceAsANumber);
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

                                      console.log(
                                        arrayTime,
                                        timeInSeconds,
                                        distanceInMeters,
                                        velocity,
                                        paceAsANumber,
                                        paceMinutes,
                                        paceSeconds,
                                        arrayPace,
                                        paceAsString
                                      );
                                      return (
                                        idx < element.addedResults.length &&
                                        idx >
                                          element.addedResults.length - 6 && (
                                          <Col
                                            key={"exerciseResults" + idx}
                                            xs="6"
                                            md="6"
                                            style={{
                                              textTransform: "lowercase",
                                            }}
                                          >
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
                                        idx >
                                          element.addedResults.length - 6 && (
                                          <Col
                                            key={"exerciseResults" + idx}
                                            xs="6"
                                            md="2"
                                            style={{
                                              textTransform: "lowercase",
                                            }}
                                          >
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
                                return (
                                  <Row key={"result" + index}>{exResults}</Row>
                                );
                              })}
                          </Col>
                        </Row>
                      </Link>
                    </div>
                  </React.Fragment>
                );
              })}
            </Col>
          </Row>
        </Row>
        <div className="spacer"></div>
      </div>
    );
  } else {
    return (
      <div>
        We ARE SORRY THERE IS NO RECORDS IN DATABASE FOR THIS EXERCISE :(
      </div>
    );
  }
};

export default ExerciseCharts;
