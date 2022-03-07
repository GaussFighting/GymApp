import dummyExercises from "../data/dummyExercises.json";
import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";

const Exercises = () => {
  const exercisesList = dummyExercises.map((exercise, idx) => (
    <ListGroup key={exercise.id}>
      <ListGroupItem>
        {idx + 1} {exercise.exerciseEn} {exercise.bodyPart} {exercise.equipment}
      </ListGroupItem>
    </ListGroup>
  ));
  return (
    <div>
      <ul>{exercisesList}</ul>
    </div>
  );
};

export default Exercises;
