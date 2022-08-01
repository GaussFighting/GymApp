import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ListGroup, Row, Col } from "react-bootstrap";

const History = (props) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const response = await fetch("http://localhost:5000/results");

      const responseData = await response.json();
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
      console.log("loadedResults", loadedResults);
      console.log("results", results);
    };

    fetchResults();
  }, []);

  const resultsList = results.map((result, index) => (
    <ListGroup key={result.id}>
      <Row className="template-row">
        <Link to={`/results/${result.id}`}>
          <Col xs="12" md="12" className="col-name">
            {index + 1} {result.templateName.toUpperCase()}
          </Col>
        </Link>
      </Row>

      {/* <Row className="template-row">
        {results.templateExercises.map((exercise, idx) => (
          <Row className="template-row-exercise" key={exercise.id}>
            <Col xs="1" md="2">
              {idx + 1}{" "}
            </Col>
            <Col xs="7" md="8">
              {exercise.nameEn.toUpperCase()}
            </Col>
            <Col xs="4" md="2">
              {" "}
              {exercise.sets} SETS
            </Col>
          </Row>
        ))}
      </Row> */}
    </ListGroup>
  ));

  return (
    <div>
      <ul className="ul-exercise">{resultsList}</ul>
      {console.log("asdf")}
      <div className="spacer"></div>
    </div>
  );
};

export default History;
