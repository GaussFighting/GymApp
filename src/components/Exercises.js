import dummyExercises from "../data/dummyExercises.json";
import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { Button } from "reactstrap";

const Exercises = () => {
  const exercisesList = dummyExercises.map((exercise, idx) => (
    <ListGroup key={exercise.id}>
      <Button outline>
        <ListGroupItem className="text-align-exercise">
          {idx + 1} {exercise.exerciseEn} {exercise.bodyPart}{" "}
          {exercise.equipment}
        </ListGroupItem>
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
