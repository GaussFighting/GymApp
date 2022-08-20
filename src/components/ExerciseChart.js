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

  return (
    <div>
      <Row className="top-row">
        <Row>
          <Col xs="12" md="12">
            {results.map((ex, index) => {
              console.log(ex);
              return (
                <React.Fragment>
                  {/* {index === 0 && (
                    <Row>
                      <Col xs="1" md="1">
                        No.
                      </Col>
                      <Col xs="1" md="1">
                        Date
                      </Col>
                      <Col xs="1" md="1">
                        Body Weight
                      </Col>
                      <Col xs="1" md="1">
                        Weight
                      </Col>
                      <Col xs="1" md="1">
                        Repetition
                      </Col>
                    </Row>
                  )} */}
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
                        {ex.bodyWeight}
                        {" kg"}
                      </Col>
                      {console.log("AA", results)}

                      <Col>
                        {ex.templateExercises
                          .filter((asdf) => {
                            return asdf.id === props.exerciseId;
                          })
                          .map((element) => {
                            let exResults = element.addedResults.map(
                              (element2, idx) => {
                                return (
                                  <Col xs="1" md="1">
                                    {element2.setWeight}{" "}
                                    {element2.setRepetition}
                                  </Col>
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
