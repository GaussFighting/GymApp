import React, { useEffect, useState } from "react";
import { ListGroup, ListGroupItem, Row, Col, Container } from "react-bootstrap";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

const Exercises = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchExercises = async () => {
      const response = await fetch(
        "https://gymapp2-d46e1-default-rtdb.firebaseio.com/exercises.json"
      );
      const responseData = await response.json();

      const loadedExercises = [];

      for (const key in responseData) {
        loadedExercises.push({
          id: key,
          nameEn: responseData[key].nameEn,
          namePl: responseData[key].namePl,
          bodyPart: responseData[key].bodyPart,
          equipment: responseData[key].equipment,
        });
      }
      setExercises(loadedExercises);
    };

    fetchExercises();
  }, []);

  const exercisesList = exercises.map((exercise, idx) => (
    <ListGroup key={exercise.id}>
      <Button className="button" outline>
        <Link to={`/exercise/${idx + 1}`}>
          <ListGroupItem className="text-align-exercise text-uppercase">
            <Row>
              <Col xs="1" md="1">
                {" "}
                {idx + 1}
              </Col>
              <Col xs="5" md="5">
                {" "}
                {exercise.nameEn}
              </Col>
              <Col xs="3" md="3">
                {" "}
                {exercise.bodyPart}{" "}
              </Col>
              <Col xs="3" md="3">
                {" "}
                {exercise.equipment}
              </Col>
            </Row>{" "}
          </ListGroupItem>
        </Link>
      </Button>
    </ListGroup>
  ));
  return (
    <div className="margin-top">
      <ul className="ul-exercise">{exercisesList}</ul>
    </div>
  );
};

export default Exercises;
