import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import Chart from "./Chart";

const ExerciseCharts = (props) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

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
        console.log(error);
      }

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
    };

    fetchResults();
  }, [props.exerciseId]);

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
            // console.log(arrayOfAllSetWeights);
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
            // console.log(arrayOfAllSetWeights);
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
            // console.log(arrayOfAllSetWeights);
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
            // console.log(arrayOfAllSetWeights);
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
                  Best Set Volume/ mass <b>{bestSetVolumeByMass.toFixed(2)}</b>
                </Col>
                <Col xs="1" md="2">
                  {" "}
                  Best Total Volume <b>{bestTotalSetVolumeByMass.toFixed(0)}</b>
                </Col>
                <Col xs="1" md="2">
                  Best Total Volume/ mass{" "}
                  <b>{bestTotalSetVolumeByMassByMass.toFixed(2)}</b>
                </Col>
              </Row>
              {results.map((ex, index) => {
                return (
                  <React.Fragment>
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
                            .filter((asdf) => {
                              return asdf.id === props.exerciseId;
                            })
                            .map((element) => {
                              let totalVolume = 0;
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
                              }

                              return <Row>{totalVolume.toFixed(1)} </Row>;
                            })}
                        </Col>
                        <Col xs="1" md="1">
                          {ex.templateExercises
                            .filter((asdf) => {
                              return asdf.id === props.exerciseId;
                            })
                            .map((element) => {
                              let totalVolume = 0;
                              let totalVolumeDivideBymass = 0;
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
                              }

                              return (
                                <Row>{totalVolumeDivideBymass.toFixed(2)}</Row>
                              );
                            })}
                        </Col>
                        <Col>
                          {ex.templateExercises
                            .filter((asdf) => {
                              return asdf.id === props.exerciseId;
                            })
                            .map((element) => {
                              let exResults = element.addedResults.map(
                                (element2, idx) => {
                                  return (
                                    idx < element.addedResults.length &&
                                    idx > element.addedResults.length - 6 && (
                                      <Col
                                        xs="1"
                                        md="2"
                                        style={{ textTransform: "lowercase" }}
                                      >
                                        {element2.setWeight.toFixed(1)}
                                        {"kg x "}
                                        {element2.setRepetition}
                                      </Col>
                                    )
                                  );
                                }
                              );
                              return <Row>{exResults}</Row>;
                            })}
                        </Col>
                      </Row>
                    </Link>
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
