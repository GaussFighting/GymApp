import dummyExercises from "../data/dummyExercises.json";
import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

const Exercises = () => {
  const exercisesList = dummyExercises.map((exercise, idx) => (
    <ListGroup key={exercise.id}>
      <Link to={`/exercise/${idx + 1}`}>
        <Button outline>
          <ListGroupItem className="text-align-exercise">
            {idx + 1} {exercise.exerciseEn} {exercise.bodyPart}{" "}
            {exercise.equipment}
          </ListGroupItem>
        </Button>
      </Link>
    </ListGroup>
  ));
  return (
    <div className="margin-top">
      <ul className="ul-exercise">{exercisesList}</ul>
    </div>
  );
};

export default Exercises;
