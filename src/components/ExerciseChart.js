import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ListGroup, Row, Col } from "react-bootstrap";
import { FormGroup, Label, Input, Button } from "reactstrap";

const ExerciseCharts = (props) => {
  const [results, setResults] = useState([]);

  console.log("results", results);
  const format = "YYYY-MM-DD";
  const moment = require("moment");

  useEffect(() => {
    const fetchResults = async () => {
      let response = "";
      try {
        response = props.exerciseId
          ? await fetch(
              `http://localhost:5000/results_per_exercise?exerciseId=${props.exerciseId}`
            )
          : await fetch(`http://localhost:5000/results_per_exercise`);
      } catch (error) {
        console.log(error);
      }

      const responseData = await response.json();
      console.log("resp", responseData);
      const loadedResults = [];

      for (const key in responseData) {
        loadedResults.push({
          id: responseData[key]._id,
          templateName: responseData[key].templateName,
          descritpion: responseData[key].description,
          bodyWeight: responseData[key].bodyWeight,
          date: responseData[key].date,
          templateExercises: responseData[key].templateExercises,
        });
      }
      setResults(loadedResults);
    };

    fetchResults();
  }, [props.exerciseId]);
  console.log(results);
  let repMax = Math.max(
    ...results
      .map((training, index) => {
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
      .map((training, index) => {
        let bestWeightFromSet = training.templateExercises
          .filter((exercises) => {
            return exercises.id === props.exerciseId;
          })
          .map((element) => {
            let arrayOfAllSetWeights = element.addedResults.map((score) => {
              return score.setWeight / training.bodyWeight;
            });
            // console.log(arrayOfAllSetWeights);
            return Math.max(...arrayOfAllSetWeights);
          });
        return [...bestWeightFromSet];
      })
      .flat()
  );
  console.log(repMax);
  return (
    <div>
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
                Best Set Volume
              </Col>
              <Col xs="1" md="2">
                Best Set Volume/ mass
              </Col>
              <Col xs="1" md="2">
                Best Total Volume
              </Col>
              <Col xs="1" md="2">
                Best Total Volume/ mass
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
                                  idx < 5 && (
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
};

export default ExerciseCharts;
